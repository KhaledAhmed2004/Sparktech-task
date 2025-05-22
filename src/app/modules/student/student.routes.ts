import express from "express";
import { StudentControllers } from "./student.controller";
const router = express.Router();
router.patch("/enroll/:id", StudentControllers.enrollCourse);
router.post("/follow/:teacherId", StudentControllers.followTeacher);

export const StudentRoute = router;
