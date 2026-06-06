// src/features/shared/guards/session.guard.ts
import { auth } from "@/auth";
import { ForbiddenError, UnauthorizedError } from "../errors/domain-errors";
import { hasMinRole, UserRole } from "../types/roles";

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
};

export async function requireAuth(): Promise<SessionUser> {
  const session = await auth();
  if (!session?.user?.id) throw new UnauthorizedError();
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: (session.user.role as UserRole) ?? UserRole.ADMIN,
  };
}

export async function requireRole(minRole: UserRole): Promise<SessionUser> {
  const user = await requireAuth();
  if (!hasMinRole(user.role, minRole)) {
    throw new ForbiddenError(`This action requires at least ${minRole} role`);
  }
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  return requireRole(UserRole.ADMIN);
}

export async function requireSuperAdmin(): Promise<SessionUser> {
  return requireRole(UserRole.SUPER_ADMIN);
}

export async function requireEditor(): Promise<SessionUser> {
  return requireRole(UserRole.ADMIN);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    return await requireAuth();
  } catch {
    return null;
  }
}
