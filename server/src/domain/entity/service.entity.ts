import mongoose, { Document, Schema } from "mongoose";

export const serviceEnum = [
  "General / Emergency Consultation",
  "Routine Vaccination",
  "Health Checkup",
  "Sterilization",
] as const;

type ServiceName = (typeof serviceEnum)[number];

export interface ServiceItf extends Document {
  _id: string;
  name: ServiceName;
  estimatedDurationMinutes: number;
  isActive: boolean;
}

const ServiceSchema = new Schema({
  name: {
    type: String,
    enum: serviceEnum,
    required: true,
    unique: true,
  },
  estimatedDurationMinutes: {
    type: Number,
    required: true,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const ServiceModel = mongoose.model<ServiceItf>("Service", ServiceSchema);

export default ServiceModel;
