import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { categoriesController } from "./category.controller";

const router = Router();
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  categoriesController.createCategory
);
router.get("/", categoriesController.getAllCategory);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  categoriesController.deleteCategory
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  categoriesController.updateCategory
);
export const categoriesRoutes = router;
