import { Request, Response, NextFunction } from "express";
import AppError from "../errorHelpers/errorHelper";
import httpStatus from "http-status";

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
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  if (err?.code?.startsWith("P")) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Database Error",
      errors: err.message,
    });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: "Something went wrong!",
    errors: err.message || null,
  });
};
