import { getFeaturedVehicles } from "@/features/vehicles/data/vehicle.queries";
import VehicleCard from "@/features/vehicles/components/vehicle-card";

export default async function FeaturedVehicles() {
    const vehicles = await getFeaturedVehicles();

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    );
}