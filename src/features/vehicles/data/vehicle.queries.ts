import db from "@/lib/prisma";
import { VehicleStatus, type VehicleType } from "@generated/prisma/enums";
import { buildVehicleFilters } from "../lib/vehicle-filters";
import type { GetVehiclesParams } from "../types/vehicle-form.types";

export async function getVehicles({
  search,
  status,
  page,
  limit,
}: GetVehiclesParams) {
  const skip = (page - 1) * limit;

  const where = buildVehicleFilters({
    search,
    status,
  });

  const [items, total] = await Promise.all([
    db.vehicle.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        _count: {
          select: {
            requests: true,
          },
        },
      },
    }),
    db.vehicle.count({
      where,
    }),
  ]);

  return {
    items,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getFeaturedVehicles() {
  return db.vehicle.findMany({
    where: {
      deletedAt: null,
      status: VehicleStatus.AVAILABLE,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      _count: {
        select: {
          requests: true,
        },
      },
    },
  });
}

export async function getRecentVehicles(limit: number = 6) {
  return db.vehicle.findMany({
    where: {
      deletedAt: null,
      status: {
        in: [VehicleStatus.AVAILABLE, VehicleStatus.TRANSIT],
      },
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      _count: {
        select: {
          requests: true,
        },
      },
    },
  });
}

export async function getVehicleBySlug(slug: string) {
  return db.vehicle.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
      _count: {
        select: {
          requests: true,
        },
      },
    },
  });
}

export async function getSimilarVehicles(
  vehicleId: string,
  type: VehicleType,
  limit: number = 3,
) {
  return db.vehicle.findMany({
    where: {
      id: {
        not: vehicleId,
      },
      deletedAt: null,
      type,
      status: {
        in: [VehicleStatus.AVAILABLE, VehicleStatus.TRANSIT],
      },
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
      _count: {
        select: {
          requests: true,
        },
      },
    },
  });
}

export async function getVehicleForEdit(id: string) {
  return db.vehicle.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
}

export async function getVehicleStats() {
  const [total, grouped] = await Promise.all([
    db.vehicle.count({
      where: {
        deletedAt: null,
      },
    }),
    db.vehicle.groupBy({
      by: ["status"],
      where: {
        deletedAt: null,
      },
      _count: {
        _all: true,
      },
    }),
  ]);

  const byStatus = Object.fromEntries(
    Object.values(VehicleStatus).map((status) => [status, 0]),
  ) as Record<VehicleStatus, number>;

  for (const item of grouped) {
    byStatus[item.status] = item._count._all;
  }

  return {
    total,
    byStatus,
  };
}
