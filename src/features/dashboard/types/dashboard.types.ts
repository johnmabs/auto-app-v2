import type { Country, RequestStatus, VehicleStatus } from "@generated/prisma/enums";

export type DashboardRecentRequest = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  desiredModel: string | null;
  budget: number | null;
  status: RequestStatus;
  createdAt: Date;
};

export type DashboardCountryStat = {
  originCountry: Country;
  count: number;
};

export type DashboardMonthlySale = {
  month: number;
  count: number;
};

export type DashboardData = {
  vehicleCount: number;
  vehicleStatusCounts: Record<VehicleStatus, number>;
  requestCount: number;
  requestStatusCounts: Record<RequestStatus, number>;
  recentRequests: DashboardRecentRequest[];
  soldThisMonth: number;
  soldLastMonth: number;
  requestsThisMonth: number;
  requestsLastMonth: number;
  soldChange: number;
  requestChange: number;
  countryStats: DashboardCountryStat[];
  monthlySales: DashboardMonthlySale[];
};
