import express from "express";
import { LikeController } from "./like.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/like/:courseId", auth("student"), LikeController.likeCourse);
router.post("/unlike/:courseId", auth("student"), LikeController.unlikeCourse);

export const LikeRoute = router;
