import * as React from "react";

import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cn } from "@/lib/utils";

export type AvatarProps = {
  src?: string;
  alt?: string;
  /** Diamètre en pixels : 84 dans le header, 52 dans le bandeau du hero. */
  size?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Portrait circulaire. Sans `src`, affiche le disque hachuré de la maquette
 * portant la mention « photo ».
 */
export function Avatar({
  src,
  alt = "",
  size = 84,
  priority = false,
  className,
}: AvatarProps) {
  return (
    <MediaPlaceholder
      src={src}
      alt={alt}
      label="photo"
      labelPosition="center"
      tint="neutral"
      priority={priority}
      sizes={`${size}px`}
      style={{ width: size, height: size }}
      className={cn(
        "shrink-0 rounded-full border border-line-strong",
        className,
      )}
    />
  );
}
