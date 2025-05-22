import express from "express";
import { FeedbackController } from "./feedback.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// Route to get all feedback for a specific course
router.get("/course/:courseId", FeedbackController.getFeedbackByCourse);

// Route to create feedback for a specific course
router.post(
  "/course/:courseId",
  auth("student"),
  FeedbackController.createFeedback
);

export const FeedbackRoutes = router;
