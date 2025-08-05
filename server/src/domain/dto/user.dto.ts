import { z } from "zod";
import mongoose from "mongoose";

const MongoIdString = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ID format",
  });

export const UserIdParamSchema = z.object({
  id: MongoIdString,
});

export const UpdateUserRequestSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long").max(50),
});

export const UpdatePasswordUserRequestSchema = z.object({
  oldPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const UserResponseSchema = z.object({
  name: z.string().max(50),
  email: z.email().max(255),
  role: z.enum(["USER", "ADMIN"]),
  verified: z.boolean(),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
export type UpdatePasswordUserRequest = z.infer<
  typeof UpdatePasswordUserRequestSchema
>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
