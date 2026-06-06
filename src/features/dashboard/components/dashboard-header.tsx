export function DashboardHeader() {
  const now = new Date();

  return (
    <header>
      <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
        DASHBOARD
      </h1>
      <p className="text-[0.82rem] text-(--muted) mt-1">
        Bienvenue -{" "}
        {now.toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </header>
  );
}
