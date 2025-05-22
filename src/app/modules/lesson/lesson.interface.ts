import { Types } from "mongoose";

export interface ILesson {
  title: string;
  description?: string;
  courseId: Types.ObjectId;
  topics: Types.ObjectId[];
  isDeleted?: boolean;
  duration: number; // duration in minutes
}
