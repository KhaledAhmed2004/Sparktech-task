import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import httpStatus from "http-status";
import { Request, Response } from "express";

// Create a new course
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const teacherId = req.user?.userId;

  const result = await CourseServices.createCourseIntoDB(req.body, teacherId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

// Get all courses with filters, search, pagination, etc.
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCoursesFromDB(req?.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses retrieved successfully",
    data: result.data,
  });
});

// Update an existing course
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

// Soft-delete a course
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const result = await CourseServices.deleteCourseFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

// Enroll a student into a course
const enrollCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = req.user?.userId;
  const result = await CourseServices.enrollCourse(courseId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course enrolled successfully",
    data: result,
  });
});

// Get single course details
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = req.user?.userId;
  const result = await CourseServices.getSingleCourseFromDB(courseId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieved successfully",
    data: result,
  });
});
const getCoursePerformance = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  // Get the course by id but only return the needed fields for performance
  const course = await CourseServices.getCoursePerformanceFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course performance fetched successfully",
    data: course,
  });
});
// Get all students enrolled in a course
const getEnrolledStudents = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const students = await CourseServices.getEnrolledStudentsFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled students retrieved successfully",
    data: students,
  });
});

export const CourseControllers = {
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getSingleCourse,
  getAllCourses,
  getCoursePerformance,
  getEnrolledStudents,
};
