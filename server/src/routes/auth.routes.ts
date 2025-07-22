import { Router } from "express";
import {
  register,
  verifyOTP,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate-request";
import {
  RegisterRequestSchema,
  VerifyOTPRequestSchema,
  LoginRequestSchema,
  RefreshRequestSchema,
  LogoutRequestSchema,
} from "../domain/dto/auth.dto";

const router = Router();

router.post("/register", validateRequest(RegisterRequestSchema), register);
router.post("/verify-otp", validateRequest(VerifyOTPRequestSchema), verifyOTP);
router.post("/login", validateRequest(LoginRequestSchema), login);
router.post("/refresh", validateRequest(RefreshRequestSchema), refresh);
router.post("/logout", validateRequest(LogoutRequestSchema), logout);

export default router;
