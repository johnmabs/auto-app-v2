export function TeamCard({
  name,
  role,
  bio,
  initials,
  color,
}: {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
}) {
  return (
    <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4 border border-(--border-2)"
        style={{ background: color }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <h3 className="font-semibold text-[1rem] mb-0.5">{name}</h3>
      <p className="text-[0.72rem] uppercase tracking-[0.08em] text-(--gold) mb-3">
        {role}
      </p>
      <p className="text-[0.82rem] text-(--muted) leading-[1.7]">{bio}</p>
    </div>
  );
}
