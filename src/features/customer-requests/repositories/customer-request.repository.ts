// src/features/customer-requests/repositories/customer-request.repository.ts
import db from "@/lib/prisma";
import type { Prisma } from "@generated/prisma/client";
import type { RequestFilterInput } from "../schemas/customer-request.schema";
import type { PaginationInput } from "@/shared/types/pagination";
import {
  buildPaginatedResult,
  buildPaginationArgs,
} from "@/shared/types/pagination";

function buildWhere(
  filters: RequestFilterInput,
): Prisma.CustomerRequestWhereInput {
  const where: Prisma.CustomerRequestWhereInput = {};

  if (filters.status?.length) where.status = { in: filters.status };
  if (filters.assignedTo) where.assignedTo = filters.assignedTo;
  if (filters.vehicleId) where.vehicleId = filters.vehicleId;
  if (filters.email)
    where.email = { contains: filters.email, mode: "insensitive" };
  if (filters.fromDate || filters.toDate) {
    where.createdAt = {};
    if (filters.fromDate) where.createdAt.gte = filters.fromDate;
    if (filters.toDate) where.createdAt.lte = filters.toDate;
  }
  if (filters.search) {
    where.OR = [
      { firstName: { contains: filters.search, mode: "insensitive" } },
      { lastName: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
      { phone: { contains: filters.search, mode: "insensitive" } },
      { message: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  return where;
}

const requestWithRelationsInclude = {
  vehicle: {
    select: {
      id: true,
      slug: true,
      make: true,
      model: true,
      year: true,
      images: {
        where: { isPrimary: true },
        take: 1,
        select: { url: true, alt: true },
      },
    },
  },
  assignee: {
    select: { id: true, name: true, email: true },
  },
} satisfies Prisma.CustomerRequestInclude;

export const customerRequestRepository = {
  async findById(id: string) {
    return db.customerRequest.findUnique({
      where: { id },
      include: requestWithRelationsInclude,
    });
  },

  async findMany(filters: RequestFilterInput, pagination: PaginationInput) {
    const where = buildWhere(filters);
    const { skip, take } = buildPaginationArgs(
      pagination.page,
      pagination.limit,
    );

    const [items, total] = await Promise.all([
      db.customerRequest.findMany({
        where,
        include: requestWithRelationsInclude,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      db.customerRequest.count({ where }),
    ]);

    return buildPaginatedResult(
      items,
      total,
      pagination.page,
      pagination.limit,
    );
  },

  async create(data: Prisma.CustomerRequestCreateInput) {
    return db.customerRequest.create({
      data,
      include: requestWithRelationsInclude,
    });
  },

  async update(id: string, data: Prisma.CustomerRequestUpdateInput) {
    return db.customerRequest.update({
      where: { id },
      data,
      include: requestWithRelationsInclude,
    });
  },

  async countByStatus() {
    return db.customerRequest.groupBy({
      by: ["status"],
      _count: { status: true },
    });
  },
};
