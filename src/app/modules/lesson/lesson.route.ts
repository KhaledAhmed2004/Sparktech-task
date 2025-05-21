import express from "express";
import { LessonController } from "./lesson.controller";

const router = express.Router();

// Create a new lesson for a course
router.post("/create/:courseId", LessonController.createLesson);

// Get all lessons
router.get("/", LessonController.getAllLessons);

// Get a single lesson by ID
router.get("/:id", LessonController.getSingleLesson);

// Delete a lesson by ID
router.delete("/:id", LessonController.deleteLesson);

export const LessonRoutes = router;
