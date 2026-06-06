// src/features/auth/schemas/sign-in.schema.ts
import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;
