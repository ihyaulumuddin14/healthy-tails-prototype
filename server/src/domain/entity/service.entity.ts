import mongoose, { Document, Schema } from "mongoose";

export interface ServiceItf extends Document {
  _id: string;
  name: string;
  estimatedDurationMinutes: number;
  isActive: boolean;
}

const ServiceSchema = new Schema({
  name: {
    type: String,
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
