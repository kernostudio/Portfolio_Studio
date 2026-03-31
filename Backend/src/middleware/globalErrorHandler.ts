import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errorHelpers/errorHelper";

interface ErrorType extends Error {
  statusCode?: number;
  code?: string;
  meta?: any;
}

export const globalErrorHandler = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Only log full error for unexpected internal errors (500)
  if (!(err instanceof AppError) || err.statusCode >= 500) {
    console.error(err);
  }
  // Noisy client errors (401, 404, etc.) are silenced here.
  // They are still returned to the client as JSON responses below.

  // 1️⃣ Custom application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // 2️⃣ Prisma errors
  if (err?.code) {
    let statusCode: number = httpStatus.BAD_REQUEST;
    let message = "Database Error";
    let details = err.message;

    switch (err.code) {
      case "P2002":
        statusCode = httpStatus.CONFLICT; // 409
        message = "Duplicate value error";
        details = err.meta
          ? `Unique constraint failed on fields: ${err.meta.target}`
          : err.message;
        break;

      case "P2001":
        statusCode = httpStatus.NOT_FOUND; // 404
        message = "Record not found";
        details = err.meta
          ? `Record not found for model: ${err.meta.model}`
          : err.message;
        break;

      case "P2003":
        statusCode = httpStatus.BAD_REQUEST; // 400
        message = "Foreign key constraint failed";
        details = err.meta
          ? `Foreign key constraint failed on fields: ${err.meta.field_name}`
          : err.message;
        break;

      case "P2025":
        statusCode = httpStatus.NOT_FOUND; // 404
        message = "Operation failed, record not found";
        details = err.meta ? `No record found for update/delete` : err.message;
        break;

      default:
        statusCode = httpStatus.BAD_REQUEST;
        message = "Database error";
        details = err.message;
    }

    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors: details,
    });
  }

  // 3️⃣ Fallback for unexpected errors
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: "Something went wrong!",
    errors: err.message || null,
  });
};
