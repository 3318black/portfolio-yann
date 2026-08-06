"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Enregistrement unique des plugins GSAP.
 *
 * `useGSAP` doit être enregistré comme un plugin pour que les animations
 * créées dans le hook soient rattachées à son contexte et révoquées au
 * démontage — indispensable avec le Strict Mode de React, qui monte chaque
 * composant deux fois en développement.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export { gsap, ScrollTrigger, useGSAP };

/** Requêtes média passées à `gsap.matchMedia()`. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCED = "(prefers-reduced-motion: reduce)";

/** Réglages partagés, pour que toutes les sections respirent au même rythme. */
export const EASE = "power3.out";
export const DURATION = { fast: 0.4, base: 0.7, slow: 1.1 } as const;

/** Une section s'anime quand son haut atteint 85 % de la hauteur du viewport. */
export const REVEAL_START = "top 85%";

/**
 * Lecture ponctuelle de la préférence, pour les bascules d'état discrètes où
 * `gsap.matchMedia()` serait plus lourd que le comportement à piloter.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOTION_REDUCED).matches;
}

/**
 * ScrollTrigger calcule les positions à partir de la hauteur du document. Tant
 * que les polices ne sont pas chargées, les métriques du texte changent encore
 * et les déclencheurs se retrouvent décalés. On recalcule donc une fois les
 * polices prêtes.
 */
export function refreshScrollTriggerAfterFonts() {
  if (typeof document === "undefined") return;
  void document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
