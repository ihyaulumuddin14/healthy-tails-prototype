import { z } from "zod";

import { MongoIdString } from "./common.dto.js";

export const UpdateUserRequestSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long").max(50),
});

export const UpdateAvatarUserRequestSchema = z.object({
  photoUrl: z
    .url("Invalid URL format")
    .min(1, "Photo URL is required")
    .max(255, "Photo URL must be at most 255 characters long"),
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
  _id: MongoIdString,
  name: z.string(),
  email: z.email(),
  role: z.enum(["USER", "ADMIN"]),
  verified: z.boolean(),
  photoUrl: z.url(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
export type UpadateAvatarUserRequest = z.infer<typeof UpdateAvatarUserRequestSchema>;
export type UpdatePasswordUserRequest = z.infer<typeof UpdatePasswordUserRequestSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
