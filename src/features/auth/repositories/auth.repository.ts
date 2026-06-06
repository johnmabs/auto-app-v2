// src/features/auth/repositories/auth.repository.ts
import db from "@/lib/prisma";

export const authRepository = {
  async findUserPasswordById(id: string) {
    return db.user.findUnique({
      where: { id },
      select: { password: true },
    });
  },

  async updateUserPassword(id: string, password: string) {
    return db.user.update({
      where: { id },
      data: { password, updatedAt: new Date() },
      select: { id: true },
    });
  },
};
