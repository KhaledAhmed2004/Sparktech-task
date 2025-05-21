import { Course } from "../course/course.model";
import { Lesson } from "./lesson.model";

const createLesson = async (courseId: string, payload: any) => {
  // First, create the lesson and store it in a variable
  const lesson = await Lesson.create({ ...payload, courseId });

  // Then, push the lesson ID into the course's lessons array
  await Course.findByIdAndUpdate(courseId, {
    $push: { lessons: lesson._id },
  });

  // Return the created lesson
  return lesson;
};

const getAllLessons = async () => {
  return await Lesson.find().populate("topics");
};

const getSingleLesson = async (id: string) => {
  const lesson = await Lesson.findById(id).populate("topics");
  if (!lesson) throw new Error("Lesson not found");
  return lesson;
};

const deleteLesson = async (id: string) => {
  const deleted = await Lesson.findByIdAndDelete(id);
  if (!deleted) throw new Error("Lesson not found or already deleted");
  return deleted;
};

export const LessonService = {
  createLesson,
  getAllLessons,
  getSingleLesson,
  deleteLesson,
};
