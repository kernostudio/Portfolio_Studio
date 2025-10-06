import { Prisma } from "@prisma/client";
import { prisma } from "../../config/config";
import AppError from "../../errorHelpers/errorHelper";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

const createUser = async (payload: Prisma.UserCreateInput) => {
  const { email, password, ...rest } = payload;

  const isExist = await prisma.user.findUnique({ where: { email } });
  if (isExist) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUND)
  );

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, ...rest },
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    userId: user.id,
    name: user.fullName,
    email: user.email,
    role: user.role,
    token,
  };
};

const userLogin = async (payload: Prisma.UserCreateInput) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Wrong password");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    userId: user.id,
    name: user.fullName,
    email: user.email,
    role: user.role,
    token,
  };
};
const userProfile = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "user profile not found");
  }
  return {
    user,
  };
};
const updateUserProfile = async (
  email: string,
  payload: Partial<Prisma.UserUpdateInput>
) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: payload,
  });

  return updatedUser;
};

export const authService = {
  createUser,
  userLogin,
  userProfile,
  updateUserProfile,
};
