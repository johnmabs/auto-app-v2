import Link from "next/link";

type Props = {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  sub?: string;
};

export function ContactCard({ icon, title, value, href, sub }: Props) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-(--r-lg) bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.18)] flex items-center justify-center text-(--gold) shrink-0">
        {icon}
      </div>

      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.08em] text-(--dim) mb-0.5">
          {title}
        </p>

        <p className="text-[0.9rem] font-medium">{value}</p>

        {sub && <p className="text-[0.75rem] text-(--muted) mt-0.5">{sub}</p>}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block hover:opacity-80 transition-opacity">
      {content}
    </Link>
  );
}
