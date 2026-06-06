import { cn } from "@/lib/utils";

const MONTH_LABELS = [
  "Jan",
  "Fev",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Aout",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type SalesBarChartProps = {
  data: {
    month: number;
    count: number;
  }[];
  currentMonth: number;
};

export function SalesBarChart({ data, currentMonth }: SalesBarChartProps) {
  const visibleData = data.slice(0, currentMonth + 1);
  const max = Math.max(...visibleData.map((item) => item.count), 1);

  return (
    <div
      className="flex h-36 items-end gap-2"
      role="img"
      aria-label="Ventes mensuelles"
    >
      {visibleData.map((item) => {
        const isCurrent = item.month === currentMonth;

        return (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn(
                "w-full rounded-t-sm transition-all duration-500",
                isCurrent
                  ? "bg-(--gold)"
                  : item.count > 0
                    ? "bg-[rgba(201,168,76,0.35)]"
                    : "bg-(--bg-3)",
              )}
              style={{
                height: `${(item.count / max) * 100}%`,
                minHeight: item.count > 0 ? "4px" : "0",
              }}
            />
            <span
              className={cn(
                "text-[0.62rem] font-mono whitespace-nowrap",
                isCurrent ? "text-(--gold)" : "text-(--dim)",
              )}
            >
              {MONTH_LABELS[item.month]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
