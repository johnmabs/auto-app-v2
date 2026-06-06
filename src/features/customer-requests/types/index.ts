// src/features/customer-requests/types/index.ts
import type {
  CustomerRequest,
  Vehicle,
  VehicleImage,
  User,
  RequestStatus,
  Country,
} from "@generated/prisma/client";

export type CustomerRequestWithRelations = CustomerRequest & {
  vehicle:
    | (Pick<Vehicle, "id" | "slug" | "make" | "model" | "year"> & {
        images: Pick<VehicleImage, "url" | "alt">[];
      })
    | null;
  assignee: Pick<User, "id" | "name" | "email"> | null;
};

export type CustomerRequestSummary = Pick<
  CustomerRequest,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "status"
  | "createdAt"
  | "vehicleId"
  | "budget"
  | "assignedTo"
>;

export type { RequestStatus, Country };
