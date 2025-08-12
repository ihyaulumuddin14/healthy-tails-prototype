import mongoose from "mongoose";

import { CreateBookingRequest } from "../domain/dto/booking.dto.js";
import BookingModel from "../domain/entity/booking.entity.js";

import { toBookingResponse, toBookingResponseArray } from "../helpers/booking-mapper.js";

import {
  cancelBookingById,
  createBooking,
  findAllBookingsByOwner,
  findBookingByIdAndOwner,
  findLastBookingByDate,
} from "../repositories/booking.repository.js";
import { findPetByIdAndOwner } from "../repositories/pet.repository.js";

import { HttpError } from "../utils/http-error.js";

export const createBookingservice = async (userId: string, payload: CreateBookingRequest) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { petId, serviceId, bookingDate, notes } = payload;

    const pet = await findPetByIdAndOwner(userId, petId);
    if (!pet) {
      throw new HttpError(404, "Pet not found or you do not have access");
    }

    const date = new Date(bookingDate);
    const lastBooking = await findLastBookingByDate(date, session);
    const newQueueNumber = lastBooking ? lastBooking.queueNumber + 1 : 1;

    const newBookingData = await createBooking({
      pet: petId,
      owner: userId,
      service: serviceId,
      bookingDate: date,
      notes,
      queueNumber: newQueueNumber,
    });

    const newBookingArray = await BookingModel.create([newBookingData], { session });
    const newBooking = newBookingArray[0];

    await session.commitTransaction();
    session.endSession();

    const populatedBooking = await newBooking.populate(["pet", "service"]);
    const mappedBooking = toBookingResponse(populatedBooking);
    return mappedBooking;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
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
