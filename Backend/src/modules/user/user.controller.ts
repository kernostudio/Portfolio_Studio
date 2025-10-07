import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search } = req.query;

  const result = await userService.getAllUsers({
    page: Number(page),
    limit: Number(limit),
    search: search as string | undefined,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users fetched successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const id = req.params.id;
  const result = await userService.updateUser(payload, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "update user successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.deleteUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "deleted user successfully",
    data: result,
  });
});
export const userController = {
  getAllUsers,
  updateUser,
  deleteUser,
};
