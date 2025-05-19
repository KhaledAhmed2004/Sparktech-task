import { model, Schema } from "mongoose";
import { ITeacher } from "./teacher.interface";

const TeacherSchema = new Schema<ITeacher>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
      default: [],
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export const Teacher = model<ITeacher>("Teacher", TeacherSchema);
