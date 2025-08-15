import { Router } from "express";

import { IdParamSchema } from "../domain/dto/common.dto.js";
import { CreatePetRequestSchema, UpdatePetRequestSchema } from "../domain/dto/pet.dto.js";
import { CreateVisitHistoryRequestSchema } from "../domain/dto/visit-history.dto.js";

import { adminOnly } from "../middlewares/admin-only.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateParams, validateRequest } from "../middlewares/validate-request.js";

import { createPet, deletePet, findAllPets, findPetById, updatePet } from "../controllers/pet.controller.js";
import { createVisitHistoryForPet, findAllHistoriesForPet } from "../controllers/visit-history.controller.js";

const router = Router();

router.get("/", authenticate, findAllPets);
router.get("/:id", authenticate, validateParams(IdParamSchema), findPetById);
router.post("/", authenticate, validateRequest(CreatePetRequestSchema), createPet);
router.patch("/:id", authenticate, validateParams(IdParamSchema), validateRequest(UpdatePetRequestSchema), updatePet);
router.delete("/:id", authenticate, validateParams(IdParamSchema), deletePet);

router.get("/:id/history", authenticate, findAllHistoriesForPet);
router.post(
  "/:id/history",
  authenticate,
  adminOnly,
  validateParams(IdParamSchema),
  validateRequest(CreateVisitHistoryRequestSchema),
  createVisitHistoryForPet
);

export default router;
