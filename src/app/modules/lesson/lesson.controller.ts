import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { LessonService } from "./lesson.service";

const createLesson = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await LessonService.createLesson(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Lesson created successfully",
    data: result,
  });
});

const getAllLessons = catchAsync(async (req, res) => {
  const result = await LessonService.getAllLessons();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lessons retrieved successfully",
    data: result,
  });
});

const getSingleLesson = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LessonService.getSingleLesson(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson retrieved successfully",
    data: result,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LessonService.deleteLesson(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson deleted successfully",
    data: result,
  });
});

export const LessonController = {
  createLesson,
  getAllLessons,
  getSingleLesson,
  deleteLesson,
};
