import * as React from "react";

import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  /** Une chaîne, ou plusieurs lignes séparées par un retour forcé. */
  title: string | readonly string[];
  intro?: string;
  /** Largeur maximale du paragraphe d'introduction. */
  introClassName?: string;
  className?: string;
  id?: string;
  as?: "h1" | "h2";
};

/**
 * Titre de section : le couple « h2 Space Grotesk + paragraphe gris » qui
 * revient six fois dans la maquette.
 */
export function SectionHeading({
  title,
  intro,
  introClassName,
  className,
  id,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const lines = Array.isArray(title) ? title : [title as string];

  return (
    <div className={className}>
      <Tag
        id={id}
        className="font-display text-section leading-[1.05] font-bold"
      >
        {lines.map((line, index) => (
          <React.Fragment key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </React.Fragment>
        ))}
      </Tag>
      {intro ? (
        <p
          className={cn(
            "mt-4 text-[15px] leading-[1.6] text-fg-muted",
            introClassName,
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
