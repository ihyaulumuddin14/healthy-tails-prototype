import cron from "node-cron";

import { deleteUnverifiedUsers } from "../repositories/user.repository.js";

import logger from "./logger.js";

cron.schedule("0 * * * *", async () => {
  logger.info("Running scheduled job: Deleting unverified users...");
  try {
    const result = await deleteUnverifiedUsers();
    if (result.deletedCount > 0) {
      logger.info(`Successfully deleted ${result.deletedCount} unverified users.`);
    } else {
      logger.info("No unverified users to delete.");
    }
  } catch (err) {
    logger.error("Failed to execute unverified user cleanup job:", err);
  }
});

logger.info("Scheduled job to delete unverified users has been set up.");
