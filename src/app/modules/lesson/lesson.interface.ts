import { Types } from 'mongoose';

export interface ILesson {
  title: string;
  description?: string;
  courseId: Types.ObjectId;
  topics?: Types.ObjectId[];
  duration: number; // in minutes
}
