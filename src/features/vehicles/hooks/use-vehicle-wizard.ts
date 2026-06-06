"use client";

import * as React from "react";
import { VEHICLE_FORM_STEPS } from "../constants/vehicle-form.constants";

export function useVehicleWizard() {
  const [step, setStep] = React.useState(0);
  const lastStep = VEHICLE_FORM_STEPS.length - 1;

  const next = React.useCallback(() => {
    setStep((current) => Math.min(current + 1, lastStep));
  }, [lastStep]);

  const previous = React.useCallback(() => {
    setStep((current) => Math.max(current - 1, 0));
  }, []);

  return {
    step,
    steps: VEHICLE_FORM_STEPS,
    isFirstStep: step === 0,
    isLastStep: step === lastStep,
    setStep,
    next,
    previous,
  };
}
