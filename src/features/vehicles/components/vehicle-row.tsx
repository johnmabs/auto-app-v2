import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

import { formatPrice, formatMileage, formatDate } from "@/lib/utils";
import { getCountryOptionLabel } from "@/shared/constants/countries";

import type { VehicleListItem } from "../types/vehicle.types";
import VehicleStatusPill from "./vehicle-status-pill";
import VehicleImage from "./vehicle-image";
import DeleteVehicleButton from "./delete-vehicle-button";

export default function VehicleRow({ vehicle }: { vehicle: VehicleListItem }) {
  return (
    <tr className="border-t border-(--border) hover:bg-(--bg-3) group">
      {/* Photo */}
      <td className="px-4 py-3">
        <VehicleImage
          src={vehicle.images[0]?.url}
          alt={`${vehicle.make} ${vehicle.model}`}
        />
      </td>

      {/* Véhicule */}
      <td className="px-4 py-3">
        <p className="font-medium text-[0.85rem] whitespace-nowrap">
          {vehicle.make} {vehicle.model}
        </p>
        {vehicle.variant && (
          <p className="text-[0.72rem] text-(--dim)">{vehicle.variant}</p>
        )}
      </td>

      {/* Année */}
      <td className="px-4 py-3 font-mono text-[0.82rem] text-(--muted)">
        {vehicle.year}
      </td>

      {/* Prix */}
      <td className="px-4 py-3 font-mono text-[0.85rem] text-(--gold) whitespace-nowrap">
        {formatPrice(vehicle.price)}
      </td>

      {/* Km */}
      <td className="px-4 py-3 font-mono text-[0.78rem] text-(--muted) whitespace-nowrap">
        {formatMileage(vehicle.mileage)}
      </td>

      {/* Pays */}
      <td className="px-4 py-3 text-[0.82rem]">
        {getCountryOptionLabel(vehicle.originCountry)}
      </td>

      {/* Statut */}
      <td className="px-4 py-3">
        <VehicleStatusPill status={vehicle.status} />
      </td>

      {/* Demandes */}
      <td className="px-4 py-3 text-center font-mono text-[0.82rem]">
        {vehicle._count.requests > 0 ? (
          <span className="text-(--gold)">{vehicle._count.requests}</span>
        ) : (
          <span className="text-(--dim)">0</span>
        )}
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-[0.75rem] text-(--dim) whitespace-nowrap">
        {formatDate(vehicle.createdAt, "short")}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <Link
            href={`/vehicles/${vehicle.slug}`}
            target="_blank"
            className="h-7 w-7 flex items-center justify-center rounded-(--r) border border-(--border) text-(--muted) hover:text-(--text) hover:border-(--border-2) transition-all"
            aria-label="Voir la fiche publique"
            title="Voir"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>

          <Link
            href={`/admin/vehicles/${vehicle.id}/edit`}
            className="h-7 w-7 flex items-center justify-center rounded-(--r) border border-(--border) text-(--muted) hover:text-(--gold) hover:border-(--gold) transition-all"
            aria-label={`Modifier ${vehicle.make} ${vehicle.model}`}
            title="Modifier"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Link>

          <DeleteVehicleButton
            id={vehicle.id}
            label={`${vehicle.make} ${vehicle.model}`}
          />
        </div>
      </td>
    </tr>
  );
}
