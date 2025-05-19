import { z } from "zod";

const createStudentValidationSchema = z.object({
  body: z.object({
    enrolledCourses: z.array(z.string()).default([]),
    progress: z
      .object({
        courseId: z.string().optional(),
        completedLessons: z.array(z.string()).optional(),
      })
      .optional(),
  }),
});

export const StudentValidations = { createStudentValidationSchema };
