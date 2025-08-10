import { Router } from "express";

import { UpdateVisitHistoryRequestSchema, VisitHistoryIdParamSchema } from "../domain/dto/visit-history.dto.js";

import { adminOnly } from "../middlewares/admin-only.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateParams, validateRequest } from "../middlewares/validate-request.js";

import {
  deleteVisitHistory,
  findVisitHistoryById,
  updateVisitHistory,
} from "../controllers/visit-history.controller.js";

const router = Router();

router.get("/:id", authenticate, validateParams(VisitHistoryIdParamSchema), findVisitHistoryById);
router.patch(
  "/:id",
  authenticate,
  adminOnly,
  validateParams(VisitHistoryIdParamSchema),
  validateRequest(UpdateVisitHistoryRequestSchema),
  updateVisitHistory
);
router.delete("/:id", authenticate, adminOnly, validateParams(VisitHistoryIdParamSchema), deleteVisitHistory);

export default router;
