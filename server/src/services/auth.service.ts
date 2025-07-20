import { RegisterRequest, VerifyOTPRequest } from "../domain/dto/auth.dto";
import {
  findUserByEmail,
  createUser,
  updateUserByEmail,
} from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { HttpError } from "../utils/http-error";
import { generateOTP } from "../utils/otp";
import { setOTP, getOTP } from "../utils/redis";
import { sendOTPEmail } from "../utils/email";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

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
