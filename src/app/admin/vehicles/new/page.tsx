import { VehicleForm } from "@/features/vehicles/components/vehicle-form";

export default function NewVehiclePage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
          AJOUTER UN VÉHICULE
        </h1>
        <p className="text-[0.82rem] text-(--muted) mt-1">
          Remplissez les informations étape par étape
        </p>
      </header>
      <VehicleForm />
    </div>
  );
}
