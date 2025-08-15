import z from "zod";

import { MongoIdString } from "./common.dto.js";

export const CreateServiceRequestSchema = z.object({
  name: z.string().max(100, "Service name must be at most 50 characters long"),
  estimatedDurationMinutes: z.number().min(0, "Estimated duration must be a positive number"),
  isActive: z.boolean().optional().default(true),
});

export const UpdateServiceRequestSchema = CreateServiceRequestSchema.partial();

export const ServiceResponseSchema = z.object({
  _id: MongoIdString,
  name: z.string(),
  estimatedDurationMinutes: z.number(),
  isActive: z.boolean(),
});

export type CreateServiceRequest = z.infer<typeof CreateServiceRequestSchema>;
export type UpdateServiceRequest = z.infer<typeof UpdateServiceRequestSchema>;
export type ServiceResponse = z.infer<typeof ServiceResponseSchema>;
