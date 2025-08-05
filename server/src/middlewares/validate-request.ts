import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateParams = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
  try {
    schema.parse(req.params);
    next();
  } catch (err) {
    next(err);
  }
};
