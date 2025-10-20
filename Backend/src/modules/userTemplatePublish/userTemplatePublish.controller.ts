import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import * as service from "./userTemplatePublish.service";

export const createPublishRequest = catchAsync(
  async (req: Request, res: Response) => {
    const userTemplateId = req.body.userTemplateId;
    const { domainType, domain, note } = req.body;

    const result = await service.createPublishRequest(userTemplateId, {
      domainType,
      domain,
      note,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Publish request submitted",
      data: result,
    });
  }
);
export const getUserAllPublishRequests = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id; // from authenticate middleware

    const result = await service.getUserAllPublishRequests(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Fetched all publish requests for user successfully",
      data: result,
    });
  }
);

export const getallPublishRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await service.getallPublishRequest();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "get all publish request successfully",
      data: result,
    });
  }
);

export const updatePublishStatus = catchAsync(
  async (req: Request, res: Response) => {
    const publishId = req.params.id;
    const { status, note } = req.body;

    const result = await service.updatePublishStatus(publishId, status, note);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Publish status updated",
      data: result,
    });
  }
);
export const templatePublishController = {
  getUserAllPublishRequests,
  createPublishRequest,
  updatePublishStatus,
  getallPublishRequest,
};
