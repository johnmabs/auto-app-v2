import { z } from "zod";
import {
  Country,
  FuelType,
  TransmissionType,
  VehicleStatus,
  VehicleType,
} from "@generated/prisma/enums";

const optionalString = z.string().trim().optional().default("");
const intString = z.string().trim().regex(/^\d+$/, "Nombre entier attendu");
const optionalIntString = z
  .string()
  .trim()
  .regex(/^\d*$/, "Nombre entier attendu")
  .optional()
  .default("");
const optionalFloatString = z
  .string()
  .trim()
  .regex(/^\d*(\.\d+)?$/, "Nombre attendu")
  .optional()
  .default("");

export const uploadedVehicleImageSchema = z.object({
  url: z.url(),
  publicId: z.string().trim().min(1),
  alt: z.string().trim().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  order: z.number().int().min(0).optional(),
  isPrimary: z.boolean().optional(),
});

export const vehicleFormSchema = z.object({
  make: z.string().trim().min(1, "La marque est requise"),
  model: z.string().trim().min(1, "Le modele est requis"),
  variant: optionalString,
  year: z.coerce
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  type: z.enum(VehicleType),
  color: z.string().trim().min(1, "La couleur est requise"),
  interiorColor: optionalString,
  engine: optionalString,
  power: optionalIntString,
  torque: optionalIntString,
  fuelType: z.enum(FuelType),
  transmission: z.enum(TransmissionType),
  mileage: intString,
  doors: intString,
  seats: intString,
  acceleration: optionalFloatString,
  topSpeed: optionalIntString,
  consumption: optionalFloatString,
  autonomy: optionalIntString,
  price: intString,
  comparePrice: optionalIntString,
  status: z.enum(VehicleStatus),
  stock: intString,
  priceNegotiable: z.boolean(),
  originCountry: z.enum(Country),
  customsCleared: z.boolean(),
  chassisNumber: optionalString,
  description: optionalString,
  isFeatured: z.boolean(),
  isPopular: z.boolean(),
  features: z.array(z.string().trim().min(1)).default([]),
  images: z.array(uploadedVehicleImageSchema).default([]),
  metaTitle: optionalString,
  metaDescription: optionalString,
});

export type VehicleFormInput = z.infer<typeof vehicleFormSchema>;
