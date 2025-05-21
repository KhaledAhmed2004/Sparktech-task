import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
const rotuer = express.Router();

rotuer.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);
rotuer.patch(
  "/:id",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);
rotuer.get("/:id", CourseControllers.getSingleCourse);

rotuer.patch("/enroll/:id", CourseControllers.enrollCourse);

rotuer.delete("/:id", CourseControllers.deleteCourse);

export const CourseRoute = rotuer;
