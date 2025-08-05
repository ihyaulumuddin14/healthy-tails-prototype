import jwt, { JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  id: string;
  rememberMe: boolean;
}

export const generateAccessToken = (userId: string, name: string, email: string, role: string) => {
  return jwt.sign({ id: userId, name, email, role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (userId: string, rememberMe: boolean) => {
  const expiresIn = rememberMe ? "30d" : "7d";
  return jwt.sign({ id: userId, rememberMe }, process.env.JWT_SECRET!, {
    expiresIn,
  });
};

export const verifyToken = <T extends JwtPayload>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as T;
    return decoded;
  } catch {
    return null;
  }
};
