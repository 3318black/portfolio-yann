"use client";

import * as React from "react";

import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

export type StatProps = {
  value: number;
  label: string;
};

/**
 * Chiffre clé de la section « À propos ».
 *
 * La valeur finale est rendue côté serveur : sans JavaScript, le bon nombre
 * s'affiche. L'animation ne fait que le compter à partir de zéro lorsque le
 * bloc entre dans le viewport.
 */
export function Stat({ value, label }: StatProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = ref.current?.querySelector<HTMLElement>("[data-count]");
      if (!target) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counter = { n: 0 };
        gsap.to(counter, {
          n: value,
          duration: 1.2,
          ease: "power2.out",
          snap: { n: 1 },
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          onUpdate: () => {
            target.textContent = String(Math.round(counter.n));
          },
          onComplete: () => {
            target.textContent = String(value);
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <div ref={ref}>
      <div
        data-count
        className="font-display text-stat font-bold text-neon tabular-nums"
      >
        {value}
      </div>
      <div className="mt-2 text-xs leading-[1.5] text-fg-muted">{label}</div>
    </div>
  );
}
