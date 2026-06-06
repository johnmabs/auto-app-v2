"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { VehicleStatus } from "@generated/prisma/enums";
import { requireAdmin } from "@/shared/guards/session.guard";
import { actionSuccess } from "@/shared/types/action-response";
import { handleActionError } from "@/shared/utils/handle-action-error";
import { updateVehicleStatusMutation } from "../data/vehicle.mutations";

const updateStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(VehicleStatus),
});

export async function updateVehicleStatus(input: { id: string; status: VehicleStatus }) {
  try {
    await requireAdmin();
    const payload = updateStatusSchema.parse(input);
    const vehicle = await updateVehicleStatusMutation(payload.id, payload.status);

    revalidatePath("/admin/vehicles");
    return actionSuccess(vehicle, "Statut mis a jour");
  } catch (error) {
    return handleActionError(error);
  }
}
