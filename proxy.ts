import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/index";

/**
 * Détection de langue et redirection.
 *
 * En Next 16, ce fichier s'appelle `proxy.ts` — l'ancien `middleware.ts` a été
 * renommé, et la fonction s'exporte sous le nom `proxy`.
 *
 * L'exemple i18n officiel s'appuie sur `negotiator` et
 * `@formatjs/intl-localematcher`. Pour trois langues, l'analyse de
 * `Accept-Language` tient en quelques lignes : deux dépendances de moins à
 * suivre pour un besoin qui ne les justifie pas.
 */

/**
 * Extrait la langue préférée de l'en-tête `Accept-Language`.
 *
 * Format : `fr-CA,fr;q=0.9,en;q=0.8`. On trie par facteur de qualité — absent
 * vaut 1 — puis on retient la première langue dont le **préfixe** correspond à
 * une locale connue : `fr-CA`, `fr-BE` et `fr` mènent tous à `fr`.
 */
function detectLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const preferences = header
    .split(",")
    .map((part) => {
      const [tag, ...parameters] = part.trim().split(";");
      const quality = parameters
        .map((parameter) => parameter.trim())
        .find((parameter) => parameter.startsWith("q="));

      const parsed = quality ? Number.parseFloat(quality.slice(2)) : 1;

      return {
        tag: (tag ?? "").trim().toLowerCase(),
        // Une valeur `q` illisible ne doit pas propulser la langue en tête.
        quality: Number.isFinite(parsed) ? parsed : 0,
      };
    })
    .filter((preference) => preference.tag.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of preferences) {
    const base = tag.split("-")[0];
    const match = LOCALES.find((locale) => locale === base);
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = detectLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // La route API n'a pas de langue, et les fichiers statiques encore moins.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$).*)",
  ],
};
