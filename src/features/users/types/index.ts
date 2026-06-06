// src/features/users/types/index.ts
import type { UserRole } from "@generated/prisma/enums";

/**
 * Public-safe user shape (no password, no tokens).
 * Returned by repository and actions.
 */
export type SafeUser = {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  isActive: boolean;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
};

export type UserSummary = Pick<
  SafeUser,
  "id" | "name" | "email" | "role" | "isActive"
>;
