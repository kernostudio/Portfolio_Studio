import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { templatePublishController } from "./userTemplatePublish.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  templatePublishController.createPublishRequest
);
router.post(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  templatePublishController.getSinglePublishRequest
);

router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  templatePublishController.updatePublishStatus
);

export const userTemplatePublishRoutes = router;
