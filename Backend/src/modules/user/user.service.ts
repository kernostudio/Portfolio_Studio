import { Prisma } from "@prisma/client";
import { prisma } from "../../config/config";
import AppError from "../../errorHelpers/errorHelper";
import httpStatus from "http-status";
const getAllUsers = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = search
    ? {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  if (users.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No users found");
  }

  return {
    users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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
