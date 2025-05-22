import { Types } from "mongoose";
import { Course } from "../course/course.model";
import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

// Get all feedbacks for a specific course
const getFeedbackByCourse = async (courseId: string) => {
  const feedbacks = await Feedback.find({ course: courseId }).populate(
    "user",
    "name email"
  );
  return feedbacks;
};

// Create feedback for a course
const createFeedback = async (courseId: string, payload: IFeedback) => {
  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    throw new Error("Course not found");
  }

  const feedbackData: IFeedback = {
    ...payload,
    course: new Types.ObjectId(courseId),
  };

  const result = await Feedback.create(feedbackData);
  //   Increment the totalFeedback count
  await Course.findByIdAndUpdate(courseId, { $inc: { totalFeedback: 1 } });

  return result;
};

// Exporting the service object
export const FeedbackServices = {
  getFeedbackByCourse,
  createFeedback,
};
