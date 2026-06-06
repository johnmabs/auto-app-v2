import { getRecentVehicles } from "@/features/vehicles/data/vehicle.queries";
import VehicleCard from "@/features/vehicles/components/vehicle-card";

export default async function RecentVehicles() {
  const vehicles = await getRecentVehicles(6);

  if (vehicles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 3} />
      ))}
    </div>
  );
}
