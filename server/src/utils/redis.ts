import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export const setOTP = async (email: string, otp: string) => {
  await redis.set(`otp:${email}`, otp, "EX", 300);
};

export const getOTP = async (email: string) => {
  const otp = await redis.get(`otp:${email}`);

  if (!otp) {
    throw new Error("OTP expired or not found");
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
    throw new Error("Reset token expired or not found");
  }

  await redis.del(`reset_token:${token}`);
  return email;
};

export const deleteResetToken = async (token: string) => {
  await redis.del(`reset_token:${token}`);
};
