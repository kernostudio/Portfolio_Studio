import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (!tokenInfo.accessToken) return;

  res.cookie("accessToken", tokenInfo.accessToken, {
    httpOnly: true,
    secure: false, // works on localhost
    sameSite: "lax", // works on localhost
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  });
};

export const clearAuthCookie = (res: Response) => {
  // Clear with multiple approaches to be sure
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  // Also set an expired cookie
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
};
