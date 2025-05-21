import express from "express";
import { TopicController } from "./topic.controller";

const router = express.Router();

// Create a new topic under a lesson
router.post("/create/:lessonId", TopicController.createTopic);

// Get all topics
router.get("/", TopicController.getAllTopics);

// Get a single topic by ID
router.get("/:id", TopicController.getSingleTopic);

// Delete a topic by ID
router.delete("/:id", TopicController.deleteTopic);

export const TopicRoutes = router;
