import {
  FuelType,
  TransmissionType,
  VehicleStatus,
  VehicleType,
} from "@generated/prisma/enums";

import type { VehicleFilters } from "../types/vehicle-filters.types";

export const PRICE_MIN = 0;
export const PRICE_MAX = 250_000_000;

export const VEHICLE_FILTER_PARAM_NAMES = [
  "country",
  "type",
  "fuel",
  "transmission",
  "status",
  "maxPrice",
] as const;

type FilterSearchParams = {
  get(name: string): string | null;
  getAll(name: string): string[];
};

export const VEHICLE_TYPE_FILTER_OPTIONS = [
  { value: VehicleType.SUV, label: "SUV" },
  { value: VehicleType.SEDAN, label: "Berline" },
  { value: VehicleType.COUPE, label: "Coupé" },
  { value: VehicleType.PICKUP, label: "Pickup" },
  { value: VehicleType.MINIVAN, label: "Monospace" },
  { value: VehicleType.CONVERTIBLE, label: "Cabriolet" },
  { value: VehicleType.WAGON, label: "Break" },
  { value: VehicleType.HATCHBACK, label: "Compacte" },
  { value: VehicleType.LUXURY, label: "Luxe" },
  { value: VehicleType.SPORT, label: "Sport" },
] as const;

export const FUEL_TYPE_FILTER_OPTIONS = [
  { value: FuelType.GASOLINE, label: "Essence" },
  { value: FuelType.DIESEL, label: "Diesel" },
  { value: FuelType.ELECTRIC, label: "Électrique" },
  { value: FuelType.HYBRID, label: "Hybride" },
  { value: FuelType.PLUGIN_HYBRID, label: "Hybride rechargeable" },
  { value: FuelType.HYDROGEN, label: "Hydrogène" },
] as const;

export const TRANSMISSION_FILTER_OPTIONS = [
  { value: TransmissionType.AUTOMATIC, label: "Automatique" },
  { value: TransmissionType.MANUAL, label: "Manuelle" },
  { value: TransmissionType.CVT, label: "CVT" },
  { value: TransmissionType.DCT, label: "DCT" },
  { value: TransmissionType.PDK, label: "PDK" },
] as const;

export const VEHICLE_STATUS_FILTER_OPTIONS = [
  { value: VehicleStatus.AVAILABLE, label: "Disponible" },
  { value: VehicleStatus.TRANSIT, label: "En transit" },
  { value: VehicleStatus.RESERVED, label: "Réservé" },
] as const;

export function parseVehicleFilters(
  searchParams: FilterSearchParams,
): VehicleFilters {
  return {
    countries: searchParams.getAll("country"),
    types: searchParams.getAll("type"),
    fuels: searchParams.getAll("fuel"),
    transmissions: searchParams.getAll("transmission"),
    status: searchParams.getAll("status"),
    maxPrice: parseMaxPrice(searchParams.get("maxPrice")),
  };
}

export function getVehicleFilterCount(filters: VehicleFilters) {
  return (
    filters.countries.length +
    filters.types.length +
    filters.fuels.length +
    filters.transmissions.length +
    filters.status.length +
    (filters.maxPrice < PRICE_MAX ? 1 : 0)
  );
}

export function createEmptyVehicleFilters(): VehicleFilters {
  return {
    countries: [],
    types: [],
    fuels: [],
    transmissions: [],
    status: [],
    maxPrice: PRICE_MAX,
  };
}

export function clampMaxPrice(value: number) {
  if (!Number.isFinite(value)) {
    return PRICE_MAX;
  }

  return Math.min(Math.max(value, PRICE_MIN), PRICE_MAX);
}

function parseMaxPrice(value: string | null) {
  if (!value) {
    return PRICE_MAX;
  }

  return clampMaxPrice(Number(value));
}
