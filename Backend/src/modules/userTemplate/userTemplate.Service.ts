import { Prisma } from "@prisma/client";
import { prisma } from "../../config/config";
import AppError from "../../errorHelpers/errorHelper";
import httpStatus from "http-status";

const createUserTemplate = async (
  payload: Prisma.UserTemplateCreateInput & { templateId: string },
  id: string
) => {
  const { templateId } = payload;
  if (!templateId) {
    throw new AppError(httpStatus.BAD_REQUEST, "template id required");
  }
  const template = await prisma.template.findUnique({
    where: { id: templateId },
  });
  if (!template) {
    throw new AppError(httpStatus.NOT_FOUND, "template not found");
  }
  const userTemplate = await prisma.userTemplate.create({
    data: {
      filledValues: payload.filledValues,
      template: {
        connect: { id: payload.templateId },
      },
      sectionsData: payload.sectionsData,
      user: {
        connect: { id: id },
      },
    },
  });
  return userTemplate;
};
const getSingleUserTemplate = async (
  userTemplateId: string,
  userId: string
) => {
  const template = await prisma.userTemplate.findFirst({
    where: {
      id: userTemplateId,
      userId: userId,
    },
    include: { template: true, user: true },
  });

  if (!template) {
    throw new AppError(httpStatus.NOT_FOUND, "no template found for this user");
  }

  return template;
};
const deleteUserTemplate = async (userTemplateId: string, userId: string) => {
  const templateExist = await prisma.userTemplate.findUnique({
    where: {
      id: userTemplateId,
      userId: userId,
    },
  });

  if (!templateExist) {
    throw new AppError(httpStatus.NOT_FOUND, "template doesn't exist");
  }

  const template = await prisma.userTemplate.delete({
    where: {
      id: userTemplateId,
      userId: userId,
    },
  });

  return template;
};
const updateUserTemplate = async (
  userTemplateId: string,
  userId: string,
  data: {
    filledValues?: any;
  }
) => {
  // Check if exists
  const templateExist = await prisma.userTemplate.findFirst({
    where: {
      id: userTemplateId,
      userId: userId,
    },
  });

  if (!templateExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Template doesn't exist");
  }

  // ✅ Update filledValues or sectionsData
  const updatedTemplate = await prisma.userTemplate.update({
    where: { id: userTemplateId },
    data: {
      ...(data.filledValues && { filledValues: data.filledValues }),
    },
  });

  return updatedTemplate;
};

const getAllUserTemplates = async (userId: string) => {
  const templates = await prisma.userTemplate.findMany({
    where: { userId },
    select: {
      id: true,
      createdAt: true, // ✅ include this
      updatedAt: true, // ✅ include this
      template: {
        select: {
          title: true,
          description: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!templates || templates.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No templates found");
  }

  return templates;
};

export const userTemplateService = {
  createUserTemplate,
  getSingleUserTemplate,
  getAllUserTemplates,
  deleteUserTemplate,
  updateUserTemplate,
};
