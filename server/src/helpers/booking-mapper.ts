import { BookingResponse } from "../domain/dto/booking.dto.js";
import { BookingItf } from "../domain/entity/booking.entity.js";

export const toBookingResponse = (booking: BookingItf): BookingResponse => {
  return {
    _id: booking._id.toString(),
    ...booking.toObject(),
    bookingDate: booking.bookingDate.toISOString(),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
};

export const toBookingResponseArray = (bookings: BookingItf[]): BookingResponse[] => {
  return bookings.map(toBookingResponse);
};
