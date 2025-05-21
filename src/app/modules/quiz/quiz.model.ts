import { Schema, model, Types } from "mongoose";

const quizSchema = new Schema({
  topicId: { type: Types.ObjectId, ref: "Topic", required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
});
const quizAttemptSchema = new Schema({
  quizId: { type: Types.ObjectId, ref: "Quiz", required: true },
  studentId: { type: Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      question: { type: String, required: true },
      selectedAnswer: { type: String, required: true },
    },
  ],
  score: { type: Number },
  submittedAt: { type: Date, default: Date.now },
});

export const Quiz = model("Quiz", quizSchema);
export const QuizAttempt = model("QuizAttempt", quizAttemptSchema);
