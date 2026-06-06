import db from "@/lib/prisma";
import { VehicleStatus } from "@generated/prisma/enums";
import { createRequestStatusCountMap, createVehicleStatusCountMap } from "../lib/mappers";
import { bucketMonthlyCounts, calculatePercentageChange } from "../lib/metrics";
import type { DashboardData } from "../types/dashboard.types";

export async function getDashboardData(): Promise<DashboardData> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  const [
    vehicleStatusGroups,
    requestStatusGroups,
    recentRequests,
    countryGroups,
    soldThisYear,
    requestsThisMonth,
    requestsLastMonth,
  ] = await Promise.all([
    db.vehicle.groupBy({
      by: ["status"],
      where: {
        deletedAt: null,
      },
      _count: {
        _all: true,
      },
    }),
    db.customerRequest.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
    db.customerRequest.findMany({
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        desiredModel: true,
        budget: true,
        status: true,
        createdAt: true,
      },
    }),
    db.vehicle.groupBy({
      by: ["originCountry"],
      where: {
        deletedAt: null,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _count: {
          originCountry: "desc",
        },
      },
      take: 5,
    }),
    db.vehicle.findMany({
      where: {
        deletedAt: null,
        status: VehicleStatus.SOLD,
        updatedAt: {
          gte: startOfYear,
        },
      },
      select: {
        updatedAt: true,
      },
    }),
    db.customerRequest.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),
    db.customerRequest.count({
      where: {
        createdAt: {
          gte: startOfPreviousMonth,
          lte: endOfPreviousMonth,
        },
      },
    }),
  ]);

  const vehicleStatusCounts = createVehicleStatusCountMap();
  const requestStatusCounts = createRequestStatusCountMap();

  for (const group of vehicleStatusGroups) {
    vehicleStatusCounts[group.status] = group._count._all;
  }

  for (const group of requestStatusGroups) {
    requestStatusCounts[group.status] = group._count._all;
  }

  const monthlySales = bucketMonthlyCounts(soldThisYear.map((sale) => sale.updatedAt));
  const soldThisMonth = monthlySales[now.getMonth()]?.count ?? 0;
  const soldLastMonth = now.getMonth() > 0 ? monthlySales[now.getMonth() - 1]?.count ?? 0 : 0;

  const vehicleCount = Object.values(vehicleStatusCounts).reduce((sum, count) => sum + count, 0);
  const requestCount = Object.values(requestStatusCounts).reduce((sum, count) => sum + count, 0);

  return {
    vehicleCount,
    vehicleStatusCounts,
    requestCount,
    requestStatusCounts,
    recentRequests,
    soldThisMonth,
    soldLastMonth,
    requestsThisMonth,
    requestsLastMonth,
    soldChange: calculatePercentageChange(soldThisMonth, soldLastMonth),
    requestChange: calculatePercentageChange(requestsThisMonth, requestsLastMonth),
    countryStats: countryGroups.map((group) => ({
      originCountry: group.originCountry,
      count: group._count._all,
    })),
    monthlySales,
  };
}
