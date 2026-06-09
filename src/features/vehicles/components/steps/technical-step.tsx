"use client";

import { cn } from "@/lib/utils";
import {
  FUEL_TYPE_OPTIONS,
  TRANSMISSION_OPTIONS,
} from "../../constants/vehicle-form.constants";
import type { VehicleFormState } from "../../types/vehicle-form.types";
import FeaturesInput from "../features-input";
import Field from "../form-field";

type Props = {
  form: VehicleFormState;
  onChange: <K extends keyof VehicleFormState>(
    field: K,
    value: VehicleFormState[K],
  ) => void;
};

/* ── Input ───────────────────────────────────────────────── */
const inputCls =
  "w-full bg-(--bg-3) border border-(--border) rounded-(--r) px-3 py-2.5 text-[0.88rem] text-(--text) placeholder:text-(--dim) outline-none focus:border-(--gold) transition-colors";
const selectCls = inputCls + " cursor-pointer [&>option]:bg-(--bg-2)";

export function TechnicalStep({ form, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[0.95rem] mb-5 pb-3 border-b border-(--border)">
        Caractéristiques techniques
      </h2>
      <div className="grid gap-4 grid-cols-2">
        <Field label="Carburant" required>
          <select
            className={selectCls}
            value={form.fuelType}
            onChange={(event) =>
              onChange(
                "fuelType",
                event.target.value as VehicleFormState["fuelType"],
              )
            }
          >
            {FUEL_TYPE_OPTIONS.map((fuel) => (
              <option key={fuel.value} value={fuel.value}>
                {fuel.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Transmission" required>
          <select
            className={selectCls}
            value={form.transmission}
            onChange={(event) =>
              onChange(
                "transmission",
                event.target.value as VehicleFormState["transmission"],
              )
            }
          >
            {TRANSMISSION_OPTIONS.map((transmission) => (
              <option key={transmission.value} value={transmission.value}>
                {transmission.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Moteur">
          <input
            value={form.engine}
            onChange={(event) => onChange("engine", event.target.value)}
            placeholder="V6 atmosphérique de 3,8 L"
            className={inputCls}
          />
        </Field>
        <Field label="Puissance (ch)">
          <input
            className={inputCls}
            inputMode="numeric"
            placeholder="530"
            value={form.power}
            onChange={(event) => onChange("power", event.target.value)}
          />
        </Field>
        <Field label="Couple (Nm)">
          <input
            className={inputCls}
            inputMode="numeric"
            value={form.torque}
            placeholder="750"
            onChange={(event) => onChange("torque", event.target.value)}
          />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Kilometrage" required>
          <input
            className={inputCls}
            inputMode="numeric"
            value={form.mileage}
            onChange={(event) => onChange("mileage", event.target.value)}
            placeholder="18200"
            required
          />
        </Field>
        <Field label="Portes">
          <input
            className={inputCls}
            inputMode="numeric"
            value={form.doors}
            onChange={(event) => onChange("doors", event.target.value)}
          />
        </Field>
        <Field label="Places">
          <input
            className={inputCls}
            inputMode="numeric"
            value={form.seats}
            onChange={(event) => onChange("seats", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Field label="0-100 km/h (s)">
          <input
            className={inputCls}
            inputMode="decimal"
            value={form.acceleration}
            placeholder="5.4"
            onChange={(event) => onChange("acceleration", event.target.value)}
          />
        </Field>
        <Field label="Vmax (km/h)">
          <input
            className={inputCls}
            inputMode="decimal"
            value={form.topSpeed}
            placeholder="250"
            onChange={(event) => onChange("topSpeed", event.target.value)}
          />
        </Field>
        <Field label="Conso (L/100)">
          <input
            className={inputCls}
            inputMode="decimal"
            value={form.consumption}
            placeholder="9.5"
            onChange={(event) => onChange("consumption", event.target.value)}
          />
        </Field>
        <Field label="Autonomie (km)">
          <input
            className={inputCls}
            inputMode="decimal"
            value={form.autonomy}
            placeholder="600"
            onChange={(event) => onChange("autonomy", event.target.value)}
          />
        </Field>
      </div>

      <Field
        label="Équipements & Options"
        hint="Appuyez sur Entrée pour ajouter"
      >
        <FeaturesInput
          features={form.features}
          onChange={(f) => onChange("features", f)}
        />
      </Field>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={4}
          placeholder="Description détaillée du véhicule..."
          className={cn(inputCls, "resize-none")}
        />
      </Field>
    </div>
  );
}
