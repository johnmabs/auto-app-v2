// src/features/users/repositories/user.repository.ts
import db from "@/lib/prisma";
import type { Prisma } from "@generated/prisma/client";
import type { UserFilterInput } from "../schemas/user.schema";
import type { PaginationInput } from "@/shared/types/pagination";
import {
  buildPaginatedResult,
  buildPaginationArgs,
} from "@/shared/types/pagination";

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  image: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
} satisfies Prisma.UserSelect;

export const userRepository = {
  async findById(id: string) {
    return db.user.findUnique({ where: { id }, select: safeUserSelect });
  },

  async findByEmail(email: string) {
    return db.user.findUnique({ where: { email }, select: safeUserSelect });
  },

  async findByIdWithPassword(id: string) {
    return db.user.findUnique({ where: { id } });
  },

  async findMany(filters: UserFilterInput, pagination: PaginationInput) {
    const where: Prisma.UserWhereInput = {};

    if (filters.role?.length) where.role = { in: filters.role };
    if (filters.isActive !== undefined) where.isActive = filters.isActive;
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const { skip, take } = buildPaginationArgs(
      pagination.page,
      pagination.limit,
    );

    const [items, total] = await Promise.all([
      db.user.findMany({
        where,
        select: safeUserSelect,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      db.user.count({ where }),
    ]);

    return buildPaginatedResult(
      items,
      total,
      pagination.page,
      pagination.limit,
    );
  },

  async create(data: Prisma.UserCreateInput) {
    return db.user.create({ data, select: safeUserSelect });
  },

  async update(id: string, data: Prisma.UserUpdateInput) {
    return db.user.update({ where: { id }, data, select: safeUserSelect });
  },
};
