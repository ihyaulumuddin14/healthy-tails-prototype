import dotenv from "dotenv";
import mongoose from "mongoose";

import ServiceModel from "../domain/entity/service.entity.js";

import logger from "../utils/logger.js";

dotenv.config();

const servicesToSeed = [
  {
    name: "General / Emergency Consultation",
    estimatedDurationMinutes: 25,
  },
  {
    name: "Routine Vaccination",
    estimatedDurationMinutes: 15,
  },
  {
    name: "Health Checkup",
    estimatedDurationMinutes: 30,
  },
  {
    name: "Sterilization",
    estimatedDurationMinutes: 90,
  },
];

export const seedServicesDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    logger.error("MONGO_URI is not defined in .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    logger.info("Connected to MongoDB for service seeding...");

    for (const service of servicesToSeed) {
      await ServiceModel.findOneAndUpdate({ name: service.name }, service, { upsert: true });
    }

    logger.info(`${servicesToSeed.length} services have been seeded/updated successfully.`);
  } catch (error) {
    logger.error("Error seeding the services database:", error);
  } finally {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
    process.exit(0);
  }
};
