import { z } from "zod";

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    lessons: z.array(z.string()).default([]),
    likes: z.array(z.string()).default([]),
    likeCount: z.number().int().nonnegative().default(0),
    viewedUsers: z.array(z.string()).default([]),
    views: z.number().int().nonnegative().default(0),
    totalFeedback: z.number().int().nonnegative().default(0),
  }),
});

export const updateCourseValidationSchema = z.object({
  body: createCourseValidationSchema.partial(),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
