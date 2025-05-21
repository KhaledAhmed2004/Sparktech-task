import { Types } from "mongoose";

export interface ITopic {
  title: string;
  content?: string;
  lessonId: Types.ObjectId;
  quiz?: Types.ObjectId;
}
