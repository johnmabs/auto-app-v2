"use client";

import { cn } from "@/lib/utils";
import { getCountryName, getCountryOptionLabel } from "@/shared/constants/countries";
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

export function SeoStep({ form, onChange }: Props) {
  const countryName = getCountryName(form.originCountry);
  const countryLabel = getCountryOptionLabel(form.originCountry);

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[0.95rem] mb-5 pb-3 border-b border-(--border)">
        Référencement (SEO)
      </h2>
      <Field label="Titre SEO" hint="70 caractères maximum recommandés">
        <input
          className={inputCls}
          /* value={form.metaTitle} */
          defaultValue={`${form.make} ${form.model} ${form.year} — Autostore Congo`}
          placeholder={`${form.make} ${form.model} ${form.year} — Autostore Congo`}
          onChange={(event) => onChange("metaTitle", event.target.value)}
        />
      </Field>

      <Field label="Description SEO" hint="160 caractères maximum recommandés">
        <textarea
          /* value={form.metaDescription} */
          defaultValue={`${form.make} ${form.model} ${form.year} importé depuis ${countryName}...`}
          onChange={(event) => onChange("metaDescription", event.target.value)}
          placeholder={`${form.make} ${form.model} ${form.year} importé depuis ${countryName}...`}
          maxLength={160}
          rows={3}
          className={cn(inputCls, "resize-none")}
        />
        <p className="text-[0.65rem] text-(--dim) mt-0.5">
          {form.metaDescription.length}/160
        </p>
      </Field>

      {/* Summary */}
      <div className="mt-6 bg-(--bg-3) border border-(--border) rounded-(--r-lg) p-5">
        <h3 className="font-medium text-[0.85rem] mb-3">
          Résumé avant publication
        </h3>
        <div className="grid grid-cols-2 gap-2 text-[0.78rem]">
          <div>
            <span className="text-(--dim)">Véhicule :</span>{" "}
            <span>
              {form.make} {form.model} {form.year}
            </span>
          </div>
          <div>
            <span className="text-(--dim)">Prix :</span>{" "}
            <span className="text-(--gold)">
              {Number(form.price).toLocaleString()} FCFA
            </span>
          </div>
          <div>
            <span className="text-(--dim)">Statut :</span>{" "}
            <span>{form.status}</span>
          </div>
          <div>
            <span className="text-(--dim)">Pays :</span>{" "}
            <span>{countryLabel}</span>
          </div>
          <div>
            <span className="text-(--dim)">Photos :</span>{" "}
            <span>
              {form.images.length} image{form.images.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div>
            <span className="text-(--dim)">Équipements :</span>{" "}
            <span>{form.features.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
