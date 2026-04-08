import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { categoriesService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoriesService.createCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoriesService.getAllCategory();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "retrieved all category successfully",
    data: result,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await categoriesService.deleteCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "deleted category successfully",
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await categoriesService.updateCategory(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "update category successfully",
    data: result,
  });
});

export const categoriesController = {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
