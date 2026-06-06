import { INITIAL_VEHICLE_FORM } from "../constants/vehicle-form.constants";
import type { VehicleFormState } from "../types/vehicle-form.types";

type VehicleForForm = {
  make: string;
  model: string;
  variant: string | null;
  year: number;
  type: VehicleFormState["type"];
  color: string;
  interiorColor: string | null;
  engine: string | null;
  power: number | null;
  torque: number | null;
  fuelType: VehicleFormState["fuelType"];
  transmission: VehicleFormState["transmission"];
  mileage: number;
  doors: number;
  seats: number;
  acceleration: number | null;
  topSpeed: number | null;
  consumption: number | null;
  autonomy: number | null;
  price: number;
  comparePrice: number | null;
  status: VehicleFormState["status"];
  stock: number;
  priceNegotiable: boolean;
  originCountry: VehicleFormState["originCountry"];
  customsCleared: boolean;
  chassisNumber: string | null;
  description: string | null;
  isFeatured: boolean;
  isPopular: boolean;
  features: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  images: Array<{
    url: string;
    publicId: string;
    alt: string | null;
    width: number | null;
    height: number | null;
    order: number;
    isPrimary: boolean;
  }>;
};

function toFormString(value: string | number | null | undefined) {
  return value == null ? "" : String(value);
}

export function mapVehicleToFormState(vehicle: VehicleForForm): VehicleFormState {
  return {
    ...INITIAL_VEHICLE_FORM,
    make: vehicle.make,
    model: vehicle.model,
    variant: vehicle.variant ?? "",
    year: vehicle.year,
    type: vehicle.type,
    color: vehicle.color,
    interiorColor: vehicle.interiorColor ?? "",
    engine: vehicle.engine ?? "",
    power: toFormString(vehicle.power),
    torque: toFormString(vehicle.torque),
    fuelType: vehicle.fuelType,
    transmission: vehicle.transmission,
    mileage: toFormString(vehicle.mileage),
    doors: toFormString(vehicle.doors),
    seats: toFormString(vehicle.seats),
    acceleration: toFormString(vehicle.acceleration),
    topSpeed: toFormString(vehicle.topSpeed),
    consumption: toFormString(vehicle.consumption),
    autonomy: toFormString(vehicle.autonomy),
    price: toFormString(vehicle.price),
    comparePrice: toFormString(vehicle.comparePrice),
    status: vehicle.status,
    stock: toFormString(vehicle.stock),
    priceNegotiable: vehicle.priceNegotiable,
    originCountry: vehicle.originCountry,
    customsCleared: vehicle.customsCleared,
    chassisNumber: vehicle.chassisNumber ?? "",
    description: vehicle.description ?? "",
    isFeatured: vehicle.isFeatured,
    isPopular: vehicle.isPopular,
    features: vehicle.features,
    images: vehicle.images.map((image) => ({
      url: image.url,
      publicId: image.publicId,
      alt: image.alt ?? "",
      width: image.width ?? undefined,
      height: image.height ?? undefined,
      order: image.order,
      isPrimary: image.isPrimary,
    })),
    metaTitle: vehicle.metaTitle ?? "",
    metaDescription: vehicle.metaDescription ?? "",
  };
}
