export interface VehicleFilters {
  countries: string[];
  types: string[];
  fuels: string[];
  transmissions: string[];
  status: string[];
  maxPrice: number;
}

export type ArrayFilterKey =
  | "countries"
  | "types"
  | "fuels"
  | "transmissions"
  | "status";
