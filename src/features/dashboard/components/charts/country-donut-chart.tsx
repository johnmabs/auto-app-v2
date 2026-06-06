import type { DashboardCountryStat } from "../../types/dashboard.types";

const COUNTRY_COLORS = [
  "var(--gold)",
  "var(--blue)",
  "var(--green)",
  "var(--accent)",
  "var(--muted)",
];

type CountryDonutChartProps = {
  data: DashboardCountryStat[];
};

export function CountryDonutChart({ data }: CountryDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const circumference = 2 * Math.PI * 50;

  const slices = data.reduce<
    Array<DashboardCountryStat & { color: string; dash: number; offset: number; pct: number }>
  >((items, item, index) => {
    const pct = total > 0 ? item.count / total : 0;
    const dash = pct * circumference;
    const offset = items.reduce((sum, slice) => sum + slice.dash, 0);

    return [
      ...items,
      {
        ...item,
        color: COUNTRY_COLORS[index] ?? "var(--dim)",
        dash,
        offset,
        pct,
      },
    ];
  }, []);

  if (total === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-(--dim)">
        Aucune donnee disponible
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-35 w-35">
        <svg
          viewBox="0 0 120 120"
          width="140"
          height="140"
          role="img"
          aria-label="Repartition par pays importation"
        >
          {slices.map((slice) => (
            <circle
              key={slice.originCountry}
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={slice.color}
              strokeWidth="16"
              strokeDasharray={`${slice.dash} ${circumference - slice.dash}`}
              strokeDashoffset={-slice.offset}
              transform="rotate(-90 60 60)"
            />
          ))}
          <circle cx="60" cy="60" r="40" fill="var(--bg-2)" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-[1.8rem] text-(--gold)">{total}</span>
          <span className="text-[0.6rem] uppercase tracking-[0.08em] text-(--dim)">
            Total
          </span>
        </div>
      </div>

      <ul className="w-full space-y-1.5">
        {slices.map((slice) => (
          <li key={slice.originCountry} className="flex items-center gap-2 text-[0.75rem]">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: slice.color }}
              aria-hidden="true"
            />
            <span className="flex-1 text-(--muted)">{slice.originCountry}</span>
            <span className="font-mono text-(--dim)">
              {Math.round(slice.pct * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
