import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    lessons: { type: [Schema.Types.ObjectId], ref: "Lesson", default: [] },
    likeCount: { type: Number, default: 0, index: true },
    views: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    viewedUsers: { type: [Schema.Types.ObjectId], ref: "Student" },
    totalFeedback: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", CourseSchema);
