import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errorHelpers/errorHelper";
import httpStatus from "http-status";

interface JwtPayload {
  id: string;
  email: string;
  role: "user" | "admin";
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid token");
  }
};

export const authorize =
  (roles: ("user" | "admin")[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtPayload;
    if (!roles.includes(user.role))
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
    next();
  };
