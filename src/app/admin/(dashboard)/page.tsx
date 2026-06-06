import type { Metadata } from "next";
import { DashboardCountryChart } from "@/features/dashboard/components/dashboard-country-chart";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DashboardKPIs } from "@/features/dashboard/components/dashboard-kpis";
import { DashboardQuickActions } from "@/features/dashboard/components/dashboard-quick-actions";
import { DashboardRecentRequests } from "@/features/dashboard/components/dashboard-recent-requests";
import { DashboardSalesChart } from "@/features/dashboard/components/dashboard-sales-chart";
import { getDashboardData } from "@/features/dashboard/data/dashboard.queries";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <main className="space-y-6 max-w-350">
      <DashboardHeader />
      <DashboardQuickActions />
      <DashboardKPIs data={data} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <DashboardSalesChart data={data} />
        <DashboardCountryChart data={data} />
      </div>
      <DashboardRecentRequests data={data} />
    </main>
  );
}
