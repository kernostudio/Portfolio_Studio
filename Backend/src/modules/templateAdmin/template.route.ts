import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { adminTemplateController } from "./template.controller";

const router = Router();
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  adminTemplateController.createTemplate
);
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  adminTemplateController.updateTemplate
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  adminTemplateController.deleteTemplate
);
router.get("/:id", adminTemplateController.getSingleTemplate);
router.get("/", adminTemplateController.getAllTemplate);
export const adminTemplatesRoutes = router;
