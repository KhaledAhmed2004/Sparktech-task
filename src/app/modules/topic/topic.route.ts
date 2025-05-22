import express from "express";
import { TopicController } from "./topic.controller";

const router = express.Router();

// Create a new topic under a lesson
router.post("/create/:lessonId", TopicController.createTopic);


// Get all topics for a specific lesson
router.get("/lesson/:lessonId", TopicController.getTopicsByLesson);
// Get a single topic by ID
router.get("/:id", TopicController.getSingleTopic);

// Delete a topic by ID
router.delete("/:id", TopicController.deleteTopic);
// Update a topic by ID
router.patch("/:id", TopicController.updateTopic);

export const TopicRoutes = router;
