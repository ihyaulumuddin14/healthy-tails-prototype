import { Router } from "express";
import {
  findAllPets,
  findPetById,
  createPet,
  updatePet,
  deletePet,
} from "../controllers/pet.controller.js";
import {
  findAllHistoriesForPet,
  createVisitHistoryForPet,
} from "../controllers/visit-history.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  validateRequest,
  validateParams,
} from "../middlewares/validate-request.js";
import {
  CreatePetRequestSchema,
  PetIdParamSchema,
  UpdatePetRequestSchema,
} from "../domain/dto/pet.dto.js";
import { CreateVisitHistorySchema } from "../domain/dto/visit-history.dto.js";

const router = Router();

router.get("/", authenticate, findAllPets);
router.get("/:id", authenticate, validateParams(PetIdParamSchema), findPetById);
router.post(
  "/",
  authenticate,
  validateRequest(CreatePetRequestSchema),
  createPet
);
router.patch(
  "/:id",
  authenticate,
  validateParams(PetIdParamSchema),
  validateRequest(UpdatePetRequestSchema),
  updatePet
);
router.delete(
  "/:id",
  authenticate,
  validateParams(PetIdParamSchema),
  deletePet
);

router.get("/:id/history", authenticate, findAllHistoriesForPet);
router.post(
  "/:id/history",
  authenticate,
  validateParams(PetIdParamSchema),
  validateRequest(CreateVisitHistorySchema),
  createVisitHistoryForPet
);

export default router;
