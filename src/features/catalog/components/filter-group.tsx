import { cn } from "@/lib/utils";
import { memo, useState } from "react";

export const FilterGroup = memo(function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-(--border) pb-4 last:border-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-(--muted)">
          {title}
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "text-xs text-(--dim) transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          ▾
        </span>
      </button>

      {open && <div className="mt-1 space-y-2">{children}</div>}
    </div>
  );
});
