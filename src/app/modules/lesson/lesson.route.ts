import express from "express";
import { LessonController } from "./lesson.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Create a new lesson for a course
router.post(
  "/create/:courseId",
  auth("teacher"),
  LessonController.createLesson
);

// Get all lessons for a specific course
router.get("/course/:courseId", LessonController.getLessonsByCourseId);

// Get a single
router.get("/:lessonId", LessonController.getSingleLesson);

// Delete
router.delete("/:lessonId", auth("teacher"), LessonController.deleteLesson);

// Update
router.put("/:lessonId", auth("teacher"), LessonController.updateLesson);

export const LessonRoutes = router;
