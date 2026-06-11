import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Star } from "lucide-react";

import { cn, formatMileage, formatPrice } from "@/lib/utils";
import { getCountryFlag, getCountryName } from "@/shared/constants/countries";

import type { VehicleListItem } from "../types/vehicle.types";
import VehicleStatusPill from "./vehicle-status-pill";

type VehicleCardProps = {
  vehicle: VehicleListItem;
  priority?: boolean;
  className?: string;
};

const FUEL_LABELS: Record<string, string> = {
  GASOLINE: "Essence",
  DIESEL: "Diesel",
  HYBRID: "Hybride",
  PLUGIN_HYBRID: "Hybride rechargeable",
  ELECTRIC: "Électrique",
  HYDROGEN: "Hydrogène",
};

const TRANSMISSION_LABELS: Record<string, string> = {
  AUTOMATIC: "Auto",
  MANUAL: "Manuelle",
  CVT: "CVT",
  DCT: "DCT",
  PDK: "PDK",
};

function TopBadge({
  isFeatured,
  isPopular,
}: {
  isFeatured: boolean;
  isPopular: boolean;
}) {
  if (isFeatured) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.14)] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-(--gold)">
        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
        Coup de coeur
      </span>
    );
  }

  if (isPopular) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(230,57,70,0.3)] bg-[rgba(230,57,70,0.12)] px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-(--accent)">
        <Flame className="h-3 w-3 fill-current" aria-hidden="true" />
        Populaire
      </span>
    );
  }

  return null;
}

function CountryBadge({
  country,
}: {
  country: VehicleListItem["originCountry"];
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/20 bg-black/45 px-2.5 py-1 text-[0.68rem] font-medium text-white shadow-sm backdrop-blur-sm">
      <span aria-hidden="true">{getCountryFlag(country)}</span>
      {getCountryName(country)}
    </span>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="truncate font-mono text-[0.8rem] font-medium text-(--text)">
        {value}
      </p>
      <p className="mt-0.5 text-[0.62rem] uppercase tracking-[0.08em] text-(--dim)">
        {label}
      </p>
    </div>
  );
}

export default function VehicleCard({
  vehicle,
  priority = false,
  className,
}: VehicleCardProps) {
  const primaryImage =
    vehicle.images.find((image) => image.isPrimary) ?? vehicle.images[0];
  const title = `${vehicle.make} ${vehicle.model}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-(--r-lg) border border-(--border) bg-(--bg-2)",
        "transition-all duration-300 hover:-translate-y-1 hover:border-(--border-2) hover:shadow-card-lg",
        vehicle.status === "SOLD" && "opacity-70",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-(--bg-4)">
        <Image
          src={
            primaryImage?.url ?? "/images/placeholders/vehicle-placeholder.webp"
          }
          alt={primaryImage?.alt ?? `${title} ${vehicle.year}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          unoptimized
        />

        <div
          className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
          <VehicleStatusPill status={vehicle.status} />
          <TopBadge
            isFeatured={vehicle.isFeatured}
            isPopular={vehicle.isPopular}
          />
        </div>

        <div className="absolute bottom-3 right-3">
          <CountryBadge country={vehicle.originCountry} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-(--muted)">
          {vehicle.make}
        </p>
        <h3 className="line-clamp-1 font-display text-[1.55rem] tracking-[0.03em] text-(--text)">
          {vehicle.model}
        </h3>
        <p className="mt-1 min-h-5 text-[0.75rem] text-(--dim)">
          {vehicle.variant || `${vehicle.year} · ${vehicle.color}`}
        </p>

        <div className="my-4 grid grid-cols-3 gap-3 border-y border-(--border) py-3.5">
          <SpecItem label="Km" value={formatMileage(vehicle.mileage)} />
          <SpecItem
            label="Carburant"
            value={FUEL_LABELS[vehicle.fuelType] ?? vehicle.fuelType}
          />
          <SpecItem
            label="Boite"
            value={
              TRANSMISSION_LABELS[vehicle.transmission] ?? vehicle.transmission
            }
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.62rem] uppercase tracking-widest text-(--dim)">
              Prix
            </p>
            <p className="font-mono text-[1rem] font-semibold text-(--gold)">
              {formatPrice(vehicle.price)}
            </p>
            {vehicle.comparePrice && (
              <p className="font-mono text-[0.72rem] text-(--dim) line-through">
                {formatPrice(vehicle.comparePrice)}
              </p>
            )}
          </div>

          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-(--r) border border-(--border-2) px-4 text-[0.75rem] font-medium uppercase tracking-wider text-(--text) transition-all duration-200 hover:border-(--gold) hover:bg-(--gold) hover:text-(--bg)"
            aria-label={`Voir les détails de ${title} ${vehicle.year}`}
          >
            Voir
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
