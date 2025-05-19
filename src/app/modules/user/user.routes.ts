import { UserControllers } from "./user.controller";
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "../student/student.validation";
import { TeacherValidations } from "../teacher/teacher.validaction";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-teacher",
  validateRequest(TeacherValidations.createTeacherValidationSchema),
  UserControllers.createTeacher
);

export const UserRoute = router;
