// src/features/users/permissions/user.permissions.ts
import { UserRole } from "@/shared/types/roles";
import { ForbiddenError } from "@/shared/errors/domain-errors";
import type { SessionUser } from "@/shared/guards/session.guard";

export const UserPermissions = {
  canCreate: (user: SessionUser): void => {
    if (user.role !== UserRole.SUPER_ADMIN && user.role !== UserRole.ADMIN) {
      throw new ForbiddenError("Only admins can create users");
    }
  },

  canUpdateRole: (user: SessionUser): void => {
    if (user.role !== UserRole.SUPER_ADMIN && user.role !== UserRole.ADMIN) {
      throw new ForbiddenError("Only admins can update user roles");
    }
  },

  canDeactivate: (user: SessionUser): void => {
    if (user.role !== UserRole.SUPER_ADMIN && user.role !== UserRole.ADMIN) {
      throw new ForbiddenError("Only admins can deactivate users");
    }
  },

  canListAll: (user: SessionUser): void => {
    if (user.role !== UserRole.SUPER_ADMIN && user.role !== UserRole.ADMIN) {
      throw new ForbiddenError("Only admins can list all users");
    }
  },
} as const;
