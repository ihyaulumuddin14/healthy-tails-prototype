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

export const cancelBookingById = async (id: string, ownerId: string): Promise<BookingItf | null> => {
  return BookingModel.findOneAndUpdate({ _id: id, owner: ownerId }, { status: "CANCELLED" }, { new: true })
    .populate(bookingPopulation)
    .exec();
};

export const findActiveBookingForPet = async (petId: string, date: Date): Promise<BookingItf | null> => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  return BookingModel.findOne({
    pet: petId,
    bookingDate: { $gte: startOfDay, $lte: endOfDay },
    status: { $in: ["WAITING", "IN_PROGRESS"] },
  }).exec();
};

export const updateBookingById = async (id: string, data: Partial<BookingItf>): Promise<BookingItf | null> => {
  return BookingModel.findByIdAndUpdate(id, data, { new: true }).populate(bookingPopulation).exec();
};
