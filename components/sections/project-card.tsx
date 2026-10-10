"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  MediaPlaceholder,
  stripeLabelColor,
} from "@/components/ui/media-placeholder";
import type { Project } from "@/content/types";
import {
  DURATION,
  EASE,
  MOTION_OK,
  MOTION_REDUCED,
  REVEAL_START,
  gsap,
  useGSAP,
} from "@/lib/gsap";

/**
 * Carte projet pleine largeur.
 *
 * Le fond (motif hachuré ou capture) est un calque distinct du contenu : il
 * peut ainsi défiler en parallaxe sans emporter le texte. Le calque déborde
 * verticalement de 10 % de part et d'autre pour que le déplacement ne laisse
 * jamais apparaître le fond de page.
 */
export function ProjectCard({ project }: { project: Project }) {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const card = ref.current;
      if (!card) return;

      const layer = card.querySelector<HTMLElement>("[data-parallax]");
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: DURATION.base,
            ease: EASE,
            scrollTrigger: { trigger: card, start: REVEAL_START, once: true },
          },
        );

        if (layer) {
          gsap.fromTo(
            layer,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });

      mm.add(MOTION_REDUCED, () => {
        gsap.set(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: "opacity,transform",
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <article
      ref={ref}
      data-reveal="self"
      className="group relative isolate flex min-h-[clamp(280px,30vw,360px)] flex-col items-center justify-center overflow-hidden rounded-panel px-[clamp(24px,7vw,96px)] py-14 text-center"
    >
      <MediaPlaceholder
        data-parallax
        src={project.image}
        alt={project.image ? project.title : ""}
        tint={project.tint}
        angle={115}
        stripeWidth={10}
        sizes="(max-width: 1240px) 100vw, 1112px"
        className="absolute inset-x-0 -inset-y-[10%] -z-10"
      />

      <span
        className="absolute top-4 left-5 font-mono text-[11px]"
        style={{ color: stripeLabelColor(project.tint) }}
      >
        {project.mediaLabel}
      </span>

      <Badge variant="category">{project.badge}</Badge>

      <h3 className="mt-[18px] mb-3 font-display text-project leading-[1.05] font-bold">
        {project.href ? (
          // Lien étiré : le pseudo-élément couvre toute la carte, mais le nom
          // accessible du lien reste le seul titre, pas la description entière.
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-neon"
          >
            {project.title}
            <span aria-hidden="true"> ↗</span>
          </a>
        ) : (
          project.title
        )}
      </h3>

      <p className="max-w-[580px] text-[15px] leading-[1.65] text-fg-secondary">
        {project.description}
      </p>
    </article>
  );
}
