import { z } from "zod";

export const ContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères.")
    .max(100, "Le prénom est trop long."),
  lastName: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom est trop long."),
  email: z.email("Adresse email invalide.").toLowerCase().trim(),
  phone: z
    .string()
    .trim()
    .min(8, "Le numéro de téléphone est trop court.")
    .max(30, "Le numéro de téléphone est trop long.")
    .regex(/^[+\d\s\-()]+$/, "Format de téléphone invalide."),
  subject: z.string().trim().min(1, "Choisissez un sujet."),
  message: z
    .string()
    .trim()
    .min(20, "Le message doit contenir au moins 20 caractères.")
    .max(5000, "Le message est trop long."),
  honeypot: z.string().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
