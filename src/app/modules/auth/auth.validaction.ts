import { z } from "zod";

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const AuthValidations = { LoginValidationSchema };
