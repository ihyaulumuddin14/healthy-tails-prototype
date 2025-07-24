import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
import logger from "./utils/logger.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDirectory = path.join(__dirname, "..", "..", "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const morganStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);
app.use(
  morgan("combined", {
    stream: morganStream,
    skip: () => process.env.NODE_ENV === "test",
  })
);
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
    skip: () => process.env.NODE_ENV === "test",
  })
);

app.use(
  cors({
    origin: process.env.FE_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.disable("x-powered-by");

app.use("/api/v1", routes);
app.use(errorHandler);

const PORT = parseInt(process.env.PORT || "3000");
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI!)
  .then(() => {
    logger.info("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
