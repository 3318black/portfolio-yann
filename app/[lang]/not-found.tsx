import { Button } from "@/components/ui/button";
import { DEFAULT_LOCALE, getContent } from "@/content/index";

/**
 * Page 404 de l'espace de langue.
 *
 * Deux limites, mesurées et assumées :
 *
 * 1. `not-found.tsx` ne reçoit pas les paramètres de route — elle s'affiche
 *    donc toujours dans la langue par défaut.
 * 2. Elle ne se rend que pour un `notFound()` levé *à l'intérieur* d'un
 *    segment déjà résolu. Une adresse qui ne correspond à aucune route
 *    (`/fr/n-importe-quoi`) retombe sur le document d'erreur global de Next,
 *    lequel n'a pas de mise en page puisque la racine du site vit sous
 *    `[lang]`. Corriger cela imposerait une mise en page racine lisant la
 *    langue dans les en-têtes, donc rendue dynamiquement : perdre la
 *    génération statique des trois pages principales coûterait plus cher que
 *    ce qu'une 404 stylée sur une adresse invalide rapporte.
 */
export default function NotFound() {
  const { ui } = getContent(DEFAULT_LOCALE);

  return (
    <main className="mx-auto flex min-h-screen max-w-[720px] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.1em] text-neon">
        {ui.notFound.code}
      </p>
      <h1 className="mt-4 font-display text-section font-bold">
        {ui.notFound.title}
      </h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-fg-muted">
        {ui.notFound.body}
      </p>
      <Button
        href={`/${DEFAULT_LOCALE}`}
        variant="neon"
        size="caps"
        className="mt-8"
      >
        {ui.notFound.cta}
      </Button>
    </main>
  );
}
