import mongoose from "mongoose";

import BookingModel, { BookingItf } from "../domain/entity/booking.entity.js";

const bookingPopulation = [
  {
    path: "pet",
    populate: {
      path: "owner",
      model: "User",
      select: "-password -refreshToken",
    },
  },
  { path: "service", model: "Service" },
  { path: "owner", model: "User", select: "-password -refreshToken" },
];

export const findAllBookingsByOwner = async (ownerId: string): Promise<BookingItf[]> => {
  return BookingModel.find({ owner: ownerId }).populate(bookingPopulation).sort({ bookingDate: -1 }).exec();
};

export const findBookingByIdAndOwner = async (id: string, ownerId: string): Promise<BookingItf | null> => {
  return BookingModel.findOne({ _id: id, owner: ownerId }).populate(bookingPopulation).exec();
};

export const findBookingsByDate = async (date: Date): Promise<BookingItf[]> => {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return BookingModel.find({
    bookingDate: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate(bookingPopulation)
    .sort({ queueNumber: 1 })
    .exec();
};

export const findBookingByVisitHistory = async (visitHistoryId: string): Promise<BookingItf | null> => {
  return BookingModel.findOne({ visitHistory: visitHistoryId }).populate(bookingPopulation).exec();
};

export const cancelBookingById = async (id: string, ownerId: string): Promise<BookingItf | null> => {
  return BookingModel.findOneAndUpdate({ _id: id, owner: ownerId }, { status: "CANCELLED" }, { new: true })
    .populate(bookingPopulation)
    .exec();
};

export const findInProgressBookingForPet = async (petId: string): Promise<BookingItf | null> => {
  return BookingModel.findOne({
    pet: petId,
    status: "IN_PROGRESS",
  })
    .populate(bookingPopulation)
    .exec();
};

export const updateBookingById = async (
  id: string,
  updateData: {
    status?: string;
    visitHistory?: mongoose.Types.ObjectId | string;
    $unset?: { visitHistory?: string };
  }
): Promise<BookingItf | null> => {
  return BookingModel.findByIdAndUpdate(id, updateData, { new: true }).populate(bookingPopulation).exec();
};

export const deleteBookingsByOwner = async (ownerId: string): Promise<void> => {
  await BookingModel.deleteMany({ owner: ownerId }).exec();
};

export const deleteBookingsByPet = async (petId: string): Promise<void> => {
  await BookingModel.deleteMany({ pet: petId }).exec();
};

export const clearVisitHistoryReference = async (
  visitHistoryId: string,
  session: mongoose.ClientSession
): Promise<void> => {
  await BookingModel.updateOne({ visitHistory: visitHistoryId }, { $unset: { visitHistory: "" } }, { session }).exec();
};
