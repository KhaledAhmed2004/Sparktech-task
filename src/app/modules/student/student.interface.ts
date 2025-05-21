import { Types } from "mongoose";

export interface IStudent {
  userId: Types.ObjectId;
  enrolledCourses: Types.ObjectId[];
  progress: {
    courseId: Types.ObjectId;
    completedLessons: Types.ObjectId[];
  };
  followingTeachers: Types.ObjectId[];
}
