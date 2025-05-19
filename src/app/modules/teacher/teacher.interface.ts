import { Types } from "mongoose";

export interface ITeacher {
  userId: Types.ObjectId;
  createdCourses: Types.ObjectId[];
  followers: Types.ObjectId[];
}
