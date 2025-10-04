import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import * as controller from "./userTemplatePublish.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  controller.createPublishRequest
);

router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  controller.updatePublishStatus
);

export const userTemplatePublishRoutes = router;
