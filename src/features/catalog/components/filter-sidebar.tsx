"use client";

import { SlidersHorizontal, X } from "lucide-react";

import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/shared/ui/Button";
import { FilterGroup } from "./filter-group";

import { COUNTRIES } from "@/shared/constants/countries";

import {
  FUEL_TYPE_FILTER_OPTIONS,
  PRICE_MIN,
  PRICE_MAX,
  TRANSMISSION_FILTER_OPTIONS,
  VEHICLE_STATUS_FILTER_OPTIONS,
  VEHICLE_TYPE_FILTER_OPTIONS,
} from "../lib/vehicle-filters";
import { useVehicleFilters } from "../hooks/use-vehicle-filters";
import { CheckboxItem } from "./checkbox-item";
import { RangeInput } from "./range-input";

/* ────────────────────────────────────────────────────────── */
/* Sidebar                                                   */
/* ────────────────────────────────────────────────────────── */

export function FilterSidebar({ className }: { className?: string }) {
  const { filters, activeCount, toggleArray, setMaxPrice, apply, reset } =
    useVehicleFilters();

  return (
    <aside
      aria-label="Filtres du catalogue"
      className={cn(
        "rounded-(--r-lg) border border-(--border)",
        "bg-(--bg-2) p-5",
        "lg:sticky lg:top-[calc(var(--nav-h)+1rem)]",
        className,
      )}
    >
      {/* Header */}

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="h-4 w-4 text-(--muted)"
            aria-hidden="true"
          />

          <span className="text-[0.82rem] font-semibold text-(--text)">
            Filtres
          </span>

          {activeCount > 0 && (
            <span className="rounded-full bg-(--gold) px-1.5 py-0.5 text-[0.65rem] font-bold text-(--bg)">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={reset}
            aria-label="Réinitialiser les filtres"
            className="flex items-center gap-1 text-[0.72rem] text-(--muted) transition-colors hover:text-(--accent)"
          >
            <X className="h-3 w-3" />
            Réinitialiser
          </button>
        )}
      </div>

      <div>
        <FilterGroup title="Pays d'importation">
          {COUNTRIES.filter((c) => c.active).map((country) => (
            <CheckboxItem
              key={country.code}
              value={country.code}
              checked={filters.countries.includes(country.code)}
              onChange={(v, checked) => toggleArray("countries", v, checked)}
              label={`${country.flag} ${country.name}`}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Type de véhicule">
          {VEHICLE_TYPE_FILTER_OPTIONS.map((opt) => (
            <CheckboxItem
              key={opt.value}
              value={opt.value}
              checked={filters.types.includes(opt.value)}
              onChange={(v, checked) => toggleArray("types", v, checked)}
              label={opt.label}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Budget maximum">
          <RangeInput
            label="Budget maximum"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={filters.maxPrice}
            onChange={setMaxPrice}
            format={(v) => (v >= PRICE_MAX ? "Illimité" : formatPrice(v))}
          />
        </FilterGroup>

        <FilterGroup title="Carburant">
          {FUEL_TYPE_FILTER_OPTIONS.map((opt) => (
            <CheckboxItem
              key={opt.value}
              value={opt.value}
              checked={filters.fuels.includes(opt.value)}
              onChange={(v, checked) => toggleArray("fuels", v, checked)}
              label={opt.label}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Transmission" defaultOpen={false}>
          {TRANSMISSION_FILTER_OPTIONS.map((opt) => (
            <CheckboxItem
              key={opt.value}
              value={opt.value}
              checked={filters.transmissions.includes(opt.value)}
              onChange={(v, checked) =>
                toggleArray("transmissions", v, checked)
              }
              label={opt.label}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Disponibilité" defaultOpen={false}>
          {VEHICLE_STATUS_FILTER_OPTIONS.map((opt) => (
            <CheckboxItem
              key={opt.value}
              value={opt.value}
              checked={filters.status.includes(opt.value)}
              onChange={(v, checked) => toggleArray("status", v, checked)}
              label={opt.label}
            />
          ))}
        </FilterGroup>
      </div>

      <Button
        fullWidth
        className="mt-5"
        icon={<SlidersHorizontal className="h-4 w-4" />}
        onClick={apply}
      >
        Appliquer les filtres
        {activeCount > 0 && ` (${activeCount})`}
      </Button>
    </aside>
  );
}
