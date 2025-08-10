import { NextFunction, Request, Response } from "express";

import { HttpError } from "../utils/http-error.js";

export const adminOnly = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "ADMIN") {
    throw new HttpError(403, "Access denied. Admins only.");
  }

  next();
};
