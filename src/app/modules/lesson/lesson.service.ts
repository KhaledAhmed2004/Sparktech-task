import { Course } from "../course/course.model";
import { Lesson } from "./lesson.model";

const createLesson = async (courseId: string, payload: any) => {
  const lesson = await Lesson.create({ ...payload, courseId });

  // Add lesson to course
  await Course.findByIdAndUpdate(courseId, {
    $push: { lessons: lesson._id },
  });

  return lesson;
};

const getSingleLesson = async (lessonId: string) => {
  const lesson = await Lesson.findById(lessonId).populate("topics");
  if (!lesson) throw new Error("Lesson not found");
  return lesson;
};

const deleteLesson = async (lessonId: string) => {
  // Mark lesson as deleted
  const lesson = await Lesson.findByIdAndUpdate(
    lessonId,
    { isDeleted: true }, // just set isDeleted to true
    { new: true }
  );

  if (!lesson) throw new Error("Lesson not found or already deleted");

  // Remove lesson ID from course lessons array
  await Course.findByIdAndUpdate(lesson.courseId, {
    $pull: { lessons: lesson._id },
  });

  return lesson;
};

const getLessonsByCourseId = async (courseId: string) => {
  return Lesson.find({ courseId, isDeleted: false }).populate("topics");
};

const updateLesson = async (lessonId: string, updatedData: any) => {
  const lesson = await Lesson.findByIdAndUpdate(lessonId, updatedData, {
    new: true, // return the updated document
  }).populate("topics");

  if (!lesson) throw new Error("Lesson not found");

  return lesson;
};

export const LessonService = {
  createLesson,
  getSingleLesson,
  deleteLesson,
  getLessonsByCourseId,
  updateLesson
};
