import morgan from "morgan";
import logger from "../utils/logger.js";
import { Application } from "express";

const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

const morganMiddleware = morgan("combined", { stream });

export const setupLogging = (app: Application) => {
  app.use(morganMiddleware);
};
