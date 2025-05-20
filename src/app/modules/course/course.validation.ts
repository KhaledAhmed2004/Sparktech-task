import { z } from "zod";

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    teacher: z.string(),
    lessons: z.array(z.string()).default([]),
    likes: z.array(z.string()).default([]),
    views: z.number().int().nonnegative().default(0),
  }),
});

export const updateCourseValidationSchema = z.object({
  body: createCourseValidationSchema.partial(),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
