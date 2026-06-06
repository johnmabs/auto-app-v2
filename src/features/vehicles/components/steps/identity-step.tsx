"use client";

import {
  VEHICLE_MAKES,
  VEHICLE_TYPE_OPTIONS,
} from "../../constants/vehicle-form.constants";
import type { VehicleFormState } from "../../types/vehicle-form.types";
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

export function IdentityStep({ form, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[0.95rem] mb-5 pb-3 border-b border-(--border)">
        Identité du véhicule
      </h2>
      <div className="grid gap-4 grid-cols-2">
        <Field label="Marque" required>
          <input
            list="vehicle-makes"
            value={form.make}
            onChange={(event) => onChange("make", event.target.value)}
            placeholder="Hyundai"
            className={inputCls}
            required
          />
          <datalist id="vehicle-makes">
            {VEHICLE_MAKES.map((make) => (
              <option key={make} value={make} />
            ))}
          </datalist>
        </Field>

        <Field label="Modele" required>
          <input
            value={form.model}
            onChange={(event) => onChange("model", event.target.value)}
            placeholder="Palisade"
            className={inputCls}
            required
          />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Version / Trim">
          <input
            value={form.variant}
            onChange={(event) => onChange("variant", event.target.value)}
            placeholder="SE"
            className={inputCls}
          />
        </Field>
        <Field label="Année" required>
          <input
            className={inputCls}
            type="number"
            value={form.year}
            onChange={(event) => onChange("year", Number(event.target.value))}
            min={1990}
            max={2030}
            required
          />
        </Field>
        <Field label="Type" required>
          <select
            className={selectCls}
            value={form.type}
            onChange={(event) =>
              onChange("type", event.target.value as VehicleFormState["type"])
            }
          >
            {VEHICLE_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Couleur extérieure" required>
          <input
            className={inputCls}
            value={form.color}
            onChange={(event) => onChange("color", event.target.value)}
            placeholder="Blanc Alpine"
            required
          />
        </Field>
        <Field label="Couleur interieure">
          <input
            className={inputCls}
            value={form.interiorColor}
            onChange={(event) => onChange("interiorColor", event.target.value)}
            placeholder="Cuir noir"
          />
        </Field>
      </div>
    </div>
  );
}
