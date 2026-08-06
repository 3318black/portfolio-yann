import * as React from "react";

import { cn } from "@/lib/utils";

export type SectionProps = React.HTMLAttributes<HTMLElement>;

/**
 * Gabarit horizontal commun aux sections : la maquette les cadre toutes sur
 * 1240 px avec la même gouttière fluide et le même retrait bas.
 * `cn` laisse l'appelant surcharger n'importe laquelle de ces valeurs.
 */
export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      {...props}
      className={cn(
        "mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)] pb-[clamp(64px,9vw,104px)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Grille deux colonnes « titre à gauche, contenu à droite » de la maquette. */
export function SectionSplit({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(28px,4vw,64px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
