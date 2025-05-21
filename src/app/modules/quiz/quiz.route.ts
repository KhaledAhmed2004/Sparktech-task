import express from "express";
import { QuizController } from "./quiz.controller";

const router = express.Router();

// Create a new quiz under a topic
router.post("/create/:topicId", QuizController.createQuiz);

// Get all quizzes
router.get("/", QuizController.getAllQuizzes);

// Get a single quiz by ID
router.get("/:id", QuizController.getSingleQuiz);

// Delete a quiz by ID
router.delete("/:id", QuizController.deleteQuiz);
// Get quiz for student (without correct answers)
router.get("/student-view/:id", QuizController.getQuizForStudent);

// Student submits quiz answers
router.post("/submit/:quizId", QuizController.submitQuiz);
export const QuizRoutes = router;
