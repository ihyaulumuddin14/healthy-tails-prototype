import { Router } from "express";
import {
  register,
  verifyOTP,
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
  LoginRequestSchema,
  RefreshRequestSchema,
  LogoutRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
} from "../domain/dto/auth.dto.js";

const router = Router();

router.post("/register", validateRequest(RegisterRequestSchema), register);
router.post("/verify-otp", validateRequest(VerifyOTPRequestSchema), verifyOTP);
router.post("/login", validateRequest(LoginRequestSchema), login);
router.post("/refresh", validateRequest(RefreshRequestSchema), refresh);
router.post("/logout", validateRequest(LogoutRequestSchema), logout);
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
