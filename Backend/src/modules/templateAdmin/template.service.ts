import { Prisma } from "@prisma/client";
import { prisma } from "../../config/config";
import AppError from "../../errorHelpers/errorHelper";
import httpStatus from "http-status";

const createTemplate = async (
  payload: Prisma.TemplateCreateInput & { categoryId: string }
) => {
  if (!payload.categoryId) {
    throw new AppError(httpStatus.BAD_REQUEST, "categoryId is required");
  }

  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid categoryId");
  }

  const result = await prisma.template.create({
    data: {
      title: payload.title,
      description: payload.description,
      html: payload.html,
      placeholders: payload.placeholders,
      sections: payload.sections,

      category: {
        connect: { id: payload.categoryId },
      },
    },
  });
  const previewUrl = `/${result.id}`;
  const updatedResult = await prisma.template.update({
    where: { id: result.id },
    data: { previewUrl },
  });
  return updatedResult;
};
const updateTemplate = async (
  payload: Prisma.TemplateUpdateInput,
  id: string
) => {
  const template = await prisma.template.findUnique({
    where: { id },
  });
  if (!template) {
    throw new AppError(httpStatus.NOT_FOUND, "template not found");
  }
  const result = await prisma.template.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteTemplate = async (id: string) => {
  const template = await prisma.template.findUnique({
    where: { id },
  });
  if (!template) {
    throw new AppError(httpStatus.NOT_FOUND, "template not found");
  }
  const result = await prisma.template.delete({
    where: { id },
  });
  return result;
};
const getSingleTemplate = async (id: string) => {
  const template = await prisma.template.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!template) {
    throw new AppError(httpStatus.NOT_FOUND, "template doesn't exist");
  }
  return template;
};
const getAllTemplate = async (query: any) => {
  const { page, limit, search } = query;
  const skip = (page - 1) * limit;
  const where: Prisma.TemplateWhereInput = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const total = await prisma.template.count({
    where,
  });
  const template = await prisma.template.findMany({
    where,
    skip,
    take: limit,
    include: { category: true },
  });
  if (!template) {
    throw new AppError(httpStatus.NOT_FOUND, "no templates found");
  }
  const data = {
    total,
    page,
    template,
  };
  return data;
};
export const adminTemplateService = {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getSingleTemplate,
  getAllTemplate,
};
