import type { Stat, TrustBadge } from "../types/hero";

export const STATS: Stat[] = [
  { value: "35+", label: "Véhicules importés" },
  { value: "8", label: "Pays sources" },
  { value: "2023", label: "Depuis" },
];

export const TRUST_BADGES: TrustBadge[] = [
  { icon: "✦", text: "Inspection avant achat" },
  { icon: "✦", text: "Devis détaillé" },
  { icon: "✦", text: "Suivi jusqu'au Congo" },
];

export const FEATURED_CAR = {
  name: "Toyota RAV4 Hybrid",
  price: "18\u00a0500\u00a0000 FCFA",
  imageUrl:
    "https://res.cloudinary.com/dqasdhtwp/image/upload/q_auto/f_auto/v1780736450/featured-vhicle-toyota-hybrid_o8n5no.jpg",
  imageAlt: "Toyota RAV4 disponible à l'importation au Congo",
} as const;
