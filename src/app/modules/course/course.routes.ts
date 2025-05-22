import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create a new course
router.post(
  "/create",
  auth("teacher"),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

// Get all courses
router.get("/", auth("student", "teacher"), CourseControllers.getAllCourses);

// Update a course
router.patch(
  "/:courseId",
  auth("teacher"),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

// Get single course details
router.get(
  "/:courseId",
  auth("student", "teacher"),
  CourseControllers.getSingleCourse
);

// Get all enrolled students for a course
router.get(
  "/enrolled-students/:courseId",
  auth("teacher"), 
  CourseControllers.getEnrolledStudents
);

// Enroll a student in a course
router.post(
  "/enroll/:courseId",
  auth("student"),
  CourseControllers.enrollCourse
);

// Soft-delete a course
router.delete("/:courseId", auth("teacher"), CourseControllers.deleteCourse);
// Get performance stats of a course (likeCount, views, totalFeedback)
router.get(
  "/performance/:courseId",
  auth("student", "teacher"),
  CourseControllers.getCoursePerformance
);

export const CourseRoute = router;
