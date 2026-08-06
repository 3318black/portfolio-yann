"use client";

import * as React from "react";

import { EASE, MOTION_OK, MOTION_REDUCED, gsap, useGSAP } from "@/lib/gsap";

export type AnimatedHeadingProps = {
  text: string;
  className?: string;
  delay?: number;
  id?: string;
};

/**
 * Titre du hero révélé mot à mot.
 *
 * Le texte est découpé en `<span>` mais chaque mot conserve son espace : la
 * phrase reste sélectionnable, copiable et lue normalement par les lecteurs
 * d'écran. Sans JavaScript, les spans sont simplement visibles.
 */
export function AnimatedHeading({
  text,
  className,
  delay = 0.15,
  id,
}: AnimatedHeadingProps) {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const words = React.useMemo(() => text.split(" "), [text]);

  useGSAP(
    () => {
      const targets = ref.current?.querySelectorAll("[data-word]");
      if (!targets || targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: EASE,
            stagger: 0.04,
          },
        );
      });

      mm.add(MOTION_REDUCED, () => {
        gsap.set(targets, {
          opacity: 1,
          y: 0,
          clearProps: "opacity,transform",
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [text, delay] },
  );

  return (
    <h1 id={id} ref={ref} className={className}>
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          {index > 0 ? " " : null}
          <span data-word className="inline-block will-change-transform">
            {word}
          </span>
        </React.Fragment>
      ))}
    </h1>
  );
}
