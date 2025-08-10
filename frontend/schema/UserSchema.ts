import { z } from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long").max(50),
});

export const UpdatePasswordUserSchema = z.object({
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

export type UpdateUserCredentials = z.infer<typeof UpdateUserSchema>
export type UpdatePasswordUserCredentials = z.infer<typeof UpdatePasswordUserSchema>