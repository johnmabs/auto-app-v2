import { cn } from "@/lib/utils";
import { getVehicleStats } from "../data/vehicle.queries";
import { VEHICLE_STATUS } from "../lib/vehicle-status";

export async function VehicleStats() {
  const stats = await getVehicleStats();

  return (
    <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) px-4 py-3">
        <p className="font-display text-2xl tracking-wide text-(--text)">
          Total
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.08em] text-(--dim) mt-0.5">
          {stats.total}
        </p>
      </div>
      {Object.entries(stats.byStatus).map(([status, count]) => (
        <div
          key={status}
          className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) px-4 py-3"
        >
          <p
            className={cn(
              "font-display text-2xl tracking-wide",
              VEHICLE_STATUS[status as keyof typeof VEHICLE_STATUS].color,
            )}
          >
            {VEHICLE_STATUS[status as keyof typeof VEHICLE_STATUS].label}
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.08em] text-(--dim) mt-0.5">
            {count}
          </p>
        </div>
      ))}
    </section>
  );
}
