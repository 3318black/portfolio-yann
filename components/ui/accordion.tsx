"use client";

import * as React from "react";

import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type AccordionItem = { readonly title: string; readonly body: string };

export type AccordionProps = {
  items: readonly AccordionItem[];
  /** Index de l'entrée ouverte au chargement. `-1` pour tout replier. */
  defaultOpen?: number;
  /** `default` pour la section Compétences, `compact` pour la FAQ. */
  size?: "default" | "compact";
  className?: string;
};

const SIZES = {
  default: {
    row: "py-5",
    summary: "text-[15px] tracking-[0.07em]",
    body: "mt-3.5 text-sm leading-[1.65]",
  },
  compact: {
    row: "py-[18px]",
    summary: "text-sm tracking-[0.06em]",
    body: "mt-3 text-sm leading-[1.65]",
  },
} as const;

/**
 * Accordéon bâti sur `<details>/<summary>`.
 *
 * Le repli natif du navigateur reste la source de vérité : sans JavaScript,
 * l'accordéon fonctionne et le contenu est accessible aux moteurs de
 * recherche. GSAP ne fait qu'animer la hauteur par-dessus ce comportement.
 */
export function Accordion({
  items,
  defaultOpen = -1,
  size = "default",
  className,
}: AccordionProps) {
  const styles = SIZES[size];
  const rootRef = React.useRef<HTMLDivElement>(null);
  const animate = React.useRef(false);

  // Chaque `<details>` s'ouvre indépendamment, comme dans la maquette : l'état
  // suit donc un ensemble d'index, et non un index unique. Avec un seul index,
  // ouvrir une entrée repasserait l'indicateur de la précédente à « + » alors
  // qu'elle est toujours dépliée.
  const [openItems, setOpenItems] = React.useState<ReadonlySet<number>>(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : []),
  );

  const setOpen = (index: number, open: boolean) => {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (open) next.add(index);
      else next.delete(index);
      return next;
    });
  };

  // On n'anime que si l'utilisateur accepte le mouvement. La valeur est lue au
  // montage, donc jamais pendant le rendu serveur.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        animate.current = true;
        return () => {
          animate.current = false;
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const handleToggle = (index: number) => (event: React.MouseEvent) => {
    const summary = event.currentTarget as HTMLElement;
    const details = summary.parentElement as HTMLDetailsElement | null;
    const content = details?.querySelector<HTMLElement>(
      "[data-accordion-body]",
    );
    if (!details || !content) return;

    if (!animate.current) {
      // Comportement natif : `<details>` gère l'ouverture, on suit l'état.
      setOpen(index, !details.open);
      return;
    }

    event.preventDefault();
    gsap.killTweensOf(content);

    if (details.open) {
      setOpen(index, false);
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          details.open = false;
          gsap.set(content, { height: "auto", opacity: 1 });
        },
      });
      return;
    }

    details.open = true;
    setOpen(index, true);
    gsap.fromTo(
      content,
      { height: 0, opacity: 0 },
      {
        height: "auto",
        opacity: 1,
        duration: 0.38,
        ease: "power2.out",
        clearProps: "height",
      },
    );
  };

  return (
    <div ref={rootRef} className={className}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const isLast = index === items.length - 1;

        return (
          <details
            key={item.title}
            open={defaultOpen === index}
            className={cn(
              "border-t border-line",
              styles.row,
              isLast && "border-b border-line",
            )}
          >
            <summary
              onClick={handleToggle(index)}
              className={cn(
                "flex items-center justify-between gap-4 font-bold",
                styles.summary,
              )}
            >
              {item.title}
              <span
                aria-hidden
                className={cn(
                  "shrink-0 transition-colors",
                  isOpen ? "text-neon" : "text-fg-muted",
                )}
              >
                {isOpen ? "—" : "+"}
              </span>
            </summary>
            <div data-accordion-body className="overflow-hidden">
              <p className={cn("text-fg-muted", styles.body)}>{item.body}</p>
            </div>
          </details>
        );
      })}
    </div>
  );
}
