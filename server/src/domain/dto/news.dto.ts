import { z } from "zod";
import mongoose from "mongoose";

const MongoIdString = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ID format",
  });

export const NewsIdParamSchema = z.object({
  id: MongoIdString,
});

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
