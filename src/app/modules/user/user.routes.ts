import { UserControllers } from "./user.controller";
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TeacherValidations } from "../teacher/teacher.validaction";
import { StudentValidations } from "../student/student.validation";

const router = express.Router();

// Route to create a new student
router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

// Route to create a new teacher
router.post(
  "/create-teacher",
  validateRequest(TeacherValidations.createTeacherValidationSchema),
  UserControllers.createTeacher
);

export const UserRoute = router;
