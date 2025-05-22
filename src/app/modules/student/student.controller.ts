import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";
import httpStatus from "http-status";

const enrollCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.enrollCourse(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course enrolled successfully",
    data: result,
  });
});

const followTeacher = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const { teacherId } = req.params;

  const result = await StudentServices.followTeacher(userId, teacherId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully followed the teacher",
    data: result.data,
  });
});

const createFeedback = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await StudentServices.createFeedback(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback created successfully",
    data: result,
  });
});

export const StudentControllers = {
  enrollCourse,
  followTeacher,
  createFeedback,
};
