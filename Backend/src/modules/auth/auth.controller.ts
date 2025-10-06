import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { setAuthCookie } from "../../utils/setCookie";

const RegisterUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createUser(req.body);

  setAuthCookie(res, result.token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: {
      userId: result.userId,
      name: result.name,
      email: result.email,
      role: result.role,
      token: result.token.accessToken,
    },
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.userLogin(req.body);

  setAuthCookie(res, result.token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: {
      userId: result.userId,
      name: result.name,
      email: result.email,
      role: result.role,
      token: result.token.accessToken,
    },
  });
});
const userLogout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logout successful",
    data: null,
  });
});
const userProfile = catchAsync(async (req: Request, res: Response) => {
  const email = req.user.email;
  const result = await authService.userProfile(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "get user profile successfully",
    data: result,
  });
});
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const email = req.user.email;

  const avatarUrl = req.file ? (req.file as any).path : undefined;

  const result = await authService.updateUserProfile(email, {
    fullName: req.body.fullName,
    avatarUrl: avatarUrl,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

export const authController = {
  RegisterUser,
  userLogin,
  userLogout,
  userProfile,
  updateUserProfile,
};
