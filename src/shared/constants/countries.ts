import type { Country } from "@generated/prisma/enums";

export type { Country };

export interface CountryInfo {
  code: Country;
  name: string;
  flag: string;
  continent: string;
  currency: string;
  description: string;
  highlights: string[];
  active: boolean;
}

export const COUNTRIES: CountryInfo[] = [
  {
    code: "CHINA",
    name: "Chine",
    flag: "🇨🇳",
    continent: "Asie",
    currency: "CNY",
    description:
      "SUV, berlines et véhicules récents avec un excellent rapport équipement-prix.",
    highlights: ["BYD", "NIO", "SAIC", "Geely", "Haval"],
    active: true,
  },
  {
    code: "DUBAI",
    name: "Dubai / EAU",
    flag: "🇦🇪",
    continent: "Moyen-Orient",
    currency: "AED",
    description:
      "Source intéressante pour les SUV, 4x4 et véhicules bien équipés.",
    highlights: ["Land Rover", "Mercedes AMG", "BMW M", "Porsche", "Ferrari"],
    active: true,
  },
  {
    code: "JAPAN",
    name: "Japon",
    flag: "🇯🇵",
    continent: "Asie",
    currency: "JPY",
    description:
      "Marché reconnu pour les véhicules fiables, durables et bien entretenus.",
    highlights: ["Toyota", "Lexus", "Honda", "Nissan", "Subaru"],
    active: true,
  },
  {
    code: "GERMANY",
    name: "Allemagne",
    flag: "🇩🇪",
    continent: "Europe",
    currency: "EUR",
    description:
      "Berlines, SUV et véhicules européens avec historique et finition soignée.",
    highlights: ["BMW", "Mercedes-Benz", "Audi", "Porsche", "Volkswagen"],
    active: true,
  },
  {
    code: "SOUTH_KOREA",
    name: "Corée du Sud",
    flag: "🇰🇷",
    continent: "Asie",
    currency: "KRW",
    description:
      "Hyundai, Kia et Genesis récents, appréciés pour leur fiabilité et leur confort.",
    highlights: ["Hyundai", "Kia", "Genesis"],
    active: true,
  },
  {
    code: "FRANCE",
    name: "France",
    flag: "🇫🇷",
    continent: "Europe",
    currency: "EUR",
    description:
      "Citadines, berlines et SUV européens adaptés aux budgets variés.",
    highlights: ["Peugeot", "Renault", "Citroën", "DS", "Alpine"],
    active: true,
  },
  {
    code: "USA",
    name: "États-Unis",
    flag: "🇺🇸",
    continent: "Amérique du Nord",
    currency: "USD",
    description:
      "Pickups, SUV familiaux et modèles robustes pour les usages exigeants.",
    highlights: ["Ford", "Chevrolet", "Dodge", "Cadillac", "Tesla"],
    active: true,
  },
  {
    code: "EUROPE",
    name: "Europe",
    flag: "🇪🇺",
    continent: "Europe",
    currency: "EUR",
    description:
      "Sélection multi-pays pour élargir les options selon le budget et le modèle recherché.",
    highlights: ["Ferrari", "Lamborghini", "Jaguar", "Volvo", "Alfa Romeo"],
    active: true,
  },
];

export const COUNTRY_MAP = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
) as Record<Country, CountryInfo>;

export function getCountryInfo(code: Country): CountryInfo {
  return COUNTRY_MAP[code] ?? COUNTRIES[0]!;
}

export function getCountryName(code: Country): string {
  return COUNTRY_MAP[code]?.name ?? code;
}

export function getCountryFlag(code: Country): string {
  return COUNTRY_MAP[code]?.flag ?? "🌍";
}

export function getCountryOptionLabel(code: Country): string {
  const country = getCountryInfo(code);
  return `${country.flag} ${country.name}`;
}
