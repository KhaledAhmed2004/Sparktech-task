import { z } from "zod";

const LoginValidactionSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const AuthValidations = { LoginValidactionSchema };
