import express from "express";
import { UserRoute } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";
import { CourseRoute } from "../modules/course/course.routes";
import { StudentRoute } from "../modules/student/student.routes";
import { LikeRoute } from "../modules/like/like.route";
import { LessonRoutes } from "../modules/lesson/lesson.route";
import { QuizRoutes } from "../modules/quiz/quiz.route";
import { TopicRoutes } from "../modules/topic/topic.route";
import { FeedbackRoutes } from "../modules/feedback/feedback.route";

const router = express.Router();

// Define paths and their route handlers
const moduleRoutes = [
  { path: "/users", route: UserRoute },
  { path: "/feedback", route: FeedbackRoutes },
  { path: "/auth", route: AuthRoute },
  { path: "/course", route: CourseRoute },
  { path: "/student", route: StudentRoute },
  { path: "/", route: LikeRoute },
  { path: "/lessons", route: LessonRoutes },
  { path: "/topics", route: TopicRoutes },
  { path: "/quizzes", route: QuizRoutes },
];

// Add each route to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; // Export the router to be used in the main app
