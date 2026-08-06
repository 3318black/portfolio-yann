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
- Fichier annexe à lire (importé par la sélection, contient probablement de la logique interactive/animations) : **`support.js`**
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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
