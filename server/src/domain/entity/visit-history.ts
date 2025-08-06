import mongoose, { Document, Schema } from "mongoose";

export const vaccineEnum = [
  "FeLV",
  "Panleucopenia",
  "Rhinotracheitis",
  "Calicivirus",
  "Chlamydia",
  "Rabies",
  "Distemper",
  "Parvo",
  "Leptospirosis",
  "Parainfluenza",
  "Hepatitis",
  "Bordetella",
] as const;

type Vaccine = (typeof vaccineEnum)[number];

export interface VisitHistoryItf extends Document {
  _id: string;
  visitDate: Date;
  nextVisitDate?: Date;
  bodyWeight: number;
  temperature: number;
  symptoms: string;
  diagnosis?: string;
  treatments?: string;
  vaccinesGiven?: Vaccine[];
  injectionSite?: string;
  notes?: string;
  pet: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VisitHistorySchema = new Schema(
  {
    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    nextVisitDate: {
      type: Date,
    },
    bodyWeight: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
      maxlength: 500,
    },
    diagnosis: {
      type: String,
      maxlength: 500,
    },
    treatments: {
      type: String,
      maxlength: 500,
    },
    vaccinesGiven: [
      {
        type: String,
        enum: vaccineEnum,
      },
    ],
    injectionSite: {
      type: String,
      maxlength: 100,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const VisitHistoryModel = mongoose.model<VisitHistoryItf>("VisitHistory", VisitHistorySchema);

export default VisitHistoryModel;
