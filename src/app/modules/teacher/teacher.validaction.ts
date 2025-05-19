import { z } from "zod";

const createTeacherValidationSchema = z.object({
  body: z.object({
    createdCourses: z.array(z.string()).default([]),
    followers: z.array(z.string()).default([]),
  }),
});

export const TeacherValidations = { createTeacherValidationSchema };
