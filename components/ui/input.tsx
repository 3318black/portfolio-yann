import * as React from "react";

import { cn } from "@/lib/utils";

/** Style commun aux trois contrôles de saisie de la maquette. */
export const controlClasses =
  "w-full rounded-input border border-line-input bg-surface-input p-[13px] text-[13px] text-fg placeholder:text-fg-faint focus-visible:border-neon aria-invalid:border-danger";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return (
      <input {...props} ref={ref} className={cn(controlClasses, className)} />
    );
  },
);
