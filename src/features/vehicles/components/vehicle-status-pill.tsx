import type { VehicleStatus } from "@generated/prisma/enums";
import { VEHICLE_STATUS } from "../constants/vehicle-status";
import { cn } from "@/lib/utils";

export default function VehicleStatusPill({
  status,
}: {
  status: VehicleStatus;
}) {
  const config = VEHICLE_STATUS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold border",
        config.cls,
      )}
    >
      {config.label}
    </span>
  );
}
