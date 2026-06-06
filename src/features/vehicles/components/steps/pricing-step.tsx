"use client";

import {
  COUNTRY_OPTIONS,
  VEHICLE_STATUS_OPTIONS,
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

export function PricingStep({ form, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[0.95rem] mb-5 pb-3 border-b border-(--border)">
        Prix, stock et importation
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Prix de vente (FCFA)" required>
          <input
            className={inputCls}
            inputMode="numeric"
            value={form.price}
            placeholder="10000000"
            onChange={(event) => onChange("price", event.target.value)}
            required
          />
        </Field>
        <Field label="Prix barré / comparaison (FCFA)">
          <input
            className={inputCls}
            inputMode="numeric"
            value={form.comparePrice}
            onChange={(event) => onChange("comparePrice", event.target.value)}
            placeholder="15000000"
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Statut">
          <select
            className={selectCls}
            value={form.status}
            onChange={(event) =>
              onChange(
                "status",
                event.target.value as VehicleFormState["status"],
              )
            }
          >
            {VEHICLE_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Stock">
          <input
            className={inputCls}
            inputMode="numeric"
            value={form.stock}
            min={0}
            onChange={(event) => onChange("stock", event.target.value)}
          />
        </Field>
        <Field label="Pays origine">
          <select
            className={selectCls}
            value={form.originCountry}
            onChange={(event) =>
              onChange(
                "originCountry",
                event.target.value as VehicleFormState["originCountry"],
              )
            }
          >
            {COUNTRY_OPTIONS.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Numéro de châssis (VIN)">
        <input
          className={inputCls}
          value={form.chassisNumber}
          placeholder="WBA7G4C51KG123456"
          onChange={(event) => onChange("chassisNumber", event.target.value)}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-2">
        {(
          [
            { key: "priceNegotiable", label: "Prix négociable" },
            { key: "customsCleared", label: "Dédouanement effectué" },
            { key: "isFeatured", label: "Coup de cœur (mis en avant)" },
            { key: "isPopular", label: "Marquer comme populaire" },
          ] as const
        ).map((opt) => (
          <label
            key={opt.key}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={form[opt.key]}
              onChange={(e) => onChange(opt.key, e.target.checked)}
              className="w-4 h-4 accent-(--gold) rounded"
            />
            <span className="text-[0.85rem]">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
