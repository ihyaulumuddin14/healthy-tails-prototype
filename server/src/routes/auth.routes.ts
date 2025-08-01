import { Router } from "express";
import {
  register,
  verifyOTP,
  resendOTP,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import {
  RegisterRequestSchema,
  VerifyOTPRequestSchema,
  ResendOTPRequestSchema,
  LoginRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
} from "../domain/dto/auth.dto.js";

const router = Router();

router.post("/register", validateRequest(RegisterRequestSchema), register);
router.post("/verify-otp", validateRequest(VerifyOTPRequestSchema), verifyOTP);
router.post("/resend-otp", validateRequest(ResendOTPRequestSchema), resendOTP);
router.post("/login", validateRequest(LoginRequestSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post(
  "/forgot-password",
  validateRequest(ForgotPasswordRequestSchema),
  forgotPassword
);
router.post(
  "/reset-password",
  validateRequest(ResetPasswordRequestSchema),
  resetPassword
);

export default router;
