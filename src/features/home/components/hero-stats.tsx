import { memo } from "react";
import { Stat } from "../types/hero";

const fadeUp = (delayMs: number): React.CSSProperties => ({
  animation: "hero-fade-up 0.7s ease-out both",
  animationDelay: `${delayMs}ms`,
});

export const StatItem = memo(function StatItem({
  value,
  label,
  index,
}: Stat & { index: number }) {
  return (
    <div style={fadeUp(700 + index * 120)}>
      <p className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">
        {label}
      </p>
    </div>
  );
});
