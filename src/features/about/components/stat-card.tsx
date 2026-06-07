export function StatCard({
  num,
  label,
  sub,
}: {
  num: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="bg-(--bg-3) border border-(--border) rounded-(--r-lg) p-6 text-center">
      <p className="font-display text-[3rem] text-(--gold) tracking-[0.04em] leading-none mb-2">
        {num}
      </p>
      <p className="font-medium text-[0.9rem] mb-1">{label}</p>
      {sub && <p className="text-[0.75rem] text-(--dim)">{sub}</p>}
    </div>
  );
}
