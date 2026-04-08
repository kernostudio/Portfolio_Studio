import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
}

const isProd = process.env.NODE_ENV === "production";

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (!tokenInfo.accessToken) return;

  res.cookie("accessToken", tokenInfo.accessToken, {
    httpOnly: true,
    secure: isProd, // must be true in production (HTTPS)
    sameSite: isProd ? "none" : "lax", // 'none' for cross-origin cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });

  // Also set an expired cookie just in case
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    expires: new Date(0),
  });
};
