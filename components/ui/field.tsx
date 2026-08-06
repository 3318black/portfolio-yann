import * as React from "react";

import { cn } from "@/lib/utils";

export type FieldProps = {
  /** Libellé en capitales interlettrées, comme dans la maquette. */
  label: string;
  /** Identifiant du contrôle : relie le label, l'erreur et le champ. */
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

/** Identifiant du message d'erreur associé à un champ. */
export function errorId(name: string) {
  return `${name}-error`;
}

/**
 * Enveloppe un contrôle de formulaire : libellé, champ, message d'erreur.
 * Le message est annoncé aux lecteurs d'écran dès qu'il apparaît.
 */
export function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("block", className)}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[11px] tracking-[0.1em] text-fg-muted"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={errorId(htmlFor)}
          role="alert"
          className="mt-1.5 text-xs text-danger"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
