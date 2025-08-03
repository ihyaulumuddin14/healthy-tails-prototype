import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { setupLogging } from "./middlewares/logging.js";
import logger from "./utils/logger.js";

dotenv.config();

const startServer = async () => {
  if (!process.env.FE_URL) {
    logger.error("FE_URL is not defined in the environment variables");
    process.exit(1);
  }

  await connectDB();

  const app = express();

  setupLogging(app);
  app.use(cors({ origin: process.env.FE_URL, credentials: true }));
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.disable("x-powered-by");

  app.use("/api/v1", routes);

  app.use(errorHandler);

  const PORT = parseInt(process.env.PORT || "3000");

  const server = app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  const signals = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, () => {
      logger.info(`Received ${signal}, shutting down gracefully...`);

      server.close(async () => {
        logger.info("HTTP server closed.");
        await disconnectDB();
        process.exit(0);
      });
    });
  });
};

startServer();
