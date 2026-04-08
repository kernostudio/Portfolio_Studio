import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { adminTemplateService } from "./template.service";
import AppError from "../../errorHelpers/errorHelper";
const createTemplate = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body };

  // Parse placeholders if it's a string
  if (typeof payload.placeholders === "string") {
    try {
      payload.placeholders = JSON.parse(payload.placeholders);
    } catch {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid JSON for placeholders"
      );
    }
  }

  const templateImgUrl = req.file ? (req.file as any).path : undefined;
  const templatePayload = {
    ...payload,
    templateImgUrl,
  };

  const result = await adminTemplateService.createTemplate(templatePayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Template created successfully",
    data: result,
  });
});

const updateTemplate = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.id;
  const result = await adminTemplateService.updateTemplate(payload, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Template updated successfully",
    data: result,
  });
});
const deleteTemplate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminTemplateService.deleteTemplate(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Template deleted successfully",
    data: result,
  });
});
const getSingleTemplate = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminTemplateService.getSingleTemplate(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `get template ${result?.title}  successfully`,
    data: result,
  });
});
const getAllTemplate = catchAsync(async (req: Request, res: Response) => {
  const query = {
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
    search: req.query.search,
    category: req.query.category as string | undefined,
  };
  const result = await adminTemplateService.getAllTemplate(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `get  templates  successfully`,
    data: result,
  });
});
export const adminTemplateController = {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getSingleTemplate,
  getAllTemplate,
};
