import { Router } from "express";
import authRoutes from "./auth.routes.js";
import newsRoutes from "./news.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/news", newsRoutes);
router.use("/users", userRoutes);

export default router;
