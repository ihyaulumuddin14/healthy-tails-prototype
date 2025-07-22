import { Request, Response } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error";

export const errorHandler = (err: unknown, req: Request, res: Response) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors = undefined;

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.details;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.format();
  }

  res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};
