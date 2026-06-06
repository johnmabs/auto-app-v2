import { INITIAL_VEHICLE_FORM, VEHICLE_DRAFT_STORAGE_KEY } from "../constants/vehicle-form.constants";
import { vehicleDraftSchema } from "../schemas/vehicle-draft.schema";
import type { VehicleFormState } from "../types/vehicle-form.types";

export function readVehicleDraft(): VehicleFormState | null {
  try {
    const saved = sessionStorage.getItem(VEHICLE_DRAFT_STORAGE_KEY);
    if (!saved) return null;

    const parsed = vehicleDraftSchema.parse(JSON.parse(saved));
    return { ...INITIAL_VEHICLE_FORM, ...parsed };
  } catch {
    return null;
  }
}

export function writeVehicleDraft(form: VehicleFormState) {
  try {
    sessionStorage.setItem(VEHICLE_DRAFT_STORAGE_KEY, JSON.stringify(form));
  } catch {
    // Storage can be unavailable in private browsing contexts.
  }
}

export function removeVehicleDraft() {
  try {
    sessionStorage.removeItem(VEHICLE_DRAFT_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private browsing contexts.
  }
}
