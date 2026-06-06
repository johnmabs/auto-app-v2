import Link from "next/link";
import type { ReactNode } from "react";
import { Car, Inbox, Package, ShipWheel, TrendingDown, TrendingUp } from "lucide-react";
import { VehicleStatus, RequestStatus } from "@generated/prisma/enums";
import { cn } from "@/lib/utils";
import type { DashboardData } from "../types/dashboard.types";

type KPICardProps = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: ReactNode;
  href?: string;
  color?: "gold" | "green" | "blue" | "accent";
};

const ICON_COLORS: Record<NonNullable<KPICardProps["color"]>, string> = {
  gold: "bg-[rgba(201,168,76,0.1)] text-(--gold)",
  green: "bg-[rgba(46,204,113,0.1)] text-(--green)",
  blue: "bg-[rgba(52,152,219,0.1)] text-(--blue)",
  accent: "bg-[rgba(230,57,70,0.1)] text-(--accent)",
};

function KPICard({
  label,
  value,
  change,
  positive,
  icon,
  href,
  color = "gold",
}: KPICardProps) {
  const card = (
    <div
      className={cn(
        "bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6",
        href && "hover:border-(--border-2) transition-all cursor-pointer",
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <p className="text-[0.72rem] font-medium uppercase tracking-widest text-(--muted)">
          {label}
        </p>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-(--r) text-sm",
            ICON_COLORS[color],
          )}
        >
          {icon}
        </div>
      </div>

      <p className="font-display text-[2.4rem] tracking-[0.03em] leading-none mb-2">
        {value}
      </p>

      <div
        className={cn(
          "flex items-center gap-1.5 text-[0.75rem] font-medium",
          positive ? "text-(--green)" : "text-(--accent)",
        )}
      >
        {positive ? (
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {change}
      </div>
    </div>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block">
      {card}
    </Link>
  );
}

export function DashboardKPIs({ data }: { data: DashboardData }) {
  const soldChange = data.soldChange;
  const requestChange = data.requestChange;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KPICard
        label="Vehicules en stock"
        value={String(data.vehicleStatusCounts[VehicleStatus.AVAILABLE])}
        change={`${data.vehicleCount} total`}
        positive
        icon={<Car className="h-4 w-4" />}
        href="/admin/vehicles"
        color="gold"
      />
      <KPICard
        label="Vendus ce mois"
        value={String(data.soldThisMonth)}
        change={`${soldChange >= 0 ? "+" : ""}${soldChange.toFixed(0)}% vs mois dernier`}
        positive={soldChange >= 0}
        icon={<Package className="h-4 w-4" />}
        color="green"
      />
      <KPICard
        label="Nouvelles demandes"
        value={String(data.requestStatusCounts[RequestStatus.NEW])}
        change={`${data.requestsThisMonth} ce mois`}
        positive={requestChange >= 0}
        icon={<Inbox className="h-4 w-4" />}
        href="/admin/requests"
        color="accent"
      />
      <KPICard
        label="En transit"
        value={String(data.vehicleStatusCounts[VehicleStatus.TRANSIT])}
        change="Importations en cours"
        positive
        icon={<ShipWheel className="h-4 w-4" />}
        color="blue"
      />
    </section>
  );
}
