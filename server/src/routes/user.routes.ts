import { Router } from "express";
import {
  findUserById,
  updateUser,
  changeUserPassword,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { adminOnly } from "../middlewares/admin-only.js";

const router = Router();

router.get("/me", authenticate, findUserById);
router.put("/me", authenticate, updateUser);
router.put("/me/change-password", authenticate, changeUserPassword);
router.get("/", authenticate, adminOnly);
router.get("/:id", authenticate, adminOnly);
router.delete("/:id", authenticate, adminOnly);

export default router;
