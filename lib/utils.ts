import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose des classes Tailwind en résolvant les conflits.
 * `clsx` gère les conditionnelles, `twMerge` garantit que la dernière classe
 * d'une même famille (ex. `px-4` puis `px-8`) l'emporte — ce qui permet à
 * l'appelant de surcharger n'importe quel style par défaut d'un composant.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
