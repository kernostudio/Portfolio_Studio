import { Router } from "express";
import { authController } from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { multerUpload } from "../../config/multer.config";

const router = Router();
router.post("/register", authController.RegisterUser);
router.post("/login", authController.userLogin);
router.post("/logout", authenticate, authController.userLogout);
router.get("/profile", authenticate, authController.userProfile);

router.patch(
  "/profile",
  authenticate,
  multerUpload.single("file"),
  authController.updateUserProfile
);

export const authRoutes = router;
