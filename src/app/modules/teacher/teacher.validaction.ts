import { z } from "zod";

export const createTeacherValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    createdCourses: z.array(z.string()).default([]),
    followers: z.array(z.string()).default([]),
  }),
});

export const TeacherValidations = { createTeacherValidationSchema };
