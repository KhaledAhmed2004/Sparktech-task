import { Types } from "mongoose";

export interface IFeedback {
  course: Types.ObjectId;
  user: Types.ObjectId;
  comment: string;
}
