// src/features/users/schemas/user.schema.ts
import { z } from "zod";
import { UserRole } from "@generated/prisma/enums";

export const userRoleEnum = z.enum(UserRole);

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email: z.email("Invalid email address").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  role: userRoleEnum.default(UserRole.ADMIN),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  email: z.email().toLowerCase().trim().optional(),
  image: z.url().optional().nullable(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const updateUserRoleSchema = z.object({
  role: userRoleEnum,
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;

export const userFilterSchema = z.object({
  role: z.array(userRoleEnum).optional(),
  isActive: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    }, z.boolean())
    .optional(),
  search: z.string().trim().optional(),
});

export type UserFilterInput = z.infer<typeof userFilterSchema>;
