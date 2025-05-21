import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LikeService } from "./like.service";
import httpStatus from "http-status";

const likeCourse = catchAsync(async (req, res) => {
  const userId = "682b884a22b8291f0e887e0d"; // Later replace with req.user._id from auth middleware
  const { courseId } = req.params;

  const result = await LikeService.likeCourse(userId, courseId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Course liked successfully",
    data: result,
  });
});

const unlikeCourse = catchAsync(async (req, res) => {
  const userId = "682b884a22b8291f0e887e0d"; // Later replace with req.user._id from auth middleware
  const { courseId } = req.params;

  const result = await LikeService.unlikeCourse(userId, courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course unliked successfully",
    data: result,
  });
});

export const LikeController = { likeCourse, unlikeCourse };
