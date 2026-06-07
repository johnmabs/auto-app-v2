import { memo } from "react";

export const RangeInput = memo(function RangeInput({
  label,
  min,
  max,
  value,
  onChange,
  format = (v) => String(v),
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer accent-(--gold)"
      />

      <div className="mt-1 flex justify-between text-[0.68rem] font-mono text-(--dim)">
        <span>{format(min)}</span>

        <span className="font-medium text-(--gold)">{format(value)}</span>

        <span>{format(max)}</span>
      </div>
    </div>
  );
});
