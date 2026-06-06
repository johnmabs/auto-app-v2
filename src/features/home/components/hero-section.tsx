import Link from "next/link";
import { memo } from "react";
import { StatItem } from "./hero-stats";
import { STATS } from "../constants/hero";
import { VehicleCard } from "./hero-vehicle-card";
import SearchBar from "./hero-search-bar";

const fadeUp = (delayMs: number): React.CSSProperties => ({
  animation: "hero-fade-up 0.7s ease-out both",
  animationDelay: `${delayMs}ms`,
});

const fadeLeft = (delayMs: number): React.CSSProperties => ({
  animation: "hero-fade-left 1s ease-out both",
  animationDelay: `${delayMs}ms`,
});

const NoiseOverlay = memo(function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-1 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
});

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      aria-label="Présentation Autostore Congo"
      className="relative min-h-3/4 w-full overflow-hidden bg-gradient-hero pt-10"
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-175 w-175 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-60 right-0 h-150 w-150 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
        }}
      />

      <NoiseOverlay />

      {/* Top accent line — FIX: replaced left-0 right-0 with inset-x-0 */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(251,191,36,0.3), transparent)",
        }}
      />

      {/* Main grid */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-350 grid-cols-1 gap-0 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-0">
        {/* LEFT: Copy */}
        <div className="flex flex-col justify-center lg:py-24">
          {/* Certified importer badge */}
          <div
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2"
            style={fadeUp(100)}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-amber-400"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Spécialiste import auto au Congo
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-6 font-display text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1.06] tracking-[-0.03em] text-(--text)"
            style={fadeUp(200)}
          >
            IMPORTATION{" "}
            <span
              className="relative inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #fbbf24 20%, #f59e0b 60%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DE VÉHICULES
            </span>{" "}
            <br className="hidden sm:block" />
            AU CONGO-BRAZZAVILLE
          </h1>

          {/* Sub-copy */}
          <p
            className="mb-10 max-w-md text-base leading-relaxed text-(--text)"
            style={fadeUp(300)}
          >
            Achetez votre véhicule à l&apos;étranger en toute confiance. Nous
            vous accompagnons de la recherche du modèle jusqu&apos;au
            dédouanement et à la livraison au Congo.
          </p>

          {/* CTA buttons */}
          <div className="mb-10 flex flex-wrap gap-4" style={fadeUp(400)}>
            <Link
              href="/catalog"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-amber-400 px-7 py-4 text-sm font-bold tracking-wide text-zinc-900 transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_40px_rgba(251,191,36,0.35)] active:scale-95"
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full"
              />
              <span>Voir les véhicules disponibles</span>
              <ArrowIcon />
            </Link>

            <a
              href="#devis"
              className="group inline-flex items-center gap-2 rounded-2xl border border-(--border) bg-(--bg-2) px-7 py-4 text-sm font-semibold tracking-wide text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-(--border-2) hover:bg-(--bg-4) hover:text-white active:scale-95"
            >
              <span>Demander un devis d&apos;importation</span>
              <ArrowIcon className="opacity-50 group-hover:opacity-100" />
            </a>
          </div>

          {/* Search bar */}
          <div className="mb-12" style={fadeUp(500)}>
            <SearchBar />
          </div>

          {/* Stats */}
          <div
            className="flex items-start gap-10 border-t border-white/[0.07] pt-8"
            style={fadeUp(600)}
          >
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>

        {/* RIGHT: Vehicle visual */}
        <div
          className="relative flex items-center justify-center lg:py-16"
          style={fadeLeft(300)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.07) 0%, transparent 65%)",
            }}
          />
          <VehicleCard />
        </div>
      </div>
    </section>
  );
}
