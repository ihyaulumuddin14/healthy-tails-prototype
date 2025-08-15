import mongoose from "mongoose";
import z from "zod";

export const MongoIdString = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid ID format",
});

export const IdParamSchema = z.object({
  id: MongoIdString,
});
