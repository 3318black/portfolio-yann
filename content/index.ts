import { en } from "@/content/en";
import { es } from "@/content/es";
import { fr } from "@/content/fr";
import type { SiteContent } from "@/content/types";

export const LOCALES = ["fr", "en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/** Libellé affiché dans le sélecteur de langue. */
export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
};

/** Nom de la langue dans sa propre langue, pour les attributs d'accessibilité. */
export const LOCALE_NAMES: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};

const CONTENT: Record<Locale, SiteContent> = { fr, en, es };

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type { SiteContent };
