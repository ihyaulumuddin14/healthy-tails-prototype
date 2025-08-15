import { Router } from "express";

import { IdParamSchema } from "../domain/dto/common.dto.js";
import { CreateNewsRequestSchema, UpdateNewsRequestSchema } from "../domain/dto/news.dto.js";

import { adminOnly } from "../middlewares/admin-only.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateParams, validateRequest } from "../middlewares/validate-request.js";

import { createNews, deleteNews, findAllNews, findNewsById, updateNews } from "../controllers/news.controller.js";

const router = Router();

router.get("/", findAllNews);
router.get("/:id", validateParams(IdParamSchema), findNewsById);
router.post("/", authenticate, adminOnly, validateRequest(CreateNewsRequestSchema), createNews);
router.patch(
  "/:id",
  authenticate,
  adminOnly,
  validateParams(IdParamSchema),
  validateRequest(UpdateNewsRequestSchema),
  updateNews
);
router.delete("/:id", authenticate, adminOnly, validateParams(IdParamSchema), deleteNews);

export default router;
