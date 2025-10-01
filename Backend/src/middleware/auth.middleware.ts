import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errorHelpers/errorHelper";
import httpStatus from "http-status";
import { prisma } from "../config/config";

interface JwtPayload {
  id: string;
  email: string;
  role: "user" | "admin";
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await req.headers.authorization;
  if (!token) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User no longer exists");
    }
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
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    if (!roles.includes(user.role))
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Forbidden admin can access only"
      );
    next();
  };
