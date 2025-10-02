import { Router } from "express";
import { userController } from "./user.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();
router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.updateUser
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
);
export const userRoutes = router;
