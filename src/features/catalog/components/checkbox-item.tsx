import { memo } from "react";
import { cn } from "@/lib/utils";

export const CheckboxItem = memo(function CheckboxItem({
  label,
  value,
  checked,
  onChange,
}: {
  label: React.ReactNode;
  value: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(value, e.target.checked)}
        className="h-3.5 w-3.5 cursor-pointer rounded accent-(--gold)"
      />

      <span
        className={cn(
          "flex-1 text-[0.82rem] transition-colors",
          checked
            ? "text-(--text)"
            : "text-(--muted) group-hover:text-(--text)",
        )}
      >
        {label}
      </span>
    </label>
  );
});
