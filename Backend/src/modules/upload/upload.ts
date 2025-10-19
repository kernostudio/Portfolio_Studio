// routes/upload.ts
import express, { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

// Add a GET route for testing
// router.get("/upload", (req, res) => {
//   res.json({
//     success: true,
//     message: "Upload endpoint is working!",
//     timestamp: new Date().toISOString(),
//   });
// });

// Single file upload
router.post(
  "/upload",

  multerUpload.single("file"),
  (req, res) => {
    try {
      console.log("Upload request received:", req.file);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No file uploaded",
        });
      }

      const fileUrl = req.file.path;
      console.log("File uploaded to Cloudinary:", fileUrl);

      res.status(200).json({
        success: true,
        url: fileUrl,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({
        success: false,
        error: "Upload failed",
      });
    }
  }
);

export const uploadRouter = router;
