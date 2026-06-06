import { Shield, Star, Truck, Clock, type LucideIcon } from "lucide-react";

type TrustBadge = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const BADGES: TrustBadge[] = [
  {
    icon: Shield,
    title: "Véhicules vérifiés",
    desc: "Contrôle des informations, photos, kilométrage et état avant validation.",
  },
  {
    icon: Truck,
    title: "Importation encadrée",
    desc: "Accompagnement sur l'achat, le transport, les documents et les démarches.",
  },
  {
    icon: Star,
    title: "Transparence des coûts",
    desc: "Devis détaillé incluant achat, transport, taxes, dédouanement et frais locaux.",
  },
  {
    icon: Clock,
    title: "Suivi jusqu'à la livraison",
    desc: "Information régulière jusqu'à l'arrivée du véhicule au Congo.",
  },
];

export default function TrustSection() {
  return (
    <section
      className="py-16 px-6 lg:px-10 bg-[rgba(201,168,76,0.04)] border-y border-(--border)"
      aria-label="Nos engagements"
    >
      <div className="max-w-7xl mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="flex items-start gap-4">
              <div
                className="shrink-0 w-11 h-11 rounded-(--r-lg) bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center"
                aria-hidden="true"
              >
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-(--dim)">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
