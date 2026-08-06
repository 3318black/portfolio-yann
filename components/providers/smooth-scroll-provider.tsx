"use client";

import * as React from "react";
import { ReactLenis, type LenisRef } from "lenis/react";

import {
  ScrollTrigger,
  gsap,
  refreshScrollTriggerAfterFonts,
} from "@/lib/gsap";

/**
 * Smooth scroll Lenis, synchronisé avec GSAP.
 *
 * Lenis et ScrollTrigger tournent tous deux sur `requestAnimationFrame`. Les
 * laisser piloter chacun leur propre boucle produit un décalage d'une frame
 * entre la position lissée et le calcul des déclencheurs, visible sous forme
 * de tremblement sur les éléments animés au scroll. On coupe donc la boucle
 * interne de Lenis (`autoRaf: false`) et c'est le ticker GSAP — horloge
 * unique — qui l'avance.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = React.useRef<LenisRef>(null);

  React.useEffect(() => {
    const update = (time: number) => {
      // Le ticker GSAP compte en secondes, Lenis attend des millisecondes.
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    // Sans cela, GSAP « rattrape » les frames perdues après un onglet inactif
    // et le scroll fait un bond.
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    refreshScrollTriggerAfterFonts();

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        // Compense la hauteur du header collant sur les ancres du menu.
        anchors: { offset: -24 },
        // Lenis se met de lui-même en retrait si l'utilisateur a demandé la
        // réduction des animations.
        respectReducedMotion: true,
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
