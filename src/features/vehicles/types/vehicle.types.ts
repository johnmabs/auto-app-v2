import type { Prisma } from "@generated/prisma/client";

export type VehicleListItem = Prisma.VehicleGetPayload<{
  include: {
    images: true;
    _count: {
      select: {
        requests: true;
      };
    };
  };
}>;

export type VehicleFilters = {
  search?: string;
  status?: string;
  page: number;
};
