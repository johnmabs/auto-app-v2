export const VEHICLE_STATUS = {
  AVAILABLE: {
    label: "Disponible",
    color: "text-(--green)",
  },

  TRANSIT: {
    label: "En transit",
    color: "text-(--blue)",
  },

  RESERVED: {
    label: "Réservé",
    color: "text-(--gold)",
  },

  SOLD: {
    label: "Vendu",
    color: "text-(--muted)",
  },

  DRAFT: {
    label: "Brouillon",
    color: "text-(--dim)",
  },
} as const;
