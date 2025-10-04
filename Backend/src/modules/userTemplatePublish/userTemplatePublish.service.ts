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

export const getSubdomainPublish = async (userTemplateId: string) => {
  const publish = await prisma.userTemplatePublish.findFirst({
    where: { userTemplateId, domainType: "subdomain", status: "approved" },
    include: { userTemplate: { include: { template: true } } },
  });

  return publish;
};
