import express from "express";
import { UserRoute } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";
import { CourseRoute } from "../modules/course/course.routes";

const router = express.Router();

// Define paths and their route handlers
const moduleRoutes = [
  { path: "/users", route: UserRoute },
  { path: "/auth", route: AuthRoute },
  { path: "/course", route: CourseRoute },
];

// Add each route to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; // Export the router to be used in the main app
