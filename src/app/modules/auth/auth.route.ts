import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validaction";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

// user login
router.post(
  "/login",
  validateRequest(AuthValidations.LoginValidationSchema),
  AuthControllers.loginuser
);

export const AuthRoute = router;
