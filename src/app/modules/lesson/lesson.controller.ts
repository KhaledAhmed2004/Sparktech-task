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



const getSingleLesson = catchAsync(async (req, res) => {
  const { lessonId } = req.params;
  const result = await LessonService.getSingleLesson(lessonId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson retrieved successfully",
    data: result,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const { lessonId } = req.params;
  const result = await LessonService.deleteLesson(lessonId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson deleted successfully",
    data: result,
  });
});

const getLessonsByCourseId = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await LessonService.getLessonsByCourseId(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lessons for the course retrieved successfully",
    data: result,
  });
});

const updateLesson = catchAsync(async (req, res) => {
  const { lessonId } = req.params;
  const updatedData = req.body;

  const result = await LessonService.updateLesson(lessonId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson updated successfully",
    data: result,
  });
});


export const LessonController = {
  createLesson,
  getSingleLesson,
  deleteLesson,
  getLessonsByCourseId,
  updateLesson
};
