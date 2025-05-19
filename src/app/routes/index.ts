import express from "express";
import { UserRoute } from "../modules/user/user.routes";

const router = express.Router();

// Define paths and their route handlers
const moduleRoutes = [{ path: "/auth", route: UserRoute }];

// Add each route to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router; // Export the router to be used in the main app
