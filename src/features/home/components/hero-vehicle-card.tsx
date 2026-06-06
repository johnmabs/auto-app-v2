import { memo } from "react";
import Image from "next/image";
import { FEATURED_CAR, TRUST_BADGES } from "../constants/hero";

const TrustBadgeCard = memo(function TrustBadgeCard() {
  return (
    <div
      className="absolute -top-5 -left-4 sm:-left-8 flex flex-col gap-2.5 rounded-2xl border border-white/8 bg-[#13131a]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      style={{ minWidth: 192 }}
    >
      {TRUST_BADGES.map((badge) => (
        <div key={badge.text} className="flex items-center gap-2.5">
          <span aria-hidden="true" className="text-[10px] text-amber-400">
            {badge.icon}
          </span>
          <span className="text-[11px] font-medium text-white/60">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
});

const AvailabilityBadge = memo(function AvailabilityBadge() {
  return (
    <div className="absolute -top-5 -right-4 sm:-right-8 flex items-center gap-3 rounded-2xl border border-white/8 bg-[#13131a]/90 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      <p className="text-[11px] font-medium text-white/60">
        Nouvelles offres disponibles
      </p>
    </div>
  );
});

export const VehicleCard = memo(function VehicleCard() {
  return (
    <div className="relative w-full max-w-165">
      {/* Main image */}
      <div className="relative h-85 overflow-hidden rounded-3xl border border-white/[0.07] bg-dark-925 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:h-105 lg:h-130">
        <Image
          alt={FEATURED_CAR.imageAlt}
          className="object-cover object-center"
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, 50vw"
          src={FEATURED_CAR.imageUrl}
        />

        {/* Bottom gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,11,0.85) 0%, transparent 50%)",
          }}
        />

        {/* Vehicle info bar */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/40">
              À la une
            </p>
            <p className="mt-0.5 text-lg font-bold text-white">
              {FEATURED_CAR.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/40">
              À partir de
            </p>
            <p className="mt-0.5 text-lg font-bold text-amber-400">
              {FEATURED_CAR.price}
            </p>
          </div>
        </div>
      </div>

      <TrustBadgeCard />
      <AvailabilityBadge />
    </div>
  );
});
