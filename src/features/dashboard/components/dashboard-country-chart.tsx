import type { DashboardData } from "../types/dashboard.types";
import { ChartCard } from "./charts/chart-card";
import { CountryDonutChart } from "./charts/country-donut-chart";

export function DashboardCountryChart({ data }: { data: DashboardData }) {
  return (
    <ChartCard
      title="Par pays importation"
      description="Distribution du catalogue"
    >
      <CountryDonutChart data={data.countryStats} />
    </ChartCard>
  );
}
