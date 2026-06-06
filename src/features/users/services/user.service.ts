// src/features/users/services/user.service.ts
import { userRepository } from "../repositories/user.repository";
import type {
  CreateUserInput,
  UpdateUserInput,
  UpdateUserRoleInput,
  UserFilterInput,
} from "../schemas/user.schema";
import type { PaginationInput } from "@/shared/types/pagination";
import {
  NotFoundError,
  ConflictError,
  BusinessRuleError,
} from "@/shared/errors/domain-errors";
import { hashPassword } from "@/features/auth/services/password.service";
import { mapPrismaError } from "@/shared/errors/prisma-error-mapper";
import { UserRole } from "@generated/prisma/enums";
import type { SessionUser } from "@/shared/guards/session.guard";

export const userService = {
  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError("User", id);
    return user;
  },

  async create(data: CreateUserInput) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing)
      throw new ConflictError("A user with this email already exists");

    const hashedPassword = await hashPassword(data.password);

    try {
      return await userRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      });
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  async update(id: string, data: UpdateUserInput) {
    await userService.getById(id);

    if (data.email) {
      const existing = await userRepository.findByEmail(data.email);
      if (existing && existing.id !== id) {
        throw new ConflictError("Email is already in use");
      }
    }

    try {
      return await userRepository.update(id, data);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  async updateRole(
    id: string,
    data: UpdateUserRoleInput,
    actorUser: SessionUser,
  ) {
    const user = await userService.getById(id);

    // Prevent modifying super admins unless actor is also super admin
    if (
      user.role === UserRole.SUPER_ADMIN &&
      actorUser.role !== UserRole.SUPER_ADMIN
    ) {
      throw new BusinessRuleError("Cannot modify a SUPER_ADMIN user");
    }

    // Prevent assigning SUPER_ADMIN unless actor is SUPER_ADMIN
    if (
      data.role === UserRole.SUPER_ADMIN &&
      actorUser.role !== UserRole.SUPER_ADMIN
    ) {
      throw new BusinessRuleError(
        "Only SUPER_ADMIN can assign SUPER_ADMIN role",
      );
    }

    return userRepository.update(id, { role: data.role });
  },

  async deactivate(id: string, actorId: string) {
    const user = await userService.getById(id);

    if (user.id === actorId) {
      throw new BusinessRuleError("You cannot deactivate your own account");
    }
    if (!user.isActive) {
      throw new BusinessRuleError("User is already inactive");
    }

    return userRepository.update(id, { isActive: false });
  },

  async reactivate(id: string) {
    const user = await userService.getById(id);
    if (user.isActive) throw new BusinessRuleError("User is already active");
    return userRepository.update(id, { isActive: true });
  },

  async list(filters: UserFilterInput, pagination: PaginationInput) {
    return userRepository.findMany(filters, pagination);
  },
};
