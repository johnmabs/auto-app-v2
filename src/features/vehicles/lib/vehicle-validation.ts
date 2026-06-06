import type { VehicleFormInput } from "../schemas/vehicle-form.schema";

function emptyToNull(value: string) {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

function optionalInt(value: string) {
  const trimmed = value.trim();
  return trimmed === "" ? null : Number.parseInt(trimmed, 10);
}

function optionalFloat(value: string) {
  const trimmed = value.trim();
  return trimmed === "" ? null : Number.parseFloat(trimmed);
}

export function normalizeVehicleFormInput(input: VehicleFormInput) {
  return {
    make: input.make,
    model: input.model,
    variant: emptyToNull(input.variant),
    year: input.year,
    type: input.type,
    engine: emptyToNull(input.engine),
    power: optionalInt(input.power),
    torque: optionalInt(input.torque),
    fuelType: input.fuelType,
    transmission: input.transmission,
    mileage: Number.parseInt(input.mileage, 10),
    color: input.color,
    interiorColor: emptyToNull(input.interiorColor),
    doors: Number.parseInt(input.doors, 10),
    seats: Number.parseInt(input.seats, 10),
    acceleration: optionalFloat(input.acceleration),
    topSpeed: optionalInt(input.topSpeed),
    consumption: optionalFloat(input.consumption),
    autonomy: optionalInt(input.autonomy),
    price: Number.parseInt(input.price, 10),
    priceNegotiable: input.priceNegotiable,
    comparePrice: optionalInt(input.comparePrice),
    status: input.status,
    stock: Number.parseInt(input.stock, 10),
    originCountry: input.originCountry,
    customsCleared: input.customsCleared,
    chassisNumber: emptyToNull(input.chassisNumber),
    description: emptyToNull(input.description),
    features: input.features,
    isFeatured: input.isFeatured,
    isPopular: input.isPopular,
    metaTitle: emptyToNull(input.metaTitle),
    metaDescription: emptyToNull(input.metaDescription),
  };
}
