import { Types } from "mongoose";

export interface ICourse {
  title: string;
  description?: string;
  teacher: Types.ObjectId;
  lessons: Types.ObjectId[];
  likes: Types.ObjectId[];
  views: number;
  isDeleted?: boolean;
}
