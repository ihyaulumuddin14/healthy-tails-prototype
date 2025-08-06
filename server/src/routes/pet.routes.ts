import { Router } from "express";

import { CreatePetRequestSchema, PetIdParamSchema, UpdatePetRequestSchema } from "../domain/dto/pet.dto.js";
import { CreateVisitHistorySchema } from "../domain/dto/visit-history.dto.js";

import { adminOnly } from "../middlewares/admin-only.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateParams, validateRequest } from "../middlewares/validate-request.js";

import { createPet, deletePet, findAllPets, findPetById, updatePet } from "../controllers/pet.controller.js";
import { createVisitHistoryForPet, findAllHistoriesForPet } from "../controllers/visit-history.controller.js";

const router = Router();

router.get("/", authenticate, findAllPets);
router.get("/:id", authenticate, validateParams(PetIdParamSchema), findPetById);
router.post("/", authenticate, validateRequest(CreatePetRequestSchema), createPet);
router.patch(
  "/:id",
  authenticate,
  validateParams(PetIdParamSchema),
  validateRequest(UpdatePetRequestSchema),
  updatePet
);
router.delete("/:id", authenticate, validateParams(PetIdParamSchema), deletePet);

router.get("/:id/history", authenticate, findAllHistoriesForPet);
router.post(
  "/:id/history",
  authenticate,
  adminOnly,
  validateParams(PetIdParamSchema),
  validateRequest(CreateVisitHistorySchema),
  createVisitHistoryForPet
);

export default router;
