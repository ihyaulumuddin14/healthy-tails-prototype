import mongoose, { Document, Schema } from "mongoose";

import { PetItf } from "./pet.entity.js";
import { ServiceItf } from "./service.entity.js";
import { UserItf } from "./user.entity.js";
import { VisitHistoryItf } from "./visit-history.entity.js";

export const statusEnum = ["WAITING", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

export type BookingStatus = (typeof statusEnum)[number];

export interface BookingItf extends Document {
  _id: string;
  bookingDate: Date;
  queueNumber: number;
  status: BookingStatus;
  notes?: string;
  pet: PetItf;
  owner: UserItf;
  service: ServiceItf;
  visitHistory?: VisitHistoryItf;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema(
  {
    bookingDate: {
      type: Date,
      required: true,
    },
    queueNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: statusEnum,
      default: "WAITING",
      required: true,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    visitHistory: {
      type: Schema.Types.ObjectId,
      ref: "VisitHistory",
    },
  },
  { timestamps: true }
);

BookingSchema.index({ bookingDate: 1, queueNumber: 1 });

const BookingModel = mongoose.model<BookingItf>("Booking", BookingSchema);

export default BookingModel;
