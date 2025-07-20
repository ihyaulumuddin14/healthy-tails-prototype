import { Request, Response, NextFunction } from "express";
import { registerUser, verifyOTPUser } from "../services/auth.service";
import { TokenResponse } from "../domain/dto/auth.dto";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await registerUser(req.body);
    res
      .status(201)
      .json({ message: "User registered. Check your email for OTP." });
  } catch (err) {
    next(err);
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens: TokenResponse = await verifyOTPUser(req.body);
    res.status(200).json({ message: "OTP verified successfully.", tokens });
  } catch (err) {
    next(err);
  }
};
