import { Router } from "express";
import { findAllNews, findNewsById } from "../controllers/news.controller.js";
import { validateParams } from "../middlewares/validate-request.js";
import { NewsIdParamSchema } from "../domain/dto/news.dto.js";

const router = Router();
router.get("/", findAllNews);
router.get("/:id", validateParams(NewsIdParamSchema), findNewsById);

export default router;
