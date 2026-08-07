# CLAUDE.md — Portfolio Dark Neon

Ce fichier donne le contexte et les instructions à suivre pour construire ce portfolio. Lis-le en entier avant de commencer quoi que ce soit.

## 0. Prérequis — Setup des MCP

Avant de commencer, vérifie/installe les MCP suivants :

```bash
# MCP Context7 (documentation à jour pour Next.js, GSAP, Lenis, Resend, etc.)
claude mcp add --transport http context7 https://mcp.context7.com/mcp

# MCP Claude Design (import du design source)
claude mcp add --transport http claude-design https://api.anthropic.com/v1/design/mcp
# Authentification :
/design-login
```

Utilise **Context7** systématiquement dès que tu as un doute sur une API récente (App Router Next.js, GSAP 3.x, Lenis, Resend SDK) plutôt que de te fier à ta mémoire.

## 1. Source du design

Importe le projet Claude Design suivant via le MCP `claude-design` :

- Projet : `https://claude.ai/design/p/763096a3-9940-4e82-b541-f3de35622121?file=Portfolio+Dark+Neon.dc.html`
- Fichier principal à implémenter : **`Portfolio Dark Neon.dc.html`**
- ~~Fichier annexe à lire (importé par la sélection, contient probablement de la logique interactive/animations) : **`support.js`**~~ — **vérifié : faux.** `support.js` est le runtime générique de Claude Design (moteur de rendu des `.dc.html`), il ne contient aucune logique d'animation. Rien à en tirer.
- Le reste du projet est lisible pour contexte, mais seul `Portfolio Dark Neon.dc.html` doit être implémenté.

Étapes :
1. Charger le fichier `.dc.html` et `support.js` via le MCP.
2. Analyser la structure : sections, hiérarchie visuelle, palette (thème "dark neon"), typographie, animations/transitions déjà suggérées dans le HTML/JS source.
3. Repérer tous les éléments réutilisables (cards, boutons, badges, inputs, nav, etc.) qui doivent devenir des composants.

## 2. Stack technique imposée

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **GSAP** — animations (scroll-triggered, hover, transitions d'entrée)
- **Lenis** — smooth scroll
- **Resend** — envoi d'emails (formulaire de contact) via une route API (`app/api/contact/route.ts` ou équivalent)

## 3. Méthodologie des composants (style shadcn)

Ne pas utiliser shadcn en tant que dépendance externe — reproduire sa **méthode d'implémentation** :

- Composants **copiables**, pas importés depuis un package externe.
- Un composant = un fichier dans `components/ui/`, autonome, lisible, modifiable directement par l'utilisateur.
- Utiliser `class-variance-authority` (cva) pour gérer les variantes (taille, couleur, état) si pertinent.
- Utiliser `clsx` / `tailwind-merge` (`cn()` utilitaire dans `lib/utils.ts`) pour la composition de classes.
- Typage strict en TypeScript, props explicites, `forwardRef` quand nécessaire.
- Chaque composant doit être indépendant : pas de logique métier à l'intérieur, uniquement présentation + variantes.

## 4. Structure de projet attendue

```
/app
  /api/contact/route.ts       # endpoint Resend
  layout.tsx
  page.tsx
/components
  /ui/                        # composants réutilisables façon shadcn (Button, Card, Badge, Input, etc.)
  /sections/                  # sections du portfolio (Hero, Projects, About, Contact, etc.)
/lib
  utils.ts                    # cn() et helpers
  gsap.ts                     # setup/registration des plugins GSAP
  lenis.ts                    # setup du smooth scroll
/styles
  globals.css
```

## 5. Mode plan obligatoire

> **Statut : ce plan initial a été produit, validé et exécuté.** La règle reste
> valable pour toute nouvelle fonctionnalité d'ampleur, pas pour une correction
> ou un ajustement ponctuel.

**Avant d'écrire la moindre ligne de code**, passer en mode plan et proposer :
1. La liste des sections/composants identifiés dans le design source.
2. L'arborescence détaillée des fichiers à créer.
3. La liste des composants `ui/` réutilisables à construire en premier (fondations).
4. La stratégie d'animation GSAP (quelles sections, quels triggers, entrée/scroll).
5. La stratégie de smooth scroll Lenis (intégration avec GSAP ScrollTrigger).
6. Le schéma du formulaire de contact + intégration Resend (variables d'env nécessaires).

Attendre la validation de ce plan avant de commencer l'implémentation.

## 6. Points d'attention

- Respecter fidèlement la palette et l'ambiance "dark neon" du design source (pas de réinterprétation stylistique).
- Toutes les animations doivent être fluides et ne pas casser l'accessibilité (respecter `prefers-reduced-motion`).
- Le site doit être responsive (mobile, tablette, desktop).
- Le formulaire de contact doit avoir une validation côté client + retour utilisateur clair (succès/erreur) sur l'envoi via Resend.
- Ne pas committer de clés API — utiliser `.env.local` et documenter les variables nécessaires dans un `.env.example`.

---

# Le projet est construit — à lire avant d'y toucher

Les sections 0 à 6 ci-dessus décrivent la commande initiale. Ce qui suit décrit
le projet **tel qu'il existe**. En cas de contradiction, cette partie fait foi.

- [`TASKS.md`](TASKS.md) — ce qui est fait, ce qui reste
- [`STEPS.md`](STEPS.md) — comment on en est arrivé là, et pourquoi
- [`README.md`](README.md) — installation, variables d'environnement, architecture

## 7. Workflow git — le projet est déployé sur Vercel

**Ne jamais committer directement sur `main`.** Vercel déploie `main` en
production : un commit direct part en ligne sans relecture.

1. `git switch -c <type>/<sujet>` **avant** la première modification
2. Commits en Conventional Commits, **en anglais** (cohérence avec l'historique)
3. `git push -u remote-py <branche>`, puis ouvrir la pull request

Deux particularités de cette machine :

- Le remote s'appelle **`remote-py`**, pas `origin` →
  `https://github.com/3318black/portfolio-yann.git`
- **`gh` n'est pas installé.** La PR ne peut pas être créée en ligne de
  commande : utiliser l'URL `pull/new/<branche>` renvoyée par le push.

## 8. Outils réellement disponibles

La §0 décrit deux MCP à installer. Dans les faits :

- **`claude-design` est inutile** — l'outil natif `DesignSync` donne déjà accès
  au projet Claude Design, authentifié. Ne pas perdre de temps sur
  `/design-login`.
- **`context7` est installé** au niveau utilisateur, avec clé API. Il se charge
  au **démarrage** de session : après une installation en cours de session, il
  faut relancer Claude Code pour en disposer.

## 9. Pièges déjà résolus — ne pas les réintroduire

| Piège | Règle à respecter |
|---|---|
| **Hydratation** | Aucun script ne doit modifier le DOM avant l'hydratation. L'état masqué des blocs animés est posé en CSS ; `prefers-reduced-motion` et `<noscript>` le lèvent. Ne pas réintroduire de classe posée sur `<html>` par un script. |
| **`position: fixed`** | Un ancêtre porteur d'un `transform` devient le bloc conteneur de ses descendants `fixed`. Toute animation GSAP sur un conteneur doit se terminer par `clearProps: "transform"` si elle contient un élément fixe. |
| **Transform et GSAP** | GSAP réécrit `transform` en entier : ne jamais compter sur une classe Tailwind de translation (`-translate-x-1/2`) sur un élément animé. Passer par `xPercent` / `yPercent`. |
| **Débordement horizontal** | Le `<body>` masque le débordement (repris de la maquette). Un élément trop large n'est donc pas seulement coupé, il devient **inatteignable**. Vérifier à 360 px. |
| **Lenis × GSAP** | `autoRaf: false` et le ticker GSAP pilote Lenis. Deux boucles `requestAnimationFrame` concurrentes font trembler les ScrollTrigger. |

## 10. Conventions établies

- **Tout le contenu visible vit dans [`content/`](content/)** (`fr.ts`, `en.ts`,
  `es.ts`, plus `shared.ts` pour ce qui ne se traduit pas). Les
  composants ne font que de la présentation. Ne jamais écrire de texte en dur
  dans une section.
- Français pour la documentation, les docstrings et les commentaires. Anglais
  pour tous les identifiants de code.
- Tailwind v4 en **CSS-first** : les tokens sont dans le bloc `@theme` de
  [`styles/globals.css`](styles/globals.css). Il n'y a **pas** de
  `tailwind.config.ts`, ne pas en créer un.
- `globals.css` est dans `/styles`, pas dans `app/` (§4).
- Avant de pousser : `npm run typecheck && npm run lint && npm run build`.

## 11. Deux limites à ne pas masquer

- **Le contenu livré est celui de la maquette, donc factice.** Les quatre
  témoignages sont attribués à des personnes nommées qui n'existent pas. Ils
  doivent être remplacés, ou masqués via `sections.showTestimonials = false`,
  avant toute mise en ligne. Idem pour l'email, le téléphone, les liens sociaux
  et les statistiques.
- **Le rendu n'a jamais été observé dans un navigateur.** Aucun outil de ce type
  n'était disponible pendant la construction : tout est validé par le build, le
  HTML servi et le CSS compilé. Le scroll, les animations et le responsive
  restent à confirmer à l'œil sur un déploiement de prévisualisation.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
