// routes/upload.ts
import express from "express";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

// Single file upload
router.post("/upload", multerUpload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Multer + Cloudinary already uploads the file
    // req.file contains info about uploaded file
    const fileUrl = req.file.path; // Cloudinary URL
    res.status(200).json({ url: fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export const uploadRouter = router;
