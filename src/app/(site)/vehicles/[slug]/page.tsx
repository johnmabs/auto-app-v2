import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Gauge,
  Zap,
  ArrowLeft,
  Phone,
} from "lucide-react";

import { VehicleGallery } from "@/features/vehicles/components/vehicle-gallery";
import VehicleCard from "@/features/vehicles/components/vehicle-card";
import { WhatsAppButton } from "@/features/vehicles/components/whatsap-button";
import { CountryBadge } from "@/features/vehicles/components/country-badge";
import { PriceTag } from "@/features/vehicles/components/price-tag";
import VehicleStatusPill from "@/features/vehicles/components/vehicle-status-pill";
import { VehicleGridSkeleton } from "@/shared/ui/skeleton";
import {
  getVehicleBySlug,
  getSimilarVehicles,
} from "@/features/vehicles/data/vehicle.queries";
import { getCountryInfo } from "@/shared/constants/countries";
import {
  FUEL_TYPE_FILTER_OPTIONS,
  TRANSMISSION_FILTER_OPTIONS,
  VEHICLE_TYPE_FILTER_OPTIONS,
} from "@/features/catalog/lib/vehicle-filters";
import { COMPANY_INFO } from "@/shared/constants/company";
import { formatMileage, formatPrice } from "@/lib/utils";
import type { VehicleType } from "@generated/prisma/enums";

/* ── generateStaticParams ────────────────────────────────── */
export async function generateStaticParams() {
  // En production, récupérer les slugs depuis la DB
  return [];
}

/* ── generateMetadata ────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) return { title: "Véhicule introuvable" };

  const title = `${vehicle.make} ${vehicle.model} ${vehicle.year} — ${COMPANY_INFO.name}`;
  const description =
    vehicle.metaDescription ??
    `${vehicle.make} ${vehicle.model} ${vehicle.year}, ${vehicle.color}, importé depuis ${getCountryInfo(vehicle.originCountry).name}. ${formatMileage(vehicle.mileage)}. Prix : ${formatPrice(vehicle.price)}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: vehicle.images[0]
        ? [{ url: vehicle.images[0].url, width: 1200, height: 630 }]
        : [],
    },
  };
}

/* ── Spec row ────────────────────────────────────────────── */
function SpecRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-(--border) last:border-0">
      <div className="flex items-center gap-2 text-[0.78rem] text-(--muted)">
        {icon && (
          <span className="text-(--dim)" aria-hidden="true">
            {icon}
          </span>
        )}
        {label}
      </div>
      <span className="font-mono text-[0.85rem] text-(--text) font-medium">
        {value}
      </span>
    </div>
  );
}

/* ── Feature pill ────────────────────────────────────────── */
function FeaturePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] bg-[rgba(46,204,113,0.08)] border border-[rgba(46,204,113,0.2)] text-(--green)">
      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}

/* ── Similar vehicles (async) ────────────────────────────── */
async function SimilarVehicles({
  vehicleId,
  type,
}: {
  vehicleId: string;
  type: VehicleType;
}) {
  const vehicles = await getSimilarVehicles(vehicleId, type, 3);
  if (vehicles.length === 0) return null;

  return (
    <section
      className="mt-16 pt-16 border-t border-(--border)"
      aria-labelledby="similar-heading"
    >
      <div className="mb-8">
        <p className="section-tag mb-3" aria-hidden="true">
          Recommandations
        </p>
        <h2
          id="similar-heading"
          className="font-display text-[2.5rem] tracking-[0.04em]"
        >
          VÉHICULES SIMILAIRES
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle || vehicle.status === "DRAFT") notFound();

  const country = getCountryInfo(vehicle.originCountry);
  const fuelLabel =
    FUEL_TYPE_FILTER_OPTIONS.find((fuel) => fuel.value === vehicle.fuelType)
      ?.label ??
    vehicle.fuelType;
  const transLabel =
    TRANSMISSION_FILTER_OPTIONS.find(
      (transmission) => transmission.value === vehicle.transmission,
    )?.label ??
    vehicle.transmission;
  const typeLabel =
    VEHICLE_TYPE_FILTER_OPTIONS.find((type) => type.value === vehicle.type)
      ?.label ??
    vehicle.type;

  const vehicleName = `${vehicle.make} ${vehicle.model} ${vehicle.year}`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://autostore-cg.com";
  const vehicleUrl = `${appUrl}/vehicles/${vehicle.slug}`;
  const isAvailable = vehicle.status === "AVAILABLE";

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicleName,
    description:
      vehicle.description ?? `${vehicleName} importé depuis ${country.name}`,
    image: vehicle.images[0]?.url,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "XAF",
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: COMPANY_INFO.name,
      },
    },
  };

  return (
    <div className="pt-(--nav-h)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div className="bg-(--bg-2) border-b border-(--border) px-6 lg:px-10 py-4">
        <nav
          className="max-w-7xl mx-auto flex items-center gap-2 text-[0.78rem] text-(--muted)"
          aria-label="Fil d'Ariane"
        >
          <Link href="/" className="hover:text-(--gold) transition-colors">
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/catalog"
            className="hover:text-(--gold) transition-colors"
          >
            Catalogue
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-(--text) truncate">{vehicleName}</span>
        </nav>
      </div>

      {/* ── Main content ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 items-start">
          {/* ── Left: Gallery + Specs ─────────────────── */}
          <div>
            {/* Back button */}
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-[0.78rem] text-(--muted) hover:text-(--gold) transition-colors mb-6"
              aria-label="Retour au catalogue"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Retour au catalogue
            </Link>

            {/* Gallery */}
            <VehicleGallery images={vehicle.images} vehicleName={vehicleName} />

            {/* Technical specs */}
            <div className="mt-8 bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6">
              <h2 className="font-semibold text-[0.9rem] mb-4 pb-3 border-b border-(--border)">
                Spécifications techniques
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {vehicle.engine && (
                  <SpecRow
                    label="Moteur"
                    value={vehicle.engine}
                    icon={<Zap className="h-3.5 w-3.5" />}
                  />
                )}
                {vehicle.power && (
                  <SpecRow label="Puissance" value={`${vehicle.power} ch`} />
                )}
                {vehicle.torque && (
                  <SpecRow label="Couple" value={`${vehicle.torque} Nm`} />
                )}
                <SpecRow label="Carburant" value={fuelLabel} />
                <SpecRow label="Transmission" value={transLabel} />
                <SpecRow label="Type" value={typeLabel} />
                <SpecRow
                  label="Kilométrage"
                  value={formatMileage(vehicle.mileage)}
                  icon={<Gauge className="h-3.5 w-3.5" />}
                />
                <SpecRow label="Couleur ext." value={vehicle.color} />
                {vehicle.interiorColor && (
                  <SpecRow label="Couleur int." value={vehicle.interiorColor} />
                )}
                {vehicle.doors && (
                  <SpecRow label="Portes" value={`${vehicle.doors} portes`} />
                )}
                {vehicle.seats && (
                  <SpecRow label="Places" value={`${vehicle.seats} places`} />
                )}
                {vehicle.acceleration && (
                  <SpecRow
                    label="0–100 km/h"
                    value={`${vehicle.acceleration} s`}
                  />
                )}
                {vehicle.topSpeed && (
                  <SpecRow
                    label="Vitesse max"
                    value={`${vehicle.topSpeed} km/h`}
                  />
                )}
                {vehicle.autonomy && (
                  <SpecRow
                    label="Autonomie"
                    value={`${vehicle.autonomy} km`}
                    icon={<Zap className="h-3.5 w-3.5" />}
                  />
                )}
                <SpecRow
                  label="Numéro châssis"
                  value={vehicle.chassisNumber ?? "Sur demande"}
                />
              </div>
            </div>

            {/* Features / Équipements */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="mt-6 bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6">
                <h2 className="font-semibold text-[0.9rem] mb-4">
                  Équipements & Options
                </h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f) => (
                    <FeaturePill key={f} label={f} />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {vehicle.description && (
              <div className="mt-6 bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6">
                <h2 className="font-semibold text-[0.9rem] mb-3">
                  Description
                </h2>
                <p className="text-[0.88rem] text-(--muted) leading-[1.8] whitespace-pre-wrap">
                  {vehicle.description}
                </p>
              </div>
            )}
          </div>

          {/* ── Right: Info + CTA ────────────────────── */}
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
            <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-7 space-y-5">
              {/* Make + Name */}
              <div>
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.15em] text-(--gold) mb-1.5">
                  {vehicle.make}
                </p>
                <h1 className="font-display text-[clamp(2rem,5vw,2.8rem)] tracking-[0.03em] leading-none mb-1">
                  {vehicle.model}
                  {vehicle.variant && (
                    <span className="font-sans text-[0.82rem] text-(--muted) tracking-normal ml-2 align-middle">
                      {vehicle.variant}
                    </span>
                  )}
                </h1>
                <p className="font-mono text-[0.82rem] text-(--dim)">
                  {vehicle.year} · {typeLabel} · {vehicle.color}
                </p>
              </div>

              {/* Price box */}
              <div className="bg-(--bg-3) border border-(--border-2) rounded-(--r-lg) p-5">
                <PriceTag
                  price={vehicle.price}
                  comparePrice={vehicle.comparePrice ?? undefined}
                  size="lg"
                  label="Prix de vente TTC"
                />
                <p className="text-[0.72rem] text-(--dim) mt-2">
                  Toutes taxes et frais de dédouanement inclus
                </p>
              </div>

              {/* Status badges */}
              <div className="flex flex-wrap gap-2">
                <CountryBadge
                  country={vehicle.originCountry}
                  size="md"
                  variant="full"
                />
                <VehicleStatusPill status={vehicle.status} />
                {vehicle.customsCleared && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold border bg-[rgba(201,168,76,0.1)] text-(--gold) border-[rgba(201,168,76,0.3)]">
                    <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                    Dédouané
                  </span>
                )}
              </div>

              {/* Quick info */}
              <div className="space-y-2.5 text-[0.82rem]">
                <div className="flex items-center gap-2.5">
                  <MapPin
                    className="h-4 w-4 text-(--dim) shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-(--muted)">Importé depuis</span>
                  <span className="ml-auto font-medium">
                    {country.flag} {country.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar
                    className="h-4 w-4 text-(--dim) shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-(--muted)">Délai de livraison</span>
                  <span className="ml-auto font-medium">4–8 semaines</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Gauge
                    className="h-4 w-4 text-(--dim) shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-(--muted)">Kilométrage</span>
                  <span className="ml-auto font-mono font-medium">
                    {formatMileage(vehicle.mileage)}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-(--border)" aria-hidden="true" />

              {/* CTAs */}
              <div className="space-y-2.5">
                <WhatsAppButton
                  vehicleMake={vehicle.make}
                  vehicleModel={vehicle.model}
                  vehicleYear={vehicle.year}
                  vehicleUrl={vehicleUrl}
                  size="md"
                  fullWidth
                />
                <Link
                  href={`/contact?vehicle=${encodeURIComponent(vehicleName)}`}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-(--r) bg-(--gold) border border-(--gold) text-(--bg) text-[0.8rem] font-medium uppercase tracking-wider transition-all hover:bg-(--gold-2) hover:border-(--gold-2)"
                >
                  Demander un devis gratuit
                </Link>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 border border-(--border-2) rounded-(--r) text-[0.8rem] font-medium uppercase tracking-wider text-(--muted) hover:text-(--text) hover:border-(--border) transition-all"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Appeler directement
                </a>
              </div>

              {/* Trust note */}
              <p className="text-[0.7rem] text-(--dim) text-center leading-[1.6]">
                Réponse sous 24h &nbsp;·&nbsp; Devis sans engagement
                &nbsp;·&nbsp; Paiement sécurisé
              </p>
            </div>

            {/* Cost estimator card */}
            <div className="mt-4 bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-5">
              <h3 className="font-semibold text-[0.85rem] mb-3">
                Coût estimatif total
              </h3>
              <div className="space-y-2 text-[0.82rem]">
                <div className="flex justify-between">
                  <span className="text-(--muted)">Prix véhicule</span>
                  <span className="font-mono">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-(--muted)">Transport estimé</span>
                  <span className="font-mono text-(--dim)">Sur devis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-(--muted)">Dédouanement</span>
                  <span className="font-mono text-(--dim)">Sur devis</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-(--border) font-medium">
                  <span>Total estimé</span>
                  <span className="font-mono text-(--gold)">
                    {formatPrice(Math.round(vehicle.price * 1.15))}
                    +
                  </span>
                </div>
              </div>
              <p className="text-[0.68rem] text-(--dim) mt-2 leading-[1.6]">
                * Estimation basée sur +15%. Le devis précis dépend du pays de
                destination.
              </p>
            </div>
          </div>
        </div>

        {/* ── Similar vehicles ────────────────────────── */}
        <Suspense
          fallback={
            <div className="mt-16 pt-16 border-t border-(--border)">
              <VehicleGridSkeleton count={3} />
            </div>
          }
        >
          <SimilarVehicles vehicleId={vehicle.id} type={vehicle.type} />
        </Suspense>
      </div>
    </div>
  );
}
