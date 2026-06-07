import { COMPANY_INFO } from "@/shared/constants/company";

export const ABOUT_STATS = [
  {
    num: COMPANY_INFO.stats.vehiclesImported,
    label: "Véhicules importés",
    sub: "Accompagnés de bout en bout",
  },
  {
    num: String(COMPANY_INFO.stats.countries),
    label: "Pays sources",
    sub: "Asie, Europe, Moyen-Orient et USA",
  },
  {
    num: COMPANY_INFO.stats.satisfaction,
    label: "Clients satisfaits",
    sub: "Suivi et conseil personnalisés",
  },
  {
    num: `${COMPANY_INFO.stats.yearsExperience} ans`,
    label: "D'expérience",
    sub: "Dans l'accompagnement import",
  },
] as const;

export const ABOUT_VALUES = [
  {
    icon: "◌",
    title: "Transparence",
    desc: "Nous détaillons les coûts, les délais et les étapes pour que chaque décision soit claire avant l'achat.",
  },
  {
    icon: "✓",
    title: "Sélection fiable",
    desc: "Chaque véhicule est choisi avec attention selon son état, son historique, son budget et son adaptation aux usages locaux.",
  },
  {
    icon: "↔",
    title: "Accompagnement",
    desc: "De la recherche au dédouanement, notre équipe reste présente pour coordonner les échanges et simplifier les démarches.",
  },
  {
    icon: "↗",
    title: "Réactivité",
    desc: "Nous privilégions des réponses rapides, des devis lisibles et un suivi régulier jusqu'à la livraison.",
  },
] as const;

export const ABOUT_TIMELINE = [
  {
    year: "2023",
    title: "Lancement d'Autostore Congo",
    desc: `Création de ${COMPANY_INFO.name} à Pointe-Noire avec une ambition simple : rendre l'import automobile plus lisible, plus sûr et mieux accompagné.`,
  },
  {
    year: "2024",
    title: "Structuration du réseau",
    desc: `Développement d'un réseau de sourcing dans ${COMPANY_INFO.stats.countries} pays pour couvrir les SUV, berlines, pickups et modèles récents recherchés au Congo.`,
  },
  {
    year: "2025",
    title: "Catalogue et suivi renforcés",
    desc: "Mise en place d'un catalogue plus clair, d'un suivi client plus régulier et d'un accompagnement renforcé sur le transport et le dédouanement.",
  },
  {
    year: "2026",
    title: "Plateforme digitale",
    desc: "Déploiement d'une expérience web dédiée au catalogue, aux demandes personnalisées et au suivi des opportunités disponibles.",
    last: true,
  },
] as const;

export const ABOUT_TEAM = [
  {
    name: "Équipe sourcing",
    role: "Recherche véhicules",
    bio: "Analyse les opportunités, compare les marchés sources et présélectionne les véhicules selon le budget et l'usage attendu.",
    initials: "AS",
    color: "rgba(201,168,76,0.15)",
  },
  {
    name: "Équipe opérations",
    role: "Transport & coordination",
    bio: "Coordonne les étapes logistiques avec les partenaires, du pays d'origine jusqu'à l'arrivée au Congo.",
    initials: "OP",
    color: "rgba(52,152,219,0.15)",
  },
  {
    name: "Support import",
    role: "Dédouanement",
    bio: "Accompagne les démarches administratives pour réduire les zones d'incertitude et anticiper les coûts.",
    initials: "IM",
    color: "rgba(46,204,113,0.15)",
  },
  {
    name: "Relation client",
    role: "Conseil & suivi",
    bio: "Reste le point de contact privilégié pour les devis, les questions et l'avancement des demandes.",
    initials: "RC",
    color: "rgba(230,57,70,0.15)",
  },
] as const;
