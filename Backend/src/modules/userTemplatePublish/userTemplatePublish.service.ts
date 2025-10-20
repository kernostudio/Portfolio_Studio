import { PublishStatus } from "@prisma/client";
import { prisma } from "../../config/config";
import AppError from "../../errorHelpers/errorHelper";
import httpStatus from "http-status";

export const createPublishRequest = async (
  userTemplateId: string,
  payload: { domainType: string; domain?: string; note?: string }
) => {
  const template = await prisma.userTemplate.findUnique({
    where: { id: userTemplateId },
  });

  if (!template)
    throw new AppError(httpStatus.NOT_FOUND, "User template not found");

  const publish = await prisma.userTemplatePublish.create({
    data: {
      userTemplateId,
      domainType: payload.domainType,
      domain: payload.domain,
      note: payload.note,
      status: "pending",
    },
  });

  return publish;
};
export const getSinglePublishRequest = async (userTemplateId: string) => {
  // Check if the userTemplate exists
  const template = await prisma.userTemplate.findUnique({
    where: { id: userTemplateId },
  });

  if (!template) {
    throw new AppError(httpStatus.NOT_FOUND, "User template not found");
  }

  // Fetch the publish request related to this userTemplate
  const publish = await prisma.userTemplatePublish.findFirst({
    where: { userTemplateId },
    include: {
      userTemplate: {
        include: {
          template: true,
          user: true,
        },
      },
    },
  });

  // ✅ If no publish request found, return default response
  if (!publish) {
    return {
      status: "not_requested",
      message: "No publish request found for this template",
    };
  }

  return publish;
};
export const getUserAllPublishRequests = async (userId: string) => {
  const publishRequests = await prisma.userTemplatePublish.findMany({
    where: {
      userTemplate: {
        userId,
      },
    },
    include: {
      userTemplate: {
        include: {
          template: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return publishRequests;
};

export const updatePublishStatus = async (
  publishId: string,
  status: PublishStatus,
  note?: string
) => {
  const publish = await prisma.userTemplatePublish.update({
    where: { id: publishId },
    data: { status, note },
  });

  return publish;
};

export const getPublishByDomain = async (domain: string) => {
  const publish = await prisma.userTemplatePublish.findFirst({
    where: { domain, status: "approved" },
    include: {
      userTemplate: { include: { template: true } },
    },
  });

  return publish;
};
export const getallPublishRequest = async () => {
  const publish = await prisma.userTemplatePublish.findMany({
    include: {
      userTemplate: {
        include: {
          user: {
            select: { id: true, fullName: true, email: true },
          },
          template: {
            select: { id: true, title: true, templateImgUrl: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return publish;
};

export const getSubdomainPublish = async (userTemplateId: string) => {
  const publish = await prisma.userTemplatePublish.findFirst({
    where: { userTemplateId, domainType: "subdomain", status: "approved" },
    include: { userTemplate: { include: { template: true } } },
  });

  return publish;
};
