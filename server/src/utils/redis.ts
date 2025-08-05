import redis from "../config/redis.js";

import { HttpError } from "./http-error.js";

export const setCache = async (key: string, value: unknown, ttl: number) => {
  const jsonData = JSON.stringify(value);
  await redis.set(key, jsonData, "EX", ttl);
};

export const getCache = async <T = unknown>(key: string): Promise<T | null> => {
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as T) : null;
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};

export const setOTP = async (email: string, otp: string) => {
  await redis.set(`otp:${email}`, otp, "EX", 300);
};

export const getOTP = async (email: string) => {
  const otp = await redis.get(`otp:${email}`);

  if (!otp) {
    throw new HttpError(404, "OTP expired or not found");
  }

  await redis.del(`otp:${email}`);
  return otp;
};

export const deleteOTP = async (email: string) => {
  await redis.del(`otp:${email}`);
};

export const setResetToken = async (email: string, token: string) => {
  await redis.set(`reset_token:${token}`, email, "EX", 300);
};

export const getResetToken = async (token: string) => {
  const email = await redis.get(`reset_token:${token}`);

  if (!email) {
    throw new HttpError(404, "Reset token expired or not found");
  }

  await redis.del(`reset_token:${token}`);
  return email;
};

export const deleteResetToken = async (token: string) => {
  await redis.del(`reset_token:${token}`);
};
