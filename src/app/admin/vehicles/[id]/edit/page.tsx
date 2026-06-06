import { notFound } from "next/navigation";
import { VehicleForm } from "@/features/vehicles/components/vehicle-form";
import { getVehicleForEdit } from "@/features/vehicles/data/vehicle.queries";
import { mapVehicleToFormState } from "@/features/vehicles/lib/vehicle-mapper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditVehiclePage({ params }: Props) {
  const { id } = await params;
  const vehicle = await getVehicleForEdit(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <Link
          href="/admin/vehicles"
          className="inline-flex items-center gap-2 text-[0.78rem] text-(--muted) hover:text-(--gold) transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour
        </Link>
        <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
          MODIFIER LE VÉHICULE
        </h1>
        <p className="text-[0.82rem] text-(--muted) mt-1">
          {vehicle.make} {vehicle.model}
        </p>
      </header>
      <VehicleForm
        mode="update"
        vehicleId={vehicle.id}
        initialValues={mapVehicleToFormState(vehicle)}
      />
    </div>
  );
}
