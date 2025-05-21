import mongoose, { Types } from "mongoose";
import { ICourse } from "../course/course.interface";
import { Course } from "../course/course.model";
import { Teacher } from "../teacher/teacher.model";
import { Student } from "./student.model";
import { IFeedback } from "../feedback/feedback.interface";
import { Feedback } from "../feedback/feedback.model";

const enrollCourse = async (id: string, payload: Partial<ICourse>) => {
  const result = await Course.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const followTeacher = async (studentUserId: string, teacherId: string) => {
  const student = await Student.findById({ _id: studentUserId });

  if (!student) {
    throw new Error("Student not found");
  }

  const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

  if (student.followingTeachers.includes(teacherObjectId)) {
    throw new Error("Already following this teacher");
  }

  if (student.followingTeachers.length >= 5000) {
    throw new Error("Cannot follow more than 5000 teachers");
  }

  // Add teacher to student's following list
  student.followingTeachers.push(teacherObjectId);
  await student.save();

  // Add student to teacher's followers
  await Teacher.findByIdAndUpdate(
    teacherId,
    { $addToSet: { followers: studentUserId } },
    { new: true }
  );

  return {
    data: { followedTeacherId: teacherId },
  };
};

const createFeedback = async (courseId: string, payload: IFeedback) => {
  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    throw new Error("Course not found");
  }

  const feedbackData: IFeedback = {
    ...payload,
    course: new Types.ObjectId(courseId),
  };

  const result = await Feedback.create(feedbackData);
  // 👇 Increment the totalFeedback count
  await Course.findByIdAndUpdate(courseId, { $inc: { totalFeedback: 1 } });
  return result;
};

export const StudentServices = { enrollCourse, followTeacher, createFeedback };
