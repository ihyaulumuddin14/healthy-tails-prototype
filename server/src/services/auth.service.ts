import {
  LoginRequest,
  LogoutRequest,
  RefreshRequest,
  RegisterRequest,
  VerifyOTPRequest,
} from "../domain/dto/auth.dto";
import {
  findUserByEmail,
  createUser,
  updateUserByEmail,
  findUserByRefreshToken,
  removeRefreshToken,
} from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { HttpError } from "../utils/http-error";
import { generateOTP } from "../utils/otp";
import { setOTP, getOTP } from "../utils/redis";
import { sendOTPEmail } from "../utils/email";
import {
  RefreshTokenPayload,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";

export const registerUser = async (payload: RegisterRequest) => {
  const { name, email, password } = payload;

  const user = await findUserByEmail(email);
  if (user) throw new HttpError(409, "Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = await generateOTP();

  await createUser({
    name,
    email,
    password: hashedPassword,
  });

  setOTP(email, otp);
  await sendOTPEmail(email, otp);
};

export const verifyOTPUser = async (payload: VerifyOTPRequest) => {
  const { email, otp } = payload;

  const user = await findUserByEmail(email);
  if (!user) throw new HttpError(404, "User not found");

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
