import mongoose, { Schema, Document } from "mongoose";

export interface PetItf extends Document {
  _id: string;
  name: string;
  type: "Dog" | "Cat";
  race: string;
  color: string;
  birthDate?: Date;
  age: number;
  gender: "Male" | "Female";
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    type: {
      type: String,
      required: true,
      enum: ["Dog", "Cat"],
    },
    race: {
      type: String,
      required: true,
      maxlength: 50,
    },
    color: {
      type: String,
      required: true,
      maxlength: 50,
    },
    birthDate: {
      type: Date,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PetModel = mongoose.model<PetItf>("Pet", PetSchema);

export default PetModel;
