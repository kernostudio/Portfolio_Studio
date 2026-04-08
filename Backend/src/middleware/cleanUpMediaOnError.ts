import { NextFunction, Request, Response } from "express";
import { deleteImageFromCLoudinary } from "../config/cloudinary.config";

export const cleanupCloudinaryOnError = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      await deleteImageFromCLoudinary(req.file.path);
    }

    if (req.files && Array.isArray(req.files) && req.files.length) {
      const imgUrls = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );
      await Promise.all(imgUrls.map((url) => deleteImageFromCLoudinary(url)));
    }
  } catch (cleanupErr) {
    console.error("Failed to cleanup Cloudinary:", cleanupErr);
  }

  next(err); // Pass the original error down to your global error handler
};
