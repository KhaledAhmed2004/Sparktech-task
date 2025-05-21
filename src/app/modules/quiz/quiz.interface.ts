import { Types } from "mongoose";

interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IQuiz {
  topicId: Types.ObjectId;
  questions: IQuestion[];
}
