import { cn } from "@/lib/utils";

export function TimelineItem({
  year,
  title,
  desc,
  last,
}: {
  year: string;
  title: string;
  desc: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border border-(--border-2) bg-(--bg-3) flex items-center justify-center shrink-0">
          <span className="font-display text-[0.85rem] text-(--gold)">
            {year.slice(2)}
          </span>
        </div>
        {!last && (
          <div className="w-px flex-1 bg-(--border) mt-2" aria-hidden="true" />
        )}
      </div>
      <div className={cn("pb-8", last && "pb-0")}>
        <p className="text-[0.72rem] uppercase tracking-widest text-(--gold) mb-1">
          {year}
        </p>
        <h3 className="font-semibold text-[0.95rem] mb-1.5">{title}</h3>
        <p className="text-[0.82rem] text-(--muted) leading-[1.7]">{desc}</p>
      </div>
    </div>
  );
}
