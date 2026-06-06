import type { DashboardData } from "../types/dashboard.types";
import { ChartCard } from "./charts/chart-card";
import { SalesBarChart } from "./charts/sales-bar-chart";

export function DashboardSalesChart({ data }: { data: DashboardData }) {
  const now = new Date();

  return (
    <ChartCard
      title={`Ventes mensuelles ${now.getFullYear()}`}
      description="Nombre de vehicules vendus par mois"
    >
      <SalesBarChart data={data.monthlySales} currentMonth={now.getMonth()} />
    </ChartCard>
  );
}
