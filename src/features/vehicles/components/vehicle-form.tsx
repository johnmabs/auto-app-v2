"use client";

import { Fragment, useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { createVehicle } from "../actions/create-vehicle.action";
import { updateVehicle } from "../actions/update-vehicle.action";
import { INITIAL_VEHICLE_FORM } from "../constants/vehicle-form.constants";
import { useVehicleDraft } from "../hooks/use-vehicle-draft";
import { useVehicleWizard } from "../hooks/use-vehicle-wizard";
import type {
  VehicleFormProps,
  VehicleFormState,
} from "../types/vehicle-form.types";
import { IdentityStep } from "./steps/identity-step";
import { MediaStep } from "./steps/media-step";
import { PricingStep } from "./steps/pricing-step";
import { SeoStep } from "./steps/seo-step";
import { TechnicalStep } from "./steps/technical-step";
import { cn } from "@/lib/utils";

const REQUIRED_FIELDS_BY_STEP = [
  ["make", "model", "year", "type", "color"],
  ["fuelType", "transmission", "mileage", "doors", "seats"],
  ["price", "status", "stock", "originCountry"],
  [],
  [],
] as const satisfies readonly (readonly (keyof VehicleFormState)[])[];

function hasRequiredValue(value: VehicleFormState[keyof VehicleFormState]) {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value) && value > 0;
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return true;

  return value != null;
}

function isStepComplete(form: VehicleFormState, step: number) {
  const requiredFields = REQUIRED_FIELDS_BY_STEP[step] ?? [];
  return requiredFields.every((field) => hasRequiredValue(form[field]));
}

export function VehicleForm({
  mode = "create",
  initialValues = INITIAL_VEHICLE_FORM,
  vehicleId,
}: VehicleFormProps) {
  const router = useRouter();
  const wizard = useVehicleWizard();
  const { form, setForm, clearDraft } = useVehicleDraft(initialValues);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const isCurrentStepComplete = isStepComplete(form, wizard.step);

  const updateField = useCallback(
    <K extends keyof VehicleFormState>(
      field: K,
      value: VehicleFormState[K],
    ) => {
      setForm((current) => ({ ...current, [field]: value }));
    },
    [setForm],
  );

  const submit = () => {
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const response =
        mode === "update" && vehicleId
          ? await updateVehicle(vehicleId, form)
          : await createVehicle(form);

      if (!response.success) {
        setError(response.error);
        return;
      }

      clearDraft();
      setMessage(response.message ?? "Enregistre");
      router.push("/admin/vehicles");
      router.refresh();
    });
  };

  const stepContent = [
    <IdentityStep key="identity" form={form} onChange={updateField} />,
    <TechnicalStep key="technical" form={form} onChange={updateField} />,
    <PricingStep key="pricing" form={form} onChange={updateField} />,
    <MediaStep key="media" form={form} onChange={updateField} />,
    <SeoStep key="seo" form={form} onChange={updateField} />,
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-0 mb-8">
        {wizard.steps.map((label, index) => (
          <Fragment key={label}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[0.72rem] font-bold border transition-all",
                  index < wizard.step &&
                    "bg-(--gold) border-(--gold) text-(--bg)",
                  index === wizard.step &&
                    "bg-[rgba(201,168,76,0.15)] border-(--gold) text-(--gold)",
                  index > wizard.step &&
                    "bg-(--bg-3) border-(--border) text-(--dim)",
                )}
              >
                {index < wizard.step ? "✓" : index + 1}
              </div>
              <span
                className={cn(
                  "text-[0.75rem] font-medium hidden sm:block",
                  index === wizard.step
                    ? "text-(--gold)"
                    : index < wizard.step
                      ? "text-(--muted)"
                      : "text-(--dim)",
                )}
              >
                {label}
              </span>
            </div>
            {index < wizard.steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-3",
                  index < wizard.step ? "bg-(--gold)" : "bg-(--border)",
                )}
              />
            )}
          </Fragment>
        ))}
      </div>

      <section className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-7">
        {stepContent[wizard.step]}
      </section>

      {error ? (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700">
          {message}
        </p>
      ) : null}

      <div className="flex items-center justify-between mt-5">
        <Button
          type="button"
          variant="ghost"
          icon={<ArrowLeft className="h-4 w-4" />}
          disabled={wizard.isFirstStep || isPending}
          onClick={wizard.previous}
        >
          Precedent
        </Button>

        <span className="text-[0.75rem] text-(--dim)">
          Étape {wizard.step + 1} / {wizard.steps.length}
        </span>

        {!wizard.isLastStep ? (
          <Button
            type="button"
            iconRight={<ArrowRight className="h-4 w-4" />}
            disabled={!isCurrentStepComplete || isPending}
            onClick={wizard.next}
          >
            Suivant
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              loading={isPending}
              /* onClick={() => handleSubmit("DRAFT")} */
            >
              Enregistrer brouillon
            </Button>
            <Button
              type="button"
              loading={isPending}
              icon={<Save className="h-4 w-4" />}
              onClick={submit}
            >
              {mode === "update"
                ? "Mettre a jour le vehicule"
                : "Publier le véhicule"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
