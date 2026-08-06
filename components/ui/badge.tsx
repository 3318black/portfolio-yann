import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-pill whitespace-nowrap",
  {
    variants: {
      variant: {
        /** Pastille de disponibilité du header, cerclée de néon. */
        status:
          "gap-2 border border-neon px-3 py-[5px] text-xs font-semibold text-fg",
        /** Étiquette de catégorie d'un projet, lime pleine. */
        category:
          "bg-neon px-[13px] py-[5px] text-[11px] font-bold tracking-[0.1em] text-ink",
        /** Pastille de la stack technique, simple contour. */
        tag: "border border-line-strong px-[22px] py-[11px] text-[13px] tracking-[0.06em] text-fg",
      },
    },
    defaultVariants: { variant: "category" },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    /** Affiche le point cerclé qui précède le libellé de disponibilité. */
    withDot?: boolean;
  };

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    { className, variant, withDot = false, children, ...props },
    ref,
  ) {
    return (
      <span
        {...props}
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
      >
        {withDot ? (
          <span
            aria-hidden
            className="block size-[11px] shrink-0 rounded-full border-2 border-neon"
          />
        ) : null}
        {children}
      </span>
    );
  },
);
