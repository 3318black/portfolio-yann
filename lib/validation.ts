import { z } from "zod";

/**
 * Valeurs du `<select>` de la section contact. La maquette proposait
 * « Stage / Alternance / Mission ponctuelle » ; la liste couvre désormais les
 * trois formats réellement recherchés.
 */
export const CONTACT_SUBJECTS = [
  "Poste (CDI/CDD)",
  "Alternance",
  "Mission freelance",
  "Autre",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

/**
 * Schéma unique du formulaire de contact, importé par le composant client
 * **et** par la route API. Le serveur revalide systématiquement : la
 * validation du navigateur est un confort d'usage, jamais une garantie.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Votre nom doit contenir au moins 2 caractères.")
    .max(80, "Votre nom ne peut pas dépasser 80 caractères."),
  email: z
    .email("Adresse email invalide.")
    .max(160, "Cette adresse est trop longue."),
  subject: z.enum(CONTACT_SUBJECTS, {
    error: "Choisissez un sujet dans la liste.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre besoin en quelques mots (20 caractères minimum).")
    .max(2000, "Merci de rester sous 2000 caractères."),
  /**
   * Leurre anti-spam : invisible pour un humain, souvent rempli par les robots.
   * Il n'est volontairement soumis à aucune contrainte ici — le traitement se
   * fait côté serveur, pour ne rien apprendre au robot sur la raison du rejet.
   */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
