import { z } from "zod";

const createStudentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    enrolledCourses: z.array(z.string()).optional(),
    progress: z
      .object({
        courseId: z.string().optional(),
        completedLessons: z.array(z.string()).optional(),
      })
      .optional(),
    followingTeachers: z.array(z.string()).optional(),
  }),
});

export const StudentValidations = { createStudentValidationSchema };
