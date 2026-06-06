import db from "@/lib/prisma";
import { generateVehicleSlug } from "@/shared/utils/slug";
import { VehicleStatus } from "@generated/prisma/enums";
import type { VehicleFormInput } from "../schemas/vehicle-form.schema";
import { normalizeVehicleFormInput } from "../lib/vehicle-validation";

export async function createVehicleMutation(input: VehicleFormInput, createdById?: string) {
  const normalized = normalizeVehicleFormInput(input);
  const slug = generateVehicleSlug(input.make, input.model, input.year);

  return db.vehicle.create({
    data: {
      ...normalized,
      slug,
      createdById,
      publishedAt: input.status === VehicleStatus.DRAFT ? null : new Date(),
      images:
        input.images.length > 0
          ? {
              createMany: {
                data: input.images.map((image, index) => ({
                  url: image.url,
                  publicId: image.publicId,
                  alt: image.alt ?? `${input.make} ${input.model}`,
                  width: image.width,
                  height: image.height,
                  order: image.order ?? index,
                  isPrimary: image.isPrimary ?? index === 0,
                })),
              },
            }
          : undefined,
    },
    select: {
      id: true,
      slug: true,
    },
  });
}

export async function updateVehicleMutation(id: string, input: VehicleFormInput) {
  const normalized = normalizeVehicleFormInput(input);

  return db.vehicle.update({
    where: { id },
    data: {
      ...normalized,
      publishedAt: input.status === VehicleStatus.DRAFT ? null : new Date(),
      images: {
        deleteMany: {},
        createMany:
          input.images.length > 0
            ? {
                data: input.images.map((image, index) => ({
                  url: image.url,
                  publicId: image.publicId,
                  alt: image.alt ?? `${input.make} ${input.model}`,
                  width: image.width,
                  height: image.height,
                  order: image.order ?? index,
                  isPrimary: image.isPrimary ?? index === 0,
                })),
              }
            : undefined,
      },
    },
    select: {
      id: true,
      slug: true,
    },
  });
}

export async function updateVehicleStatusMutation(id: string, status: VehicleStatus) {
  return db.vehicle.update({
    where: { id },
    data: {
      status,
      publishedAt: status === VehicleStatus.DRAFT ? null : new Date(),
    },
    select: {
      id: true,
      status: true,
    },
  });
}

export async function deleteVehicleMutation(id: string) {
  return db.vehicle.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      status: VehicleStatus.DRAFT,
      publishedAt: null,
    },
    select: {
      id: true,
    },
  });
}
