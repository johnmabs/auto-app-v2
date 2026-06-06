import Link from "next/link";
import { Suspense } from "react";
import { Download, Plus } from "lucide-react";
import { VehicleFilters } from "@/features/vehicles/components/vehicle-filters";
import { VehicleStats } from "@/features/vehicles/components/vehicle-stats";
import { VehiclesTable } from "@/features/vehicles/components/vehicles-table";
import { vehicleFiltersSchema } from "@/features/vehicles/schemas/vehicle-filters.schema";
import { TableSkeleton } from "@/shared/ui/skeleton";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function PageHeader() {
  return (
    <header className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
          VÉHICULES
        </h1>
        <p className="text-[0.82rem] text-(--muted) mt-1">
          Gestion complète du catalogue
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 h-9 px-4 rounded-(--r) border border-(--border) text-(--muted) text-[0.78rem] hover:border-(--border-2) transition-all">
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Exporter CSV
        </button>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center gap-2 h-9 px-5 rounded-(--r) bg-(--gold) text-(--bg) text-[0.8rem] font-semibold uppercase tracking-wider hover:bg-(--gold-2) transition-colors"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Ajouter
        </Link>
      </div>
    </header>
  );
}

export default async function Page({ searchParams }: Props) {
  const filters = vehicleFiltersSchema.parse(await searchParams);

  return (
    <main className="space-y-6 max-w-350">
      {/* Header */}
      <PageHeader />

      {/* Stats */}
      <Suspense
        fallback={
          <div className="grid grid-cols-5 gap-3 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 skeleton rounded-(--r-lg)" />
            ))}
          </div>
        }
      >
        <VehicleStats />
      </Suspense>

      <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) overflow-hidden">
        <VehicleFilters />

        <Suspense
          key={JSON.stringify(filters)}
          fallback={
            <table className="w-full">
              <TableSkeleton rows={10} cols={10} />
            </table>
          }
        >
          <VehiclesTable filters={filters} />
        </Suspense>
      </div>
    </main>
  );
}
