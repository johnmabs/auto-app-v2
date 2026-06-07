export function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="shrink-0 w-12 h-12 rounded-(--r-lg) bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.18)] flex items-center justify-center text-xl"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[0.95rem] mb-1.5">{title}</h3>
        <p className="text-[0.82rem] text-(--muted) leading-[1.7]">{desc}</p>
      </div>
    </div>
  );
}
