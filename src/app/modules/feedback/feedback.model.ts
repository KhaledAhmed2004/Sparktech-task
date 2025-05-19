import { model, Schema } from "mongoose";
import { IFeedback } from "./feedback.interface";

const FeedbackSchmea = new Schema<IFeedback>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    user: { type: Schema.Types.ObjectId },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const Feedback = model<IFeedback>("Feedback", FeedbackSchmea);
