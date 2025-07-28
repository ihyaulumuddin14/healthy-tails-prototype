import { Router } from "express";
import authRoutes from "./auth.routes.js";
import newsRoutes from "./news.routes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/news", newsRoutes);

export default router;
