import { Router } from "express";

import {
  ForgotPasswordRequestSchema,
  LoginRequestSchema,
  RegisterRequestSchema,
  ResendOTPRequestSchema,
  ResetPasswordRequestSchema,
  VerifyOTPRequestSchema,
} from "../domain/dto/auth.dto.js";

import { validateRequest } from "../middlewares/validate-request.js";

import {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
  resendOTP,
  resetPassword,
  verifyOTP,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateRequest(RegisterRequestSchema), register);
router.post("/verify-otp", validateRequest(VerifyOTPRequestSchema), verifyOTP);
router.post("/resend-otp", validateRequest(ResendOTPRequestSchema), resendOTP);
router.post("/login", validateRequest(LoginRequestSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/forgot-password", validateRequest(ForgotPasswordRequestSchema), forgotPassword);
router.post("/reset-password", validateRequest(ResetPasswordRequestSchema), resetPassword);

export default router;
