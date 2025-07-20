import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export const setOTP = async (email: string, otp: string) => {
  await redis.set(`otp:${email}`, otp, "EX", 300);
  return otp;
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
