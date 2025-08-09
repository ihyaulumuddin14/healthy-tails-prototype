import { Router } from "express";

import {
  CreateServiceRequestSchema,
  ServiceIdParamSchema,
  UpdateServiceRequestSchema,
} from "../domain/dto/service.dto.js";

import { adminOnly } from "../middlewares/admin-only.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateParams, validateRequest } from "../middlewares/validate-request.js";

import { createService, findAllServices, updateService } from "../controllers/service.controller.js";

const router = Router();

router.get("/", authenticate, findAllServices);
router.post("/", authenticate, adminOnly, validateRequest(CreateServiceRequestSchema), createService);
router.patch(
  "/:id",
  authenticate,
  adminOnly,
  validateParams(ServiceIdParamSchema),
  validateRequest(UpdateServiceRequestSchema),
  updateService
);

export default router;
