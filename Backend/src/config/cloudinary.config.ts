import { v2 as cloudinary } from "cloudinary";
import AppError from "../errorHelpers/errorHelper";

cloudinary.config({
  api_key: process.env.CLOUDINARY_CLOUD_aPI_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_aPI_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});
export const deleteImageFromCLoudinary = async (url: string) => {
  try {
    //https://res.cloudinary.com/djzppynpk/image/upload/v1753126572/ay9roxiv8ue-1753126570086-download-2-jpg.jpg.jpg

    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;

    const match = url.match(regex);

    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
      console.log(`File ${public_id} is deleted from cloudinary`);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new AppError(401, "Cloudinary image deletion failed", errorMessage);
  }
};
export const cloudinaryUpload = cloudinary;
