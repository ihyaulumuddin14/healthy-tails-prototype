import { Router } from "express";

import authRoutes from "./auth.routes.js";
import newsRoutes from "./news.routes.js";
import petRoutes from "./pet.routes.js";
import userRoutes from "./user.routes.js";
import visitHistoryRoutes from "./visit-history.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/news", newsRoutes);
router.use("/users", userRoutes);
router.use("/pets", petRoutes);
router.use("/history", visitHistoryRoutes);

export default router;
