import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { QuizService } from "./quiz.service";
import httpStatus from "http-status";

const createQuiz = catchAsync(async (req, res) => {
  const { topicId } = req.params;
  const result = await QuizService.createQuiz(topicId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Quiz created successfully",
    data: result,
  });
});



const getSingleQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuizService.getSingleQuiz(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz retrieved successfully",
    data: result,
  });
});

const deleteQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuizService.deleteQuiz(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz deleted successfully",
    data: result,
  });
});
const getQuizForStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const quiz = await QuizService.getQuizForStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz for student retrieved successfully",
    data: quiz,
  });
});
const submitQuiz = catchAsync(async (req, res) => {
  const { quizId } = req.params;
  const studentId = req.user._id; // Get from auth middleware
  const answers = req.body.answers;

  const result = await QuizService.submitQuizAttempt(quizId, studentId, answers);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz submitted successfully",
    data: result,
  });
});

const getQuizzesByTopic = catchAsync(async (req, res) => {
  const { topicId } = req.params;
  const result = await QuizService.getQuizzesByTopic(topicId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quizzes for topic retrieved successfully",
    data: result,
  });
});

const updateQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await QuizService.updateQuiz(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Quiz updated successfully",
    data: result,
  });
});


export const QuizController = {
  createQuiz,
  getSingleQuiz,
  deleteQuiz,
  getQuizForStudent,submitQuiz
  ,getQuizzesByTopic,
  updateQuiz
};
