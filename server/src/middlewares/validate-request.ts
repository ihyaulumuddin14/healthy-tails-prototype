import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(new HttpError(400, "Invalid request data", err));
    }
  };
