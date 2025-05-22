import { Types } from "mongoose";

export interface ICourse {
  title: string;
  description: string;
  teacher: Types.ObjectId;
  lessons: Types.ObjectId[];
  likeCount: number;
  views: number;
  isDeleted?: boolean;
  viewedUsers: Types.ObjectId[];
  totalFeedback: number;
}
