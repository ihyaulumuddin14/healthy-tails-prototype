import { z } from "zod";

export const RegisterRequestSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long").max(50),
  email: z.email("Invalid email format").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const VerifyOTPRequestSchema = z.object({
  email: z.email("Invalid email format").max(255),
  otp: z.string().length(6, "OTP must be exactly 6 characters long"),
});

export const ResendOTPRequestSchema = z.object({
  email: z.email("Invalid email format").max(255),
});

export const LoginRequestSchema = z.object({
  email: z.email("Invalid email format").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  rememberMe: z.boolean().optional().default(false),
});

export const ForgotPasswordRequestSchema = z.object({
  email: z.email("Invalid email format").max(255),
});

export const ResetPasswordRequestSchema = z.object({
  resetToken: z
    .string()
    .min(10, "Reset token must be at least 10 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type VerifyOTPRequest = z.infer<typeof VerifyOTPRequestSchema>;
export type ResendOTPRequest = z.infer<typeof ResendOTPRequestSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
