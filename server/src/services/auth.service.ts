import bcrypt from "bcrypt";
import crypto from "crypto";

import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResendOTPRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
} from "../domain/dto/auth.dto.js";

import { toUserResponse } from "../helpers/user-mapper.js";

import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  removeRefreshToken,
  updateUserByEmail,
} from "../repositories/user.repository.js";

import { sendOTPEmail, sendResetLinkEmail } from "../utils/email.js";
import { HttpError } from "../utils/http-error.js";
import { RefreshTokenPayload, generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt.js";
import { generateOTP } from "../utils/otp.js";
import { getCache, getOTP, getResetToken, setCache, setOTP, setResetToken } from "../utils/redis.js";

export const registerUser = async (payload: RegisterRequest) => {
  const { name, email, password } = payload;

  const user = await findUserByEmail(email);
  if (user) {
    throw new HttpError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = await generateOTP();

  await createUser({
    name,
    email,
    password: hashedPassword,
  });

  await setOTP(email, otp);
  await sendOTPEmail(email, otp);

  const cooldownKey = `otp_cooldown:${email}`;
  await setCache(cooldownKey, true, 300);
};

export const verifyOTPUser = async (payload: VerifyOTPRequest) => {
  const { email, otp } = payload;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  const storedOTP = await getOTP(email);
  if (storedOTP !== otp) {
    throw new HttpError(400, "Invalid OTP");
  }

  const accessToken = generateAccessToken(user._id.toString(), user.email, user.role);
  const refreshToken = generateRefreshToken(user._id, false);

  await updateUserByEmail(email, { verified: true, refreshToken });

  return { accessToken, refreshToken, user: toUserResponse(user) };
};

export const resendOTPUser = async (payload: ResendOTPRequest) => {
  const { email } = payload;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (user.verified) {
    throw new HttpError(400, "User already verified");
  }

  const cacheKey = `otp_cooldown:${email}`;

  const cooldown = await getCache(cacheKey);
  if (cooldown) {
    throw new HttpError(429, "Please wait before requesting a new OTP");
  }

  const otp = await generateOTP();
  await setOTP(email, otp);
  await sendOTPEmail(email, otp);

  await setCache(cacheKey, true, 300);
};

export const loginUser = async (payload: LoginRequest) => {
  const { email, password, rememberMe } = payload;

  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, "Incorrect email or password");
  }

  if (!user.verified) {
    throw new HttpError(403, "Account not verified");
  }

  const accessToken = generateAccessToken(user._id.toString(), user.email, user.role);
  const refreshToken = generateRefreshToken(user._id, rememberMe);

  await updateUserByEmail(email, { refreshToken });

  return { accessToken, refreshToken, user: toUserResponse(user) };
};

export const refreshUser = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new HttpError(401, "Invalid or expired refresh token");
  }

  const decoded = verifyToken<RefreshTokenPayload>(refreshToken);
  if (!decoded) {
    throw new HttpError(401, "Invalid or expired refresh token");
  }

  const newAccessToken = generateAccessToken(user._id.toString(), user.email, user.role);
  const newRefreshToken = generateRefreshToken(user._id, decoded.rememberMe);

  await updateUserByEmail(user.email, { refreshToken: newRefreshToken });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    rememberMe: decoded.rememberMe,
  };
};

export const logoutUser = async (refreshToken: string) => {
  const user = await findUserByRefreshToken(refreshToken);
  if (!user) {
    return;
  }

  await removeRefreshToken(refreshToken);
};

export const forgotPasswordUser = async (payload: ForgotPasswordRequest) => {
  const { email } = payload;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  await setResetToken(email, resetToken);
  await sendResetLinkEmail(email, resetToken);
};

export const resetPasswordUser = async (payload: ResetPasswordRequest) => {
  const { resetToken, password } = payload;

  const email = await getResetToken(resetToken);

  const user = await findUserByEmail(email);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updateUserByEmail(email, { password: hashedPassword });
};
