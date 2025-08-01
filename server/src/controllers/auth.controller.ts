import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  verifyOTPUser,
  resendOTPUser,
  loginUser,
  refreshUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
} from "../services/auth.service.js";
import { HttpError } from "../utils/http-error.js";

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
    const tokens = await verifyOTPUser(req.body);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/api/v1/auth",
    });

    res.status(200).json({
      message: "OTP verified successfully.",
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const resendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await resendOTPUser(req.body);
    res.status(200).json({ message: "OTP resent successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens = await loginUser(req.body);

    const rememberMe = req.body.rememberMe || false;
    const cookieMaxAge = rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 7 * 24 * 60 * 60 * 1000;

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: cookieMaxAge,
      path: "/api/v1/auth",
    });

    res
      .status(200)
      .json({ message: "Login successfully", accessToken: tokens.accessToken });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshTokenFromCookie = req.cookies.refreshToken;
    if (!refreshTokenFromCookie) {
      throw new HttpError(401, "No refresh token provided");
    }

    const result = await refreshUser(refreshTokenFromCookie);

    const cookieMaxAge = result.rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 7 * 24 * 60 * 60 * 1000;

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: cookieMaxAge,
      path: "/api/v1/auth",
    });

    res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken: result.accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshTokenFromCookie = req.cookies.refreshToken;
    if (refreshTokenFromCookie) {
      await logoutUser(refreshTokenFromCookie);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/v1/auth",
    });

    res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await forgotPasswordUser(req.body);
    res
      .status(200)
      .json({ message: "Reset password URL has been sent to email" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await resetPasswordUser(req.body);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};
