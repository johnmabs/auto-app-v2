import { getVehicles } from "../data/vehicle.queries";
import type { VehicleFilters } from "../types/vehicle-form.types";
import { VehiclePagination } from "./vehicle-pagination";
import VehicleRow from "./vehicle-row";

const VEHICLES_PER_PAGE = 10;

export async function VehiclesTable({ filters }: { filters: VehicleFilters }) {
  const page = filters.page ?? 1;
  const result = await getVehicles({
    search: filters.search,
    status: filters.status,
    page,
    limit: filters.limit ?? VEHICLES_PER_PAGE,
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse"
          aria-label="Liste des véhicules"
        >
          <thead>
            <tr className="bg-(--bg-3) border-b border-(--border)">
              {[
                "Photo",
                "Véhicule",
                "Année",
                "Prix",
                "Km",
                "Pays",
                "Statut",
                "Demandes",
                "Ajouté",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[0.66rem] font-medium uppercase tracking-widest text-(--dim) whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.items.map((vehicle) => (
              <VehicleRow key={vehicle.id} vehicle={vehicle} />
            ))}
          </tbody>
        </table>
      </div>

      <VehiclePagination
        page={page}
        total={result.total}
        limit={filters.limit ?? VEHICLES_PER_PAGE}
        search={filters.search}
        status={filters.status}
      />
    </>
  );
}
