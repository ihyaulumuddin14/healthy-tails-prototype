import { Request, Response, NextFunction } from "express";
import { AccessTokenPayload, verifyToken } from "../utils/jwt.js";
import { HttpError } from "../utils/http-error.js";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    throw new HttpError(401, "Authentication token is required");
  }

  const decoded = verifyToken<AccessTokenPayload>(token);
  if (!decoded) {
    throw new HttpError(401, "Invalid authentication token");
  }

  req.user = decoded;
  next();
};
