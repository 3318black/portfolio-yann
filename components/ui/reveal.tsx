"use client";

import * as React from "react";

import {
  DURATION,
  EASE,
  MOTION_OK,
  MOTION_REDUCED,
  REVEAL_START,
  gsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * `self` anime le bloc entier ; `stagger` anime ses enfants directs les uns
   * après les autres. L'état initial masqué est posé en CSS (voir
   * globals.css), ce qui évite le clignotement « visible puis masqué » entre
   * le rendu serveur et le montage de GSAP.
   */
  mode?: "self" | "stagger";
  /** Décalage vertical de départ, en pixels. */
  y?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Position de déclenchement ScrollTrigger. */
  start?: string;
  /** Anime dès le montage plutôt qu'à l'entrée dans le viewport. */
  immediate?: boolean;
};

/**
 * Révèle un bloc à son entrée dans le viewport.
 *
 * C'est un composant client, mais ses enfants restent des composants serveur :
 * le HTML est rendu côté serveur, l'animation ne fait que le dévoiler. Sans
 * JavaScript, ou en `prefers-reduced-motion: reduce`, le contenu est visible
 * immédiatement.
 */
export function Reveal({
  mode = "self",
  y = 24,
  delay = 0,
  stagger = 0.08,
  duration = DURATION.base,
  start = REVEAL_START,
  immediate = false,
  className,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets: Element | Element[] =
        mode === "stagger" ? Array.from(el.children) : el;
      if (Array.isArray(targets) && targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: EASE,
            stagger: mode === "stagger" ? stagger : 0,
            ...(immediate
              ? {}
              : { scrollTrigger: { trigger: el, start, once: true } }),
          },
        );
      });

      // Filet de sécurité : si la préférence bascule en cours de session, on
      // remet immédiatement le contenu dans son état final.
      mm.add(MOTION_REDUCED, () => {
        gsap.set(targets, {
          opacity: 1,
          y: 0,
          clearProps: "opacity,transform",
        });
      });

      return () => mm.revert();
    },
    {
      scope: ref,
      dependencies: [mode, y, delay, stagger, duration, start, immediate],
    },
  );

  return (
    <div {...props} ref={ref} data-reveal={mode} className={cn(className)}>
      {children}
    </div>
  );
}
