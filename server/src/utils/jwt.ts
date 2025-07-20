import jwt from "jsonwebtoken";

export const generateAccessToken = (
  userId: string,
  name: string,
  email: string,
  role: string
) => {
  return jwt.sign({ id: userId, name, email, role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (userId: string, rememberMe: boolean) => {
  const expiresIn = rememberMe ? "30d" : "7d";
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn,
  });
};
