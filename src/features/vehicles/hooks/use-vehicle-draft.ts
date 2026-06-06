"use client";

import * as React from "react";
import { INITIAL_VEHICLE_FORM } from "../constants/vehicle-form.constants";
import { readVehicleDraft, removeVehicleDraft, writeVehicleDraft } from "../lib/vehicle-draft-storage";
import type { VehicleFormState } from "../types/vehicle-form.types";

export function useVehicleDraft(initialValues: VehicleFormState = INITIAL_VEHICLE_FORM) {
  const shouldReadDraft = initialValues === INITIAL_VEHICLE_FORM;
  const [form, setForm] = React.useState<VehicleFormState>(() => {
    if (!shouldReadDraft) return initialValues;
    return readVehicleDraft() ?? initialValues;
  });
  const hydratedRef = React.useRef(false);

  React.useEffect(() => {
    hydratedRef.current = true;
  }, []);

  React.useEffect(() => {
    if (!hydratedRef.current || !shouldReadDraft) return;
    writeVehicleDraft(form);
  }, [form, shouldReadDraft]);

  const clearDraft = React.useCallback(() => {
    removeVehicleDraft();
    setForm(initialValues);
  }, [initialValues]);

  return {
    form,
    setForm,
    clearDraft,
  };
}
