import mongoose from "mongoose";
import { z } from "zod";

const MongoIdString = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ID format",
});

export const NewsIdParamSchema = z.object({
  id: MongoIdString,
});

export const CreateNewsRequestSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters long"),
  imageUrl: z
    .url("Invalid image URL")
    .min(1, "Image URL is required")
    .max(255, "Image URL must be at most 255 characters long"),
  badge: z.string().min(1, "Badge is required").max(50, "Badge must be at most 50 characters long"),
  sourceUrl: z
    .url("Invalid source URL")
    .min(1, "Source URL is required")
    .max(255, "Source URL must be at most 255 characters long"),
});

export const UpdateNewsRequestSchema = CreateNewsRequestSchema.partial();

export const NewsResponseSchema = z.object({
  _id: MongoIdString,
  title: z.string(),
  imageUrl: z.url(),
  badge: z.string(),
  sourceUrl: z.url(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type NewsResponse = z.infer<typeof NewsResponseSchema>;
export type CreateNewsRequest = z.infer<typeof CreateNewsRequestSchema>;
export type UpdateNewsRequest = z.infer<typeof UpdateNewsRequestSchema>;
