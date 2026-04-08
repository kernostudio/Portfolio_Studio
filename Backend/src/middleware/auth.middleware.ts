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
  try {
    // ✅ Read token from cookie
    const token = req.cookies.accessToken;

    if (!token) {
      // Return 401 but don't throw a noisy AppError if we want to be quiet
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

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

    (req as any).user = {
      id: user.id,
      email: user.email,
      role: user.role as "user" | "admin",
    };

    next();
  } catch (err) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Session expired or invalid. Please login again.",
    });
  }
};

// Authorization remains same
export const authorize =
  (roles: ("user" | "admin")[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtPayload;
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    if (!roles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Forbidden: admin can access only"
      );
    }
    next();
  };
