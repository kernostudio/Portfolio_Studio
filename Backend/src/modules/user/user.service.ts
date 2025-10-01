import { Prisma } from "@prisma/client";
import { prisma } from "../../config/config";
import AppError from "../../errorHelpers/errorHelper";
import httpStatus from "http-status";
const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  if (users.length <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, "users not found");
  }
  return users;
};
const updateUser = async (payload: Prisma.UserUpdateInput, id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return updatedUser;
};
const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  const deleteUser = await prisma.user.delete({
    where: { id },
  });
  return deleteUser;
};
export const userService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
