import * as React from "react";

import { cn } from "@/lib/utils";

export type NavPillItem = { readonly label: string; readonly href: string };

export type NavPillProps = React.HTMLAttributes<HTMLElement> & {
  items: readonly NavPillItem[];
  /** `href` de la section actuellement à l'écran. */
  activeHref?: string;
  label?: string;
};

/**
 * Barre de navigation en gélule, séparateurs verticaux compris.
 * Purement présentationnelle : le suivi de la section active est calculé par
 * l'appelant et transmis via `activeHref`.
 */
export const NavPill = React.forwardRef<HTMLElement, NavPillProps>(
  function NavPill(
    { items, activeHref, label = "Navigation principale", className, ...props },
    ref,
  ) {
    return (
      <nav
        {...props}
        ref={ref}
        aria-label={label}
        className={cn(
          "flex items-center rounded-pill bg-surface-strong p-1.5 text-sm text-fg-secondary",
          // Les quatre libellés dépassent la largeur d'un petit écran. Le
          // <body> masquant le débordement horizontal, le dernier lien
          // deviendrait inatteignable : on rend la gélule défilable plutôt
          // que de la laisser déborder. L'apparence est inchangée dès que la
          // place suffit.
          "max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 ? (
              <span
                aria-hidden
                className="block h-5 w-px shrink-0 bg-line-divider"
              />
            ) : null}
            <a
              href={item.href}
              aria-current={activeHref === item.href ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-pill px-[18px] py-[11px] whitespace-nowrap transition-colors",
                activeHref === item.href ? "bg-ink text-neon" : "hover:text-fg",
              )}
            >
              {item.label}
            </a>
          </React.Fragment>
        ))}
      </nav>
    );
  },
);
