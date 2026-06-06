import { RequestStatus, VehicleStatus } from "@generated/prisma/enums";

export function createVehicleStatusCountMap() {
  return Object.fromEntries(
    Object.values(VehicleStatus).map((status) => [status, 0]),
  ) as Record<VehicleStatus, number>;
}

export function createRequestStatusCountMap() {
  return Object.fromEntries(
    Object.values(RequestStatus).map((status) => [status, 0]),
  ) as Record<RequestStatus, number>;
}
