import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Les cinq teintes de hachures de la maquette. Chaque paire correspond aux
 * deux couleurs du `repeating-linear-gradient` d'origine.
 */
const TINTS = {
  neutral: ["#232323", "#191919"],
  surface: ["#202020", "#171717"],
  panel: ["#202020", "#191919"],
  green: ["#1f2a1a", "#161d13"],
  blue: ["#1a2430", "#141a22"],
  amber: ["#2a2418", "#1d1a12"],
} as const;

export type StripeTint = keyof typeof TINTS;

/**
 * Teinte de la légende, accordée au motif qu'elle surmonte — la maquette
 * décale légèrement le gris vers la dominante de chaque carte.
 */
const LABEL_COLORS: Record<StripeTint, string> = {
  neutral: "#7a7a74",
  surface: "#7a7a74",
  panel: "#7a7a74",
  green: "#6f7a66",
  blue: "#6f7a86",
  amber: "#857c66",
};

export function stripeLabelColor(tint: StripeTint) {
  return LABEL_COLORS[tint];
}

/** Reproduit le motif hachuré du design pour une teinte donnée. */
export function stripeBackground(
  tint: StripeTint,
  angle = 135,
  width = 6,
): React.CSSProperties {
  const [a, b] = TINTS[tint];
  return {
    backgroundImage: `repeating-linear-gradient(${angle}deg, ${a} 0 ${width}px, ${b} ${width}px ${width * 2}px)`,
  };
}

export type MediaPlaceholderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  /**
   * Chemin de l'image dans /public. Tant qu'il est absent, le motif hachuré
   * de la maquette est rendu tel quel : le site reste complet sans visuels.
   */
  src?: string;
  /** Obligatoire dès qu'une image est fournie. */
  alt?: string;
  /** Légende technique affichée sur le motif, décrivant le visuel attendu. */
  label?: string;
  tint?: StripeTint;
  angle?: number;
  stripeWidth?: number;
  /** Position de la légende : coin supérieur gauche ou centre. */
  labelPosition?: "corner" | "center";
  /** Rendue au-dessus de l'image comme du motif (badge, titre…). */
  overlay?: React.ReactNode;
  /** Passé à `next/image` : `true` pour les visuels visibles sans scroll. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Emplacement visuel du portfolio.
 *
 * Sans `src`, rend le motif hachuré fidèle à la maquette accompagné de sa
 * légende. Avec `src`, bascule sur `next/image` (optimisé, `object-cover`).
 * Déposer un fichier dans /public et renseigner le chemin suffit donc à
 * remplacer un placeholder, sans modifier le code des sections.
 */
export function MediaPlaceholder({
  src,
  alt,
  label,
  tint = "neutral",
  angle = 135,
  stripeWidth = 6,
  labelPosition = "corner",
  overlay,
  priority = false,
  sizes = "100vw",
  className,
  style,
  ...props
}: MediaPlaceholderProps) {
  const showStripes = !src;

  return (
    <div
      {...props}
      className={cn("relative overflow-hidden", className)}
      style={{
        ...(showStripes ? stripeBackground(tint, angle, stripeWidth) : null),
        ...style,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : null}

      {showStripes && label ? (
        <span
          className={cn(
            "font-mono text-[11px] text-fg-faint",
            labelPosition === "corner"
              ? "absolute top-4 left-5"
              : "absolute inset-0 flex items-center justify-center",
          )}
        >
          {label}
        </span>
      ) : null}

      {overlay}
    </div>
  );
}
