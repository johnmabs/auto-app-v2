"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/shared/guards/session.guard";
import { actionSuccess } from "@/shared/types/action-response";
import { handleActionError } from "@/shared/utils/handle-action-error";
import { deleteVehicleMutation } from "../data/vehicle.mutations";

const deleteVehicleSchema = z.string().cuid();

export async function deleteVehicle(id: string) {
  try {
    await requireAdmin();
    const vehicleId = deleteVehicleSchema.parse(id);
    const vehicle = await deleteVehicleMutation(vehicleId);

    revalidatePath("/admin/vehicles");
    return actionSuccess(vehicle, "Vehicule archive");
  } catch (error) {
    return handleActionError(error);
  }
}
