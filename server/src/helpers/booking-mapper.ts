import { BookingResponse } from "../domain/dto/booking.dto.js";
import { BookingItf } from "../domain/entity/booking.entity.js";

import { toNestedPetResponse } from "./pet-mapper.js";
import { toServiceResponse } from "./service-mapper.js";
import { toUserResponse } from "./user-mapper.js";

export const toBookingResponse = (booking: BookingItf): BookingResponse => {
  return {
    ...booking.toObject(),
    _id: booking._id.toString(),
    bookingDate: booking.bookingDate.toISOString(),
    pet: toNestedPetResponse(booking.pet),
    service: toServiceResponse(booking.service),
    owner: toUserResponse(booking.owner),
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  };
};

export const toBookingResponseArray = (bookings: BookingItf[]): BookingResponse[] => {
  return bookings.map(toBookingResponse);
};
