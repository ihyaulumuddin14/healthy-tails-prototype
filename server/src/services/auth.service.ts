import {
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RefreshRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
} from "../domain/dto/auth.dto.js";
import {
  findUserByEmail,
  createUser,
  updateUserByEmail,
  findUserByRefreshToken,
  removeRefreshToken,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { HttpError } from "../utils/http-error.js";
import { generateOTP } from "../utils/otp.js";
import {
  setOTP,
  getOTP,
  setResetToken,
  getResetToken,
} from "../utils/redis.js";
import { sendOTPEmail, sendResetLinkEmail } from "../utils/email.js";
import {
  RefreshTokenPayload,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.js";

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

  const accessToken = generateAccessToken(
    user._id.toString(),
    user.name,
    user.email,
    user.role
  );
  const refreshToken = generateRefreshToken(user._id, false);

  await updateUserByEmail(email, { verified: true, refreshToken });

  return { accessToken, refreshToken };
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

  const accessToken = generateAccessToken(
    user._id.toString(),
    user.name,
    user.email,
    user.role
  );
  const refreshToken = generateRefreshToken(user._id, rememberMe);

  await updateUserByEmail(email, { refreshToken });

  return { accessToken, refreshToken };
};

export const refreshUser = async (payload: RefreshRequest) => {
  const { refreshToken } = payload;

  const user = await findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new HttpError(401, "Invalid or expired refresh token");
  }

  const decoded = verifyToken<RefreshTokenPayload>(refreshToken);

  const newAccessToken = generateAccessToken(
    user._id.toString(),
    user.name,
    user.email,
    user.role
  );
  const newRefreshToken = generateRefreshToken(user._id, decoded.rememberMe);

  await updateUserByEmail(user.email, { refreshToken });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (payload: LogoutRequest) => {
  const { refreshToken } = payload;

  const user = await findUserByRefreshToken(refreshToken);
  if (!user) {
    throw new HttpError(401, "Invalid or expired refresh token");
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
