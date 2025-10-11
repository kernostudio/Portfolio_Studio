import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { userTemplateService } from "./userTemplate.Service";

const createUserTemplate = catchAsync(async (req: Request, res: Response) => {
  const id = req.user.id;
  const payload = req.body;
  const result = await userTemplateService.createUserTemplate(payload, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "created user template successfully",
    data: result,
  });
});
const getSingleUserTemplate = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const templateId = req.params.templateId;
    const result = await userTemplateService.getSingleUserTemplate(
      templateId,
      userId
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "get template successfully",
      data: result,
    });
  }
);
const deleteUserTemplate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const templateId = req.params.templateId;
  const result = await userTemplateService.deleteUserTemplate(
    templateId,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "deleted template successfully",
    data: result,
  });
});
const updateUserTemplate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const templateId = req.params.templateId;
  const { filledValues } = req.body;

  const result = await userTemplateService.updateUserTemplate(
    templateId,
    userId,
    { filledValues }
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Template updated successfully",
    data: result,
  });
});

const getAllUserTemplates = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await userTemplateService.getAllUserTemplates(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "get all templates successfully",
    data: result,
  });
});

export const userTemplateController = {
  createUserTemplate,
  getSingleUserTemplate,
  getAllUserTemplates,
  deleteUserTemplate,
  updateUserTemplate,
};
