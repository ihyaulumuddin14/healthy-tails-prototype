import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import verifyUser from "../middleware/verifyUser";
import verifyEmail from "../middleware/verifyEmail";
import * as controller from "../controllers/appController";

const router = Router();

// GET Methods
router.get("/users", controller.getUsers);
router.get("/user", verifyToken, verifyUser, controller.getUser);

// POST Methods
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.post("/request-reset", verifyEmail, controller.requestReset);
router.post("/verify-otp", controller.verifyOTP);
router.post("/reset-password", controller.resetPassword);
router.post("/authenticate", (req, res) => res.end());

// PUT Methods
router.put("/updateUser", verifyToken, verifyUser, controller.updateUser);

export default router;
