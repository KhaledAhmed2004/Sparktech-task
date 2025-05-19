import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validaction";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.LoginValidactionSchema),
  AuthControllers.loginuser
);

export const AuthRoute = router;
