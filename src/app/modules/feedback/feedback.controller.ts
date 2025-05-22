import { Request, Response } from "express";
import { FeedbackServices } from "./feedback.service"; // Fixed: should be FeedbackServices as exported
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";

// Wrap async functions with catchAsync and export them as properties in an object
const getFeedbackByCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const feedbacks = await FeedbackServices.getFeedbackByCourse(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback retrieved successfully",
    data: feedbacks,
  });
});

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const result = await FeedbackServices.createFeedback(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback created successfully",
    data: result,
  });
});

export const FeedbackController = {
  getFeedbackByCourse,
  createFeedback,
};
