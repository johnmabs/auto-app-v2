"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/shared/guards/session.guard";
import { actionSuccess } from "@/shared/types/action-response";
import { handleActionError } from "@/shared/utils/handle-action-error";
import { updateVehicleMutation } from "../data/vehicle.mutations";
import { updateVehicleSchema } from "../schemas/update-vehicle.schema";
import type { VehicleFormState } from "../types/vehicle-form.types";

export async function updateVehicle(id: string, input: VehicleFormState) {
  try {
    await requireAdmin();
    const payload = updateVehicleSchema.parse({ ...input, id });
    const vehicle = await updateVehicleMutation(payload.id, payload);

    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${id}/edit`);
    return actionSuccess(vehicle, "Vehicule mis a jour avec succes");
  } catch (error) {
    return handleActionError(error);
  }
}
