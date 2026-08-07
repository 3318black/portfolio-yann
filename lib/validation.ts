import { z } from "zod";

import type { ContactContent } from "@/content/types";

/**
 * Clés de sujet du formulaire.
 *
 * Volontairement neutres et non traduites : c'est la valeur transmise au
 * serveur. Un libellé traduit y suffirait à casser la validation dès que le
 * visiteur change de langue. La correspondance clé → libellé affiché vit dans
 * `contact.subjectLabels` de chaque fichier de langue.
 */
export const CONTACT_SUBJECTS = [
  "job",
  "apprenticeship",
  "freelance",
  "other",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

/** Libellés français, utilisés dans l'email de notification. */
export const SUBJECT_LABELS_FR: Record<ContactSubject, string> = {
  job: "Poste (CDI/CDD)",
  apprenticeship: "Alternance",
  freelance: "Mission freelance",
  other: "Autre",
};

type ValidationMessages = ContactContent["validation"];

/** Messages par défaut, utilisés côté serveur pour les journaux. */
const DEFAULT_MESSAGES: ValidationMessages = {
  nameMin: "Votre nom doit contenir au moins 2 caractères.",
  nameMax: "Votre nom ne peut pas dépasser 80 caractères.",
  emailInvalid: "Adresse email invalide.",
  emailMax: "Cette adresse est trop longue.",
  subjectInvalid: "Choisissez un sujet dans la liste.",
  messageMin: "Décrivez votre besoin en quelques mots (20 caractères minimum).",
  messageMax: "Merci de rester sous 2000 caractères.",
};

/**
 * Construit le schéma du formulaire de contact.
 *
 * Une fonction plutôt qu'une constante : le navigateur passe les messages de
 * sa langue, le serveur garde les messages par défaut. Les **règles**, elles,
 * sont identiques des deux côtés — c'est ce qui compte, la validation du
 * navigateur n'étant qu'un confort d'usage.
 */
export function buildContactSchema(
  messages: ValidationMessages = DEFAULT_MESSAGES,
) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMin).max(80, messages.nameMax),
    email: z.email(messages.emailInvalid).max(160, messages.emailMax),
    subject: z.enum(CONTACT_SUBJECTS, { error: messages.subjectInvalid }),
    message: z
      .string()
      .trim()
      .min(20, messages.messageMin)
      .max(2000, messages.messageMax),
    /**
     * Leurre anti-spam : invisible pour un humain, souvent rempli par les
     * robots. Il n'est volontairement soumis à aucune contrainte ici — le
     * traitement se fait côté serveur, pour ne rien apprendre au robot sur la
     * raison du rejet.
     */
    company: z.string().optional(),
  });
}

/** Schéma serveur, messages français. */
export const contactSchema = buildContactSchema();

export type ContactInput = z.infer<typeof contactSchema>;
