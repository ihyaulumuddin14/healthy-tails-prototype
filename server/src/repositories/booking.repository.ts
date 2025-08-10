import mongoose from "mongoose";

import { BookingCreationData } from "../domain/dto/booking.dto.js";
import BookingModel, { BookingItf } from "../domain/entity/booking.entity.js";

export const findLastBookingByDate = async (
  date: Date,
  session: mongoose.ClientSession | null = null
): Promise<BookingItf | null> => {
  return BookingModel.findOne({ bookingDate: date }).sort({ queueNumber: -1 }).session(session).exec();
};

export const createBooking = async (
  data: BookingCreationData,
  session: mongoose.ClientSession | null = null
): Promise<BookingItf> => {
  const booking = new BookingModel(data);
  return booking.save({ session });
};

export const findAllBookingsByOwner = async (ownerId: string): Promise<BookingItf[]> => {
  return BookingModel.find({ owner: ownerId }).populate(["pet", "service"]).sort({ bookingDate: -1 }).exec();
};

export const findBookingByIdAndOwner = async (id: string, ownerId: string): Promise<BookingItf | null> => {
  return BookingModel.findOne({ _id: id, owner: ownerId }).populate(["pet", "service"]).exec();
};

export const cancelBookingById = async (id: string, ownerId: string): Promise<BookingItf | null> => {
  return BookingModel.findOneAndUpdate({ _id: id, owner: ownerId }, { status: "CANCELLED" }, { new: true }).exec();
};
