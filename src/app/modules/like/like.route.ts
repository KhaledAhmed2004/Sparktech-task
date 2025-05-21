import express from "express";
import { LikeController } from "./like.controller";

const router = express.Router();

router.post("/like/:courseId", LikeController.likeCourse);
router.post("/unlike/:courseId", LikeController.unlikeCourse);

export const LikeRoute = router;
