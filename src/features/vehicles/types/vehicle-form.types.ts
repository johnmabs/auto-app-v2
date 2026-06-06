import type { Country, FuelType, TransmissionType, VehicleStatus, VehicleType } from "@generated/prisma/enums";
import type { getVehicles } from "../data/vehicle.queries";

export type UploadedVehicleImage = {
  url: string;
  publicId: string;
  alt?: string;
  width?: number;
  height?: number;
  order?: number;
  isPrimary?: boolean;
};

export type VehicleFormState = {
  make: string;
  model: string;
  variant: string;
  year: number;
  type: VehicleType;
  color: string;
  interiorColor: string;
  engine: string;
  power: string;
  torque: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  mileage: string;
  doors: string;
  seats: string;
  acceleration: string;
  topSpeed: string;
  consumption: string;
  autonomy: string;
  price: string;
  comparePrice: string;
  status: VehicleStatus;
  stock: string;
  priceNegotiable: boolean;
  originCountry: Country;
  customsCleared: boolean;
  chassisNumber: string;
  description: string;
  isFeatured: boolean;
  isPopular: boolean;
  features: string[];
  images: UploadedVehicleImage[];
  metaTitle: string;
  metaDescription: string;
};

export type StringVehicleFormField = {
  [K in keyof VehicleFormState]: VehicleFormState[K] extends string ? K : never;
}[keyof VehicleFormState];

export type BooleanVehicleFormField = {
  [K in keyof VehicleFormState]: VehicleFormState[K] extends boolean ? K : never;
}[keyof VehicleFormState];

export type VehicleFormField = keyof VehicleFormState;

export type VehicleFormProps = {
  mode?: "create" | "update";
  initialValues?: VehicleFormState;
  vehicleId?: string;
};

export type VehicleFilters = {
  search?: string;
  status?: VehicleStatus | "all";
  page?: number;
  limit?: number;
};

export type GetVehiclesParams = Pick<VehicleFilters, "search" | "status"> & {
  page: number;
  limit: number;
};

export type VehiclesResult = Awaited<ReturnType<typeof getVehicles>>;
