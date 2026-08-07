import * as React from "react";

import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_NAMES,
  type Locale,
} from "@/content/index";
import { cn } from "@/lib/utils";

export type LocaleSwitcherProps = {
  current: Locale;
  label: string;
  className?: string;
};

/**
 * Sélecteur de langue.
 *
 * Trois ancres réelles plutôt qu'un menu piloté par JavaScript : le changement
 * de langue fonctionne sans script, chaque version reste indexable, et le
 * visiteur peut ouvrir une langue dans un nouvel onglet.
 *
 * L'en-tête est déjà chargé sur petit écran (portrait, badge, nom, gélule de
 * navigation, bouton contact) : le composant reste donc réduit à trois codes
 * de deux lettres.
 */
export function LocaleSwitcher({
  current,
  label,
  className,
}: LocaleSwitcherProps) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex shrink-0 items-center rounded-pill bg-surface-strong p-1.5 font-mono text-[11px]",
        className,
      )}
    >
      {LOCALES.map((locale, index) => {
        const isCurrent = locale === current;

        return (
          <React.Fragment key={locale}>
            {index > 0 ? (
              <span aria-hidden className="block h-3 w-px bg-line-divider" />
            ) : null}
            <a
              href={`/${locale}`}
              hrefLang={locale}
              lang={locale}
              aria-current={isCurrent ? "true" : undefined}
              title={LOCALE_NAMES[locale]}
              className={cn(
                "rounded-pill px-2.5 py-1.5 transition-colors",
                isCurrent ? "bg-ink text-neon" : "text-fg-muted hover:text-fg",
              )}
            >
              {LOCALE_LABELS[locale]}
            </a>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
