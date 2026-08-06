import * as React from "react";

import { controlClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * `<select>` natif : accessible au clavier et aux lecteurs d'écran sans code
 * supplémentaire, et la liste déroulante native reste la meilleure expérience
 * sur mobile.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        {...props}
        ref={ref}
        className={cn(controlClasses, "appearance-none", className)}
      >
        {children}
      </select>
    );
  },
);
