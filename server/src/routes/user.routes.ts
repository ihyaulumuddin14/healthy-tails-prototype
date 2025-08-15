import { Router } from "express";

import { IdParamSchema } from "../domain/dto/common.dto.js";
import { UpdatePasswordUserRequestSchema, UpdateUserRequestSchema } from "../domain/dto/user.dto.js";

import { adminOnly } from "../middlewares/admin-only.js";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { validateParams, validateRequest } from "../middlewares/validate-request.js";

import {
  changeUserPassword,
  deleteSelf,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
  uploadAvatar,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/me", authenticate, findUserById);
router.put("/me", authenticate, validateRequest(UpdateUserRequestSchema), updateUser);
router.delete("/me", authenticate, deleteSelf);
router.put("/me/change-password", authenticate, validateRequest(UpdatePasswordUserRequestSchema), changeUserPassword);
router.post("/me/avatar", authenticate, upload.single("avatar"), uploadAvatar);
router.get("/", authenticate, adminOnly, findAllUsers);
router.delete("/:id", authenticate, adminOnly, validateParams(IdParamSchema), deleteUser);

export default router;
