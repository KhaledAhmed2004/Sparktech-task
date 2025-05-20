import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    lessons: { type: [Schema.Types.ObjectId], ref: "Lesson", default: [] },
    likes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    views: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", CourseSchema);
