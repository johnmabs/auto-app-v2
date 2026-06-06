import { Prisma } from "@generated/prisma/client";
import type { VehicleFilters } from "../types/vehicle-form.types";

export function buildVehicleFilters({ search, status }: VehicleFilters) {
  const where: Prisma.VehicleWhereInput = {
    deletedAt: null,
  };

  if (status && status !== "all") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      {
        make: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        model: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        slug: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  return where;
}
