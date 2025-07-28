import { Router } from "express";
import {
  findAllNews,
  findNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/news.controller.js";
import {
  validateRequest,
  validateParams,
} from "../middlewares/validate-request.js";
import {
  NewsIdParamSchema,
  CreateNewsRequestSchema,
  UpdateNewsRequestSchema,
} from "../domain/dto/news.dto.js";
import { authenticate } from "../middlewares/authenticate.js";
import { adminOnly } from "../middlewares/admin-only.js";

const router = Router();
router.get("/", findAllNews);
router.get("/:id", validateParams(NewsIdParamSchema), findNewsById);
router.post(
  "/",
  authenticate,
  adminOnly,
  validateRequest(CreateNewsRequestSchema),
  createNews
);
router.patch(
  "/:id",
  authenticate,
  adminOnly,
  validateParams(NewsIdParamSchema),
  validateRequest(UpdateNewsRequestSchema),
  updateNews
);
router.delete(
  "/:id",
  authenticate,
  adminOnly,
  validateParams(NewsIdParamSchema),
  deleteNews
);

export default router;
