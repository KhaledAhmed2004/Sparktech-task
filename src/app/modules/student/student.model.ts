import { model, Schema } from "mongoose";
import { IStudent } from "./student.interface";
const StudentSchema = new Schema<IStudent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    enrolledCourses: {
      type: [Schema.Types.ObjectId],
      ref: "Course",
      required: true,
      default: [],
    },
    progress: {
      courseId: { type: Schema.Types.ObjectId, ref: "Course" },
      completedLessons: {
        type: [Schema.Types.ObjectId],
        ref: "Lesson",
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Student = model<IStudent>("Student", StudentSchema);
