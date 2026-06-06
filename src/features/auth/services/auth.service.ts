// src/features/auth/services/auth.service.ts
import { NotFoundError } from "@/shared/errors/domain-errors";
import { mapPrismaError } from "@/shared/errors/prisma-error-mapper";
import { authRepository } from "../repositories/auth.repository";
import { hashPassword, verifyPassword } from "./password.service";

export const authService = {
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await authRepository.findUserPasswordById(userId);
    if (!user) throw new NotFoundError("User", userId);

    const isValid = await verifyPassword(currentPassword, user.password);
    if (!isValid) return false;

    const newHash = await hashPassword(newPassword);

    try {
      await authRepository.updateUserPassword(userId, newHash);
      return true;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },
};
