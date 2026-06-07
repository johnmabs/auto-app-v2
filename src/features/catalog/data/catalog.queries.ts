import db from "@/lib/prisma";
import { Prisma } from "@generated/prisma/client";
import {
  Country,
  FuelType,
  TransmissionType,
  VehicleStatus,
  VehicleType,
} from "@generated/prisma/enums";

const DEFAULT_PUBLIC_STATUSES = [
  VehicleStatus.AVAILABLE,
  VehicleStatus.TRANSIT,
] as const;

const SORT_FIELDS = ["createdAt", "price", "year", "mileage"] as const;
const SORT_ORDERS = ["asc", "desc"] as const;

type SortField = (typeof SORT_FIELDS)[number];
type SortOrder = (typeof SORT_ORDERS)[number];

export type CatalogVehicleQuery = {
  page: number;
  limit: number;
  countries?: string[];
  types?: string[];
  fuels?: string[];
  transmissions?: string[];
  makes?: string[];
  status?: string[];
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  featuredOnly?: boolean;
};

function pickEnumValues<T extends Record<string, string>>(
  values: string[] | undefined,
  enumObject: T,
) {
  const allowed = new Set(Object.values(enumObject));

  return (values ?? []).filter((value): value is T[keyof T] =>
    allowed.has(value),
  );
}

function parseSortField(value: string | undefined): SortField {
  return SORT_FIELDS.includes(value as SortField)
    ? (value as SortField)
    : "createdAt";
}

function parseSortOrder(value: string | undefined): SortOrder {
  return SORT_ORDERS.includes(value as SortOrder)
    ? (value as SortOrder)
    : "desc";
}

function parsePositiveNumber(value: number | undefined) {
  return value !== undefined && Number.isFinite(value) && value > 0
    ? value
    : undefined;
}

export async function getCatalogVehicles({
  page,
  limit,
  countries,
  types,
  fuels,
  transmissions,
  makes,
  status,
  maxPrice,
  minYear,
  maxYear,
  search,
  sortBy,
  sortOrder,
  featuredOnly,
}: CatalogVehicleQuery) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (safePage - 1) * safeLimit;

  const selectedStatuses = pickEnumValues(status, VehicleStatus);
  const selectedCountries = pickEnumValues(countries, Country);
  const selectedTypes = pickEnumValues(types, VehicleType);
  const selectedFuels = pickEnumValues(fuels, FuelType);
  const selectedTransmissions = pickEnumValues(
    transmissions,
    TransmissionType,
  );
  const selectedMakes = (makes ?? []).filter(Boolean);

  const where: Prisma.VehicleWhereInput = {
    deletedAt: null,
    status: {
      in:
        selectedStatuses.length > 0
          ? selectedStatuses
          : [...DEFAULT_PUBLIC_STATUSES],
    },
  };

  if (selectedCountries.length > 0) {
    where.originCountry = { in: selectedCountries };
  }

  if (selectedTypes.length > 0) {
    where.type = { in: selectedTypes };
  }

  if (selectedFuels.length > 0) {
    where.fuelType = { in: selectedFuels };
  }

  if (selectedTransmissions.length > 0) {
    where.transmission = { in: selectedTransmissions };
  }

  if (selectedMakes.length > 0) {
    where.make = { in: selectedMakes };
  }

  const safeMaxPrice = parsePositiveNumber(maxPrice);

  if (safeMaxPrice) {
    where.price = { lte: safeMaxPrice };
  }

  const safeMinYear = parsePositiveNumber(minYear);
  const safeMaxYear = parsePositiveNumber(maxYear);

  if (safeMinYear || safeMaxYear) {
    where.year = {
      ...(safeMinYear ? { gte: safeMinYear } : {}),
      ...(safeMaxYear ? { lte: safeMaxYear } : {}),
    };
  }

  if (featuredOnly) {
    where.isFeatured = true;
  }

  const trimmedSearch = search?.trim();

  if (trimmedSearch) {
    where.OR = [
      { make: { contains: trimmedSearch, mode: "insensitive" } },
      { model: { contains: trimmedSearch, mode: "insensitive" } },
      { variant: { contains: trimmedSearch, mode: "insensitive" } },
      { slug: { contains: trimmedSearch, mode: "insensitive" } },
    ];
  }

  const orderBy: Prisma.VehicleOrderByWithRelationInput = {
    [parseSortField(sortBy)]: parseSortOrder(sortOrder),
  };

  const [vehicles, total] = await Promise.all([
    db.vehicle.findMany({
      where,
      skip,
      take: safeLimit,
      orderBy,
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
    }),
    db.vehicle.count({ where }),
  ]);

  return {
    vehicles,
    total,
    totalPages: Math.max(1, Math.ceil(total / safeLimit)),
  };
}
