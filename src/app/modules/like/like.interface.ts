import { Types } from "mongoose";

export interface ILike {
  user: Types.ObjectId;
  course: Types.ObjectId;
}
