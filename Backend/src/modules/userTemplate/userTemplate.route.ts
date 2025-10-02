import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { userTemplateController } from "./userTemplate.controller";

const router = Router();
router.post(
  "/",
  authenticate,
  authorize(["admin", "user"]),
  userTemplateController.createUserTemplate
);
router.get(
  "/:userId/:templateId",
  authenticate,
  authorize(["admin", "user"]),
  userTemplateController.getSingleUserTemplate
);
router.delete(
  "/:userId/:templateId",
  authenticate,
  authorize(["admin", "user"]),
  userTemplateController.deleteUserTemplate
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin", "user"]),
  userTemplateController.getAllUserTemplates
);
export const userTemplateRoutes = router;
