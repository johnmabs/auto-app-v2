"use server";

import { revalidatePath, updateTag  } from "next/cache";
import { requireAdmin } from "@/shared/guards/session.guard";
import { actionSuccess } from "@/shared/types/action-response";
import { handleActionError } from "@/shared/utils/handle-action-error";
import { createVehicleMutation } from "../data/vehicle.mutations";
import { createVehicleSchema } from "../schemas/create-vehicle.schema";
import type { VehicleFormState } from "../types/vehicle-form.types";

import { VEHICLES_HOME_CACHE_TAG } from "@/features/vehicles/queries";

export async function createVehicle(input: VehicleFormState) {
  try {
    const user = await requireAdmin();
    const payload = createVehicleSchema.parse(input);
    const vehicle = await createVehicleMutation(payload, user.id);

    revalidatePath("/admin/vehicles");
    return actionSuccess(vehicle, "Vehicule cree avec succes");
    updateTag (VEHICLES_HOME_CACHE_TAG);
  } catch (error) {
    return handleActionError(error);
  }
}
