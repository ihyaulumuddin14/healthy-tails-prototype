import { z } from 'zod';

export const LoginSchema = z.object({
   email: z.string().email("Invalid email format").max(255),
   password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(255)
      .regex(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
   rememberMe: z.boolean(),
});

export const RegisterSchema = z.object({
   name: z.string().min(5, "Name must be at least 5 characters long").max(50),
   email: z.string().email("Invalid email format").max(255),
   password: z
   .string()
   .min(8, "Password must be at least 8 characters long")
   .max(255)
   .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
      "Password format is invalid."
   ),
})

export const ResetPasswordUISchema = z
   .object({
      newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(255)
      .regex(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
      confirmPassword: z.string()
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords doesn't match",
      path: ["confirmPassword"],
   }) 

export const ResetPasswordSchema = z.object({
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
   
export const ForgotPasswordSchema = z.object({
   email: z.string().email("Invalid email format").max(255),
});

export const VerifyOTPSchema = z.object({
  email: z.string().email("Invalid email format").max(255),
  otp: z.string().length(6, "OTP must be exactly 6 characters long"),
});

export const TokenResponseSchema = z.object({
  accessToken: z.string(),
});

export const LogoutRequestSchema = z.object({
  refreshToken: z
    .string()
    .min(10, "Refresh token must be at least 10 characters long"),
});
   
export type LoginCredentials = z.infer<typeof LoginSchema>;
export type RegisterCredentials = z.infer<typeof RegisterSchema>
export type ResetPasswordUICredentials = z.infer<typeof ResetPasswordUISchema>;
export type ForgotPasswordCredentials = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordCredentials = z.infer<typeof ResetPasswordSchema>;
export type VerifyOTPCredentials = z.infer<typeof VerifyOTPSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LogoutCredentials = z.infer<typeof LogoutRequestSchema>;