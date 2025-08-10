import { NextFunction, Request, Response } from "express";

import { HttpError } from "../utils/http-error.js";
import { AccessTokenPayload, verifyToken } from "../utils/jwt.js";

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Authentication token is required");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken<AccessTokenPayload>(token);
    if (!decoded) {
      throw new HttpError(401, "Invalid or expired token");
    }

    req.user = decoded;
    next();
  } catch {
    next(new HttpError(401, "Invalid or expired token"));
  }
};
