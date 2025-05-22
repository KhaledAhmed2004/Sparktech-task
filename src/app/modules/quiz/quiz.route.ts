import express from "express";
import { QuizController } from "./quiz.controller";

const router = express.Router();

// Create a new quiz under a topic
router.post("/create/:topicId", QuizController.createQuiz);

// Get all quizzes for a specific topic (lesson)
router.get("/by-topic/:topicId", QuizController.getQuizzesByTopic);

// Get a single quiz by ID
router.get("/:id", QuizController.getSingleQuiz);

// Delete a quiz by ID
router.delete("/:id", QuizController.deleteQuiz);

// Get quiz for student (without correct answers)
router.get("/student-view/:id", QuizController.getQuizForStudent);

// Student submits quiz answers
router.post("/submit/:quizId", QuizController.submitQuiz);

// Update a quiz by ID
router.patch("/:id", QuizController.updateQuiz);

export const QuizRoutes = router;
