// src/features/shared/guards/permission.guard.ts
import { hasMinRole, type UserRole } from "../types/roles";
import { ForbiddenError } from "../errors/domain-errors";
import type { SessionUser } from "./session.guard";

/**
 * Assert that actor has at least the given role.
 * Throws ForbiddenError if not.
 */
export function assertMinRole(user: SessionUser, minRole: UserRole): void {
  if (!hasMinRole(user.role, minRole)) {
    throw new ForbiddenError(
      `This action requires at least ${minRole} role. Your role: ${user.role}`,
    );
  }
}

/**
 * Assert that actor is the owner OR has at least the given role.
 * Useful for "edit own resource" patterns.
 */
export function assertOwnerOrRole(user: SessionUser, ownerId: string, minRole: UserRole): void {
  if (user.id === ownerId) return;
  assertMinRole(user, minRole);
}

/**
 * Assert actor has one of the explicitly listed roles.
 */
export function assertRoleIn(user: SessionUser, roles: UserRole[]): void {
  if (!roles.includes(user.role)) {
    throw new ForbiddenError(
      `This action requires one of: ${roles.join(", ")}. Your role: ${user.role}`,
    );
  }
}
