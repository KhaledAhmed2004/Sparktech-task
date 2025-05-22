import { Quiz, QuizAttempt } from "./quiz.model";
import { Topic } from "../topic/topic.model";
import { IQuiz } from "./quiz.interface";

const createQuiz = async (topicId: string, payload: any) => {
  // Since payload is a single question object, wrap it in an array
  const questionsArray = [payload];

  const quiz = await Quiz.create({ questions: questionsArray, topicId });

  await Topic.findByIdAndUpdate(topicId, {
    $push: { quizzes: quiz._id },
  });

  return quiz;
};



const getSingleQuiz = async (id: string) => {
  const quiz = await Quiz.findById(id);
  if (!quiz) throw new Error("Quiz not found");
  return quiz;
};

const deleteQuiz = async (id: string) => {
  const deleted = await Quiz.findByIdAndDelete(id);
  if (!deleted) throw new Error("Quiz not found or already deleted");
  return deleted;
};
const getQuizForStudent = async (id: string) => {
  const quiz = await Quiz.findById(id);
  if (!quiz) throw new Error("Quiz not found");

  // Remove correctAnswer before sending to student
  const questionsForStudent = quiz.questions.map((q) => ({
    question: q.question,
    options: q.options,
  }));

  return {
    _id: quiz._id,
    topicId: quiz.topicId,
    questions: questionsForStudent,
  };
};
const submitQuizAttempt = async (
  quizId: string,
  studentId: string,
  answers: { question: string; selectedAnswer: string }[]
) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  let score = 0;

  quiz.questions.forEach((q) => {
    const studentAnswer = answers.find((a) => a.question === q.question);
    if (studentAnswer && studentAnswer.selectedAnswer === q.correctAnswer) {
      score++;
    }
  });

  const attempt = await QuizAttempt.create({
    quizId,
    studentId,
    answers,
    score,
  });

  return { score, total: quiz.questions.length };
};

const getQuizzesByTopic = async (topicId: string) => {
  return await Quiz.find({ topicId });
};
const updateQuiz = async (id: string, payload: Partial<IQuiz>) => {
  const updatedQuiz = await Quiz.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedQuiz) {
    throw new Error("Quiz not found or update failed");
  }

  return updatedQuiz;
};


export const QuizService = {
  createQuiz,
  getSingleQuiz,
  deleteQuiz,
  getQuizForStudent,
  submitQuizAttempt,
  getQuizzesByTopic,
  updateQuiz,
};
