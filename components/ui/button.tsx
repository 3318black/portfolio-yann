import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Les cinq styles de bouton relevés dans la maquette. `buttonVariants` est
 * exporté pour styler un élément quelconque (un `<Link>` par exemple) sans
 * passer par le composant.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 rounded-pill font-semibold whitespace-nowrap transition-opacity select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** CTA principal : pastille lime pleine. */
        neon: "bg-neon text-ink",
        /** CTA hero : surface sombre cerclée de néon, avec halo. */
        surface:
          "bg-surface-raised text-fg border border-line-neon shadow-neon",
        /** Action secondaire posée sur une carte. */
        secondary: "bg-surface-strong text-fg",
        /** Action tertiaire, simple contour. */
        outline: "border border-line-outline text-fg",
        ghost: "text-fg",
      },
      size: {
        sm: "px-[22px] py-[13px] text-sm",
        md: "px-[30px] py-4 text-[15px]",
        /** Libellé capitale interlettré, utilisé pour les actions de section. */
        caps: "px-[26px] py-[13px] text-xs font-bold tracking-[0.1em]",
      },
    },
    defaultVariants: { variant: "neon", size: "md" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  /** Ajoute la pastille circulaire à flèche du CTA « contact ». */
  withArrow?: boolean;
  children?: React.ReactNode;
};

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

export type ButtonLinkProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string;
  };

/** Padding resserré à droite : la pastille occupe la place du padding. */
const arrowLayout = "gap-3 py-1.5 pr-1.5 pl-[26px]";

function ArrowBadge() {
  return (
    <span
      aria-hidden
      data-arrow
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-[17px] leading-none text-neon"
    >
      ↗
    </span>
  );
}

/**
 * Rend un `<a>` dès qu'une `href` est fournie, un `<button>` sinon — les CTA
 * de la maquette sont majoritairement des ancres.
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps | ButtonLinkProps
>(function Button(
  { className, variant, size, withArrow = false, children, ...props },
  ref,
) {
  const classes = cn(
    buttonVariants({ variant, size }),
    withArrow && arrowLayout,
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowBadge /> : null}
    </>
  );

  if (typeof props.href === "string") {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isExternal = /^https?:\/\//.test(props.href);

    return (
      <a
        {...anchorProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
      >
        {content}
      </a>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type="button"
      {...buttonProps}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
    >
      {content}
    </button>
  );
});
