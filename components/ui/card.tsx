import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const cardVariants = cva("", {
  variants: {
    variant: {
      /** Carte standard : témoignages, articles, panneau de contact. */
      default: "bg-surface border border-line-soft",
      /** Bandeau du hero, légèrement plus clair et sans bordure. */
      raised: "bg-surface-raised",
      /** Carte d'accent lime pleine (métrique mise en avant). */
      neon: "bg-neon text-ink",
    },
    radius: {
      card: "rounded-card",
      panel: "rounded-panel",
      strip: "rounded-strip",
    },
    padding: {
      none: "",
      sm: "p-[26px]",
      md: "p-[clamp(20px,3vw,28px)]",
      lg: "p-[clamp(24px,3vw,38px)]",
    },
  },
  defaultVariants: { variant: "default", radius: "card", padding: "sm" },
});

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, radius, padding, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cn(cardVariants({ variant, radius, padding }), className)}
    />
  );
});
