import { Router } from "express";
import { register, verifyOTP } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validate-request";
import {
  RegisterRequestSchema,
  VerifyOTPRequestSchema,
} from "../domain/dto/auth.dto";

const router = Router();

router.post("/register", validateRequest(RegisterRequestSchema), register);
router.post("/verify-otp", validateRequest(VerifyOTPRequestSchema), verifyOTP);

export default router;
