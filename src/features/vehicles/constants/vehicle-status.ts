export const VEHICLE_STATUS = {
  AVAILABLE: {
    label: "Disponible",
    cls: "bg-[rgba(46,204,113,0.1)] text-(--green) border-[rgba(46,204,113,0.3)]",
  },

  TRANSIT: {
    label: "En transit",
    cls: "bg-[rgba(52,152,219,0.1)] text-(--blue) border-[rgba(52,152,219,0.3)]",
  },

  RESERVED: {
    label: "Réservé",
    cls: "bg-[rgba(201,168,76,0.1)] text-(--gold) border-[rgba(201,168,76,0.3)]",
  },

  SOLD: {
    label: "Vendu",
    cls: "bg-[rgba(90,88,102,0.2)] text-(--muted) border-[var(--border)]",
  },

  DRAFT: {
    label: "Brouillon",
    cls: "bg-[rgba(90,88,102,0.2)] text-(--dim) border-[var(--border)]",
  },
} as const;

export const STATUS_FILTERS = [
  { value: "all", label: "Tous" },
  { value: "AVAILABLE", label: "Disponibles" },
  { value: "TRANSIT", label: "En transit" },
  { value: "RESERVED", label: "Réservés" },
  { value: "SOLD", label: "Vendus" },
  { value: "DRAFT", label: "Brouillons" },
];
