import { Prisma } from "@prisma/client";
import { prisma } from "../../config/config";
import AppError from "../../errorHelpers/errorHelper";
import httpStatus from "http-status";

const createCategory = async (payload: Prisma.CategoryCreateInput) => {
  const { name } = payload;
  const isExistCategory = await prisma.category.findUnique({
    where: { name },
  });
  if (isExistCategory) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "name already exist");
  }
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany();
  if (result.length <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, "no category found");
  }
  return result;
};
const deleteCategory = async (id: string) => {
  const exist = await prisma.category.findUnique({
    where: { id },
  });
  if (!exist) {
    throw new AppError(httpStatus.NOT_FOUND, " category doesn't exist");
  }
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};
const updateCategory = async (
  id: string,
  payload: Prisma.CategoryUpdateInput
) => {
  const exist = await prisma.category.findUnique({
    where: { id },
  });
  if (!exist) {
    throw new AppError(httpStatus.NOT_FOUND, " category doesn't exist");
  }

  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const categoriesService = {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
