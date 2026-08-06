/**
 * Limitation de débit en mémoire.
 *
 * Suffisant pour un portfolio déployé sur une instance unique : cela arrête
 * les envois répétés depuis une même adresse sans dépendance externe.
 *
 * Limite connue : le compteur vit dans le processus. Sur plusieurs instances
 * (ou en environnement serverless, où chaque instance froide repart de zéro),
 * la protection s'affaiblit proportionnellement au nombre d'instances. Passer
 * alors sur un compteur partagé, type `@upstash/ratelimit` sur Redis.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export type RateLimitResult = {
  allowed: boolean;
  /** Secondes à attendre avant un nouvel essai, pour l'en-tête `Retry-After`. */
  retryAfter: number;
};

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const previous = hits.get(key) ?? [];
  const recent = previous.filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    return {
      allowed: false,
      retryAfter: Math.ceil((WINDOW_MS - (now - oldest)) / 1000),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  // Purge opportuniste : évite que la table ne grossisse indéfiniment avec les
  // adresses n'ayant plus rien envoyé depuis la fenêtre courante.
  if (hits.size > 5000) {
    for (const [entryKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entryKey);
    }
  }

  return { allowed: true, retryAfter: 0 };
}

/**
 * Identifie l'appelant. Derrière un proxy (Vercel, nginx), l'IP réelle est
 * dans `x-forwarded-for` ; la première valeur est celle du client.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "unknown";
}
