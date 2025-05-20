import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const result = await Course.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
