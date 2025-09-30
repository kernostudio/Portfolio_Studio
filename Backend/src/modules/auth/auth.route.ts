import { Router } from "express";
import { authController } from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();
router.post("/register", authController.RegisterUser);
router.post("/login", authController.userLogin);
router.post("/logout", authController.userLogout);
router.get("/profile", authenticate, authController.userProfile);
export const authRoutes = router;
