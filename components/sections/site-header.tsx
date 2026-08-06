"use client";

import * as React from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavPill } from "@/components/ui/nav-pill";
import { identity, nav } from "@/content/site";
import {
  DURATION,
  EASE,
  MOTION_OK,
  ScrollTrigger,
  gsap,
  prefersReducedMotion,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PinState = "idle" | "pinned" | "leaving";

export function SiteHeader() {
  const ref = React.useRef<HTMLElement>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const [activeHref, setActiveHref] = React.useState<string>();

  // Une fois le header sorti de l'écran, la gélule se détache et vient se
  // fixer en haut au centre ; elle revient à sa place dès le retour en haut.
  //
  // Trois états et non un booléen : `leaving` maintient la gélule détachée le
  // temps de son animation de sortie. Repasser directement à `idle` retirerait
  // le positionnement fixe dès l'image suivante et la ferait claquer dans le
  // header, sans laisser de fenêtre pour l'animer.
  const [pinState, setPinState] = React.useState<PinState>("idle");
  const previousPinState = React.useRef<PinState>("idle");
  const isDetached = pinState !== "idle";
  // Dimensions figées de l'emplacement laissé vacant. Sans elles, retirer la
  // gélule du flux ferait glisser le bouton « contact » vers la gauche à
  // chaque bascule.
  const [slotSize, setSlotSize] = React.useState<{
    width: number;
    height: number;
  }>();

  // Le lien du menu correspondant à la section occupant le milieu de l'écran
  // est mis en avant. `document.querySelector` est sûr ici : useGSAP s'exécute
  // après le montage, donc après le rendu des sections.
  useGSAP(() => {
    const triggers = nav
      .map((item) => document.querySelector(item.href))
      .map((element, index) => {
        const item = nav[index];
        if (!element || !item) return null;
        return ScrollTrigger.create({
          trigger: element,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setActiveHref(item.href);
          },
        });
      });

    return () => {
      for (const trigger of triggers) trigger?.kill();
    };
  }, []);

  useGSAP(() => {
    const pinTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "bottom top+=8",
      onEnter: () => {
        // Mesure prise tant que la gélule est encore dans le flux : c'est la
        // taille que l'emplacement devra conserver une fois celle-ci détachée.
        const rect = navRef.current?.getBoundingClientRect();
        if (rect) setSlotSize({ width: rect.width, height: rect.height });
        setPinState("pinned");
      },
      onLeaveBack: () => setPinState("leaving"),
    });

    return () => pinTrigger.kill();
  }, []);

  useGSAP(
    () => {
      const element = navRef.current;
      if (!element) return;

      const cameFrom = previousPinState.current;
      previousPinState.current = pinState;

      // Une bascule peut en interrompre une autre — remonter puis redescendre
      // aussitôt. On coupe l'animation en cours avant d'en lancer une neuve,
      // sinon les deux se disputent l'opacité de l'élément.
      gsap.killTweensOf(element);

      if (pinState === "idle") {
        gsap.set(element, { clearProps: "transform,opacity" });
        return;
      }

      if (pinState === "leaving") {
        if (prefersReducedMotion()) {
          setPinState("idle");
          return;
        }
        // Sortie par le haut : la gélule repart vers le header d'où elle vient.
        // `power2.in` accélère au départ, à l'inverse de l'entrée.
        gsap.to(element, {
          xPercent: -50,
          y: -14,
          opacity: 0,
          duration: 0.28,
          ease: "power2.in",
          onComplete: () => setPinState("idle"),
        });
        return;
      }

      if (prefersReducedMotion()) {
        gsap.set(element, { xPercent: -50, y: 0, opacity: 1 });
        return;
      }

      // Le centrage passe par `xPercent` et non par une classe utilitaire :
      // GSAP réécrit `transform` en entier, une translation posée en CSS
      // serait donc écrasée dès la première image de l'animation.
      //
      // L'état de départ n'est imposé que si la gélule arrive du flux. Si elle
      // était en train de sortir, l'animation reprend depuis sa position et
      // son opacité du moment, sans à-coup.
      if (cameFrom === "idle") {
        gsap.set(element, { xPercent: -50, y: -16, opacity: 0 });
      }

      gsap.to(element, {
        xPercent: -50,
        y: 0,
        opacity: 1,
        duration: DURATION.fast,
        ease: EASE,
      });
    },
    { dependencies: [pinState] },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: -16 },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE,
            // Indispensable : un ancêtre porteur d'un `transform` devient le
            // bloc conteneur de ses descendants `fixed`. Sans ce nettoyage,
            // la gélule détachée se positionnerait par rapport au header au
            // lieu du viewport.
            clearProps: "transform",
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="flex flex-wrap items-center justify-between gap-5 px-[clamp(20px,4vw,44px)] py-[clamp(20px,3vw,30px)]"
    >
      <div className="flex items-center gap-4">
        <Avatar src={identity.avatar} alt={identity.name} size={84} priority />
        <div className="flex flex-col gap-1.5">
          <Badge variant="status" withDot className="self-start">
            {identity.availability}
          </Badge>
          <p className="font-display text-xl font-bold tracking-[-0.01em]">
            {identity.name}
          </p>
          <p className="text-[13px] text-fg-muted">{identity.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div
          style={
            isDetached && slotSize
              ? { width: slotSize.width, height: slotSize.height }
              : undefined
          }
        >
          <NavPill
            ref={navRef}
            items={nav}
            activeHref={activeHref}
            className={cn(
              isDetached &&
                "fixed top-3 left-1/2 z-50 max-w-[calc(100vw-1.5rem)] border border-line-strong shadow-[0_10px_34px_rgba(0,0,0,0.5)]",
              // Pendant la sortie, la gélule s'efface : la laisser cliquable
              // exposerait une cible invisible au-dessus du contenu.
              pinState === "leaving" && "pointer-events-none",
            )}
          />
        </div>
        <Button href="#contact" variant="neon" size="sm" withArrow>
          contact
        </Button>
      </div>
    </header>
  );
}
