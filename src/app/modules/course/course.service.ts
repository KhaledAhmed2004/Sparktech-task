import { Types } from "mongoose";
import { Student } from "../student/student.model";
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

const enrollCourse = async (id: string, studentId: string) => {
  // 1. Ensure both IDs are valid ObjectId instances
  const courseObjectId = new Types.ObjectId(id);
  const studentObjectId = new Types.ObjectId(studentId);

  // 2. Atomically add the course to the student's enrolledCourses array,
  //    creating the student document if it doesn't exist yet.
  const updatedStudent = await Student.findOneAndUpdate(
    { userId: studentObjectId }, // filter by the userId field
    { $addToSet: { enrolledCourses: courseObjectId } },
    {
      new: true, // return the updated doc
      upsert: true, // create if not found
      setDefaultsOnInsert: true, // apply schema defaults on insert
    }
  );
  return updatedStudent;
};
const getSingleCourseFromDB = async (id: string, userId: string) => {
  const course = await Course.findById(id);

  if (!course) return null;

  const hasUserViewed = course.viewedUsers?.some(
    (viewerId) => viewerId.toString() === userId
  );

  if (!hasUserViewed) {
    course.views += 1;
    course.viewedUsers.push(new Types.ObjectId(userId));
    await course.save();
  }

  return course;
};


export const CourseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  enrollCourse,
  getSingleCourseFromDB,
};
