import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <section className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6">
      <div className="mb-5">
        <h2 className="font-medium text-[0.9rem]">{title}</h2>
        <p className="text-[0.75rem] text-(--muted) mt-0.5">{description}</p>
      </div>
      {children}
    </section>
  );
}
