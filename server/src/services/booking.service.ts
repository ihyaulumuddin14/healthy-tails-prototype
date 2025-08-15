import mongoose from "mongoose";

import redis from "../config/redis.js";

import { CreateBookingRequest, UpdateBookingStatusRequest } from "../domain/dto/booking.dto.js";
import BookingModel from "../domain/entity/booking.entity.js";

import { toBookingResponse, toBookingResponseArray } from "../helpers/booking-mapper.js";

import {
  cancelBookingById,
  findAllBookingsByOwner,
  findBookingByIdAndOwner,
  findBookingsByDate,
  updateBookingById,
} from "../repositories/booking.repository.js";
import { findPetByIdAndOwner } from "../repositories/pet.repository.js";

import { HttpError } from "../utils/http-error.js";
import logger from "../utils/logger.js";

export const createBookingservice = async (userId: string, payload: CreateBookingRequest) => {
  const { petId, serviceId, bookingDate, notes } = payload;
  const date = new Date(bookingDate);
  const dateKey = date.toISOString().split("T")[0];
  const queueCounterKey = `booking_queue_counter:${dateKey}`;

  const pet = await findPetByIdAndOwner(userId, petId);
  if (!pet) {
    throw new HttpError(404, "Pet not found or you do not have access");
  }

  const queueNumber = await redis.incr(queueCounterKey);

  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  await redis.expireat(queueCounterKey, Math.floor(tomorrow.getTime() / 1000));

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newBookingData = {
      pet: petId,
      owner: userId,
      service: serviceId,
      bookingDate: date,
      notes,
      queueNumber,
    };

    const newBookingArray = await BookingModel.create([newBookingData], { session });
    const newBooking = newBookingArray[0];

    await session.commitTransaction();

    const savedBooking = await findBookingByIdAndOwner(newBooking._id, userId);
    if (!savedBooking) {
      throw new HttpError(500, "Failed to retrieve created booking after transaction");
    }

    const mappedBooking = toBookingResponse(savedBooking!);
    return mappedBooking;
  } catch (dbErr) {
    logger.error("Error creating booking:", dbErr);
    await session.abortTransaction();

    try {
      await redis.decr(queueCounterKey);
    } catch (rollbackErr) {
      logger.warn("Failed to rollback queue counter:", rollbackErr);
    }

    throw dbErr;
  } finally {
    session.endSession();
  }
};

export const getMyBookingsService = async (userId: string) => {
  const bookings = await findAllBookingsByOwner(userId);
  const mappedBookings = toBookingResponseArray(bookings);

  return mappedBookings;
};

export const getBookingByIdService = async (bookingId: string, userId: string) => {
  const booking = await findBookingByIdAndOwner(bookingId, userId);
  if (!booking) {
    throw new HttpError(404, "Booking not found or you do not have access");
  }

  const mappedBooking = toBookingResponse(booking);
  return mappedBooking;
};

export const cancelBookingByIdService = async (bookingId: string, userId: string) => {
  const booking = await findBookingByIdAndOwner(bookingId, userId);
  if (!booking) {
    throw new HttpError(404, "Booking not found or you do not have access");
  }

  if (booking.status !== "WAITING") {
    throw new HttpError(400, "Only bookings with status 'WAITING' can be cancelled");
  }

  await cancelBookingById(bookingId, userId);
};

export const getBookingsByDateService = async (date: Date) => {
  const bookings = await findBookingsByDate(date);
  const mappedBookings = toBookingResponseArray(bookings);
  return mappedBookings;
};

export const updateBookingStatusService = async (bookingId: string, payload: UpdateBookingStatusRequest) => {
  const updatedBooking = await updateBookingById(bookingId, payload);
  if (!updatedBooking) {
    throw new HttpError(404, "Booking not found");
  }

  const mappedBooking = toBookingResponse(updatedBooking);
  return mappedBooking;
};
