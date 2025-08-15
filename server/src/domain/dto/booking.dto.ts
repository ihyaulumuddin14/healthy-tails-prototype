import z from "zod";

import { statusEnum } from "../entity/booking.entity.js";
import { MongoIdString } from "./common.dto.js";
import { NestedPetResponseSchema } from "./pet.dto.js";
import { ServiceResponseSchema } from "./service.dto.js";
import { UserResponseSchema } from "./user.dto.js";

export const CreateBookingRequestSchmea = z.object({
  petId: MongoIdString,
  serviceId: MongoIdString,
  bookingDate: z.coerce.date(),
  notes: z.string().max(500).optional(),
});

export const GetBookingsByDateQuerySchema = z.object({
  date: z.coerce.date(),
});

export const UpdateBookingStatusRequestSchema = z.object({
  status: z.enum(statusEnum),
});

export const BookingResponseSchema = z.object({
  _id: MongoIdString,
  bookingDate: z.iso.datetime(),
  queueNumber: z.number(),
  status: z.enum(statusEnum),
  notes: z.string().optional(),
  pet: NestedPetResponseSchema,
  service: ServiceResponseSchema,
  owner: UserResponseSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type CreateBookingRequest = z.infer<typeof CreateBookingRequestSchmea>;
export type GetBookingsByDateQuery = z.infer<typeof GetBookingsByDateQuerySchema>;
export type UpdateBookingStatusRequest = z.infer<typeof UpdateBookingStatusRequestSchema>;
export type BookingResponse = z.infer<typeof BookingResponseSchema>;
