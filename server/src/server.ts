import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/routes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FE_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.disable("x-powered-by");

app.use("/api/v1", routes);

const PORT = parseInt(process.env.PORT || "3000");
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
