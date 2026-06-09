import {
  Country,
  FuelType,
  TransmissionType,
  VehicleStatus,
  VehicleType,
} from "@generated/prisma/enums";
import { COUNTRIES } from "@/shared/constants/countries";
import type { VehicleFormState } from "../types/vehicle-form.types";

export const VEHICLE_FORM_STEPS = [
  "Identite",
  "Technique",
  "Prix & stock",
  "Medias",
  "SEO",
] as const;

export const VEHICLE_MAKES = [
  "Toyota",
  "Lexus",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Porsche",
  "Land Rover",
  "BYD",
  "Tesla",
  "Hyundai",
] as const;

export const VEHICLE_TYPE_OPTIONS = Object.values(VehicleType);
export const FUEL_TYPE_OPTIONS = [
  { value: FuelType.GASOLINE, label: "Essence" },
  { value: FuelType.DIESEL, label: "Diesel" },
  { value: FuelType.ELECTRIC, label: "Électrique" },
  { value: FuelType.HYBRID, label: "Hybride" },
  { value: FuelType.PLUGIN_HYBRID, label: "Hybride rechargeable" },
  { value: FuelType.HYDROGEN, label: "Hydrogène" },
] as const;
export const TRANSMISSION_OPTIONS = [
  { value: TransmissionType.AUTOMATIC, label: "Automatique" },
  { value: TransmissionType.MANUAL, label: "Manuelle" },
  { value: TransmissionType.CVT, label: "CVT" },
  { value: TransmissionType.DCT, label: "DCT" },
  { value: TransmissionType.PDK, label: "PDK" },
] as const;
export const VEHICLE_STATUS_OPTIONS = Object.values(VehicleStatus);
export const COUNTRY_OPTIONS = COUNTRIES.filter((country) => country.active);

export const VEHICLE_DRAFT_STORAGE_KEY = "nouveau-vehicule-draft";

export const INITIAL_VEHICLE_FORM: VehicleFormState = {
  make: "",
  model: "",
  variant: "",
  year: new Date().getFullYear(),
  type: VehicleType.SUV,
  color: "",
  interiorColor: "",
  engine: "",
  power: "",
  torque: "",
  fuelType: FuelType.GASOLINE,
  transmission: TransmissionType.AUTOMATIC,
  mileage: "",
  doors: "4",
  seats: "5",
  acceleration: "",
  topSpeed: "",
  consumption: "",
  autonomy: "",
  price: "",
  comparePrice: "",
  status: VehicleStatus.DRAFT,
  stock: "1",
  priceNegotiable: false,
  originCountry: Country.SOUTH_KOREA,
  customsCleared: false,
  chassisNumber: "",
  description: "",
  isFeatured: false,
  isPopular: false,
  features: [],
  images: [],
  metaTitle: "",
  metaDescription: "",
};
