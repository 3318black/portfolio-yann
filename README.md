# Portfolio — Yann Niangara

Portfolio one-page, implémentation fidèle de la maquette **Portfolio Dark Neon**
(projet Claude Design `763096a3-9940-4e82-b541-f3de35622121`).

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · GSAP · Lenis · Resend.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Variables d'environnement

Toutes sont décrites dans [`.env.example`](.env.example). Aucune n'est exposée
au navigateur, hormis `NEXT_PUBLIC_SITE_URL`.

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les messages |
| `CONTACT_FROM_EMAIL` | Expéditeur ; domaine à vérifier dans Resend |
| `NEXT_PUBLIC_SITE_URL` | URL publique (métadonnées, cartes de partage) |

`.env.local` est ignoré par git. **Aucune clé ne doit être committée.**

En développement, `onboarding@resend.dev` fonctionne sans domaine vérifié, mais
n'envoie qu'à l'adresse du compte Resend.

## Langues

Le site existe en **français, anglais et espagnol**, à trois adresses distinctes
générées statiquement : `/fr`, `/en`, `/es`.

Une visite sur `/` est redirigée vers la langue du navigateur ([`proxy.ts`](proxy.ts),
nommé ainsi car Next 16 a renommé `middleware.ts`), avec repli sur le français.
Un sélecteur `FR · EN · ES` figure dans l'en-tête.

| Fichier | Rôle |
|---|---|
| [`content/types.ts`](content/types.ts) | Le type `SiteContent`, forme que chaque langue doit satisfaire |
| [`content/shared.ts`](content/shared.ts) | Ce qui ne se traduit pas : email, liens sociaux, stack, ancres |
| `content/fr.ts` · `en.ts` · `es.ts` | Le texte de chaque langue |
| [`content/index.ts`](content/index.ts) | `getContent(locale)` et la configuration des langues |

**Ajouter une langue** : créer `content/<code>.ts` sur le modèle d'un fichier
existant, puis ajouter le code à `LOCALES` dans `content/index.ts`. Le typage
signale à la compilation toute clé manquante — une traduction incomplète ne
peut pas partir en production.

## Modifier le contenu

Tout le texte visible vit dans les fichiers de langue de **[`content/`](content/)**.
Les composants ne font que de la présentation : changer un projet, une
statistique ou un lien ne demande jamais de toucher au JSX. Une modification
doit être reportée dans les trois langues.

Deux drapeaux y pilotent l'affichage de sections entières, repris des propriétés
de la maquette :

```ts
export const sections = {
  showTestimonials: true,
  showArticles: true,
};
```

> ⚠️ **Les témoignages livrés sont ceux de la maquette : ils sont fictifs et
> attribués à des personnes nommées.** Les remplacer par de vrais retours, ou
> passer `showTestimonials` à `false`, avant toute mise en ligne. De même,
> l'email, le téléphone, les liens sociaux et les statistiques (12 / 24 / 4)
> sont des valeurs d'exemple.

## Ajouter les images

Le site est complet sans aucune image : partout où la maquette prévoit un
visuel, le composant [`MediaPlaceholder`](components/ui/media-placeholder.tsx)
rend le motif hachuré du design.

Pour remplacer un placeholder :

1. déposer le fichier dans `public/` ;
2. renseigner son chemin dans le fichier de langue (`content/fr.ts`…) ou,
   pour les visuels partagés, dans `content/shared.ts`.

```ts
// Photo de profil et portrait de la section contact
export const identity = {
  avatar: "/photo-profil.jpg",
  portrait: "/portrait.jpg",
};

// Capture d'un projet
{ title: "ANALYSE DES VENTES RETAIL", image: "/projets/retail.png", ... }
```

Le composant bascule alors sur `next/image` (optimisation, chargement
différé, `object-cover`). Aucune modification de code n'est nécessaire.

## Architecture

```
app/
  api/contact/route.ts    Endpoint Resend : validation, anti-spam, envoi
  layout.tsx              Polices, métadonnées, smooth scroll
  page.tsx                Assemblage des sections
components/
  ui/                     Composants réutilisables, façon shadcn — copiables,
                          autonomes, sans logique métier
  sections/               Les onze sections de la maquette
  providers/              Lenis × GSAP
content/                  Contenu : types, valeurs partagées, fr/en/es
emails/                   Gabarit de l'email de notification
lib/
  gsap.ts                 Enregistrement des plugins, réglages partagés
  utils.ts                cn()
  validation.ts           Schéma zod partagé client/serveur
  rate-limit.ts           Limitation de débit du formulaire
styles/globals.css        Tokens du design (@theme) et styles de base
```

### Composants `ui/`

Méthode shadcn sans la dépendance : chaque composant est un fichier autonome,
copiable et modifiable directement. Variantes via `class-variance-authority`,
composition de classes via `cn()` (`clsx` + `tailwind-merge`), typage strict.

### Animations

- **GSAP** — `ScrollTrigger` pour les révélations au scroll, la parallaxe des
  cartes projets et les compteurs de statistiques ; `useGSAP` pour un nettoyage
  automatique au démontage.
- **Lenis** — smooth scroll, avec `autoRaf: false` : c'est le ticker GSAP qui
  avance Lenis, pour n'avoir qu'une seule horloge et éviter le tremblement des
  éléments animés au scroll.
- **Accessibilité** — les blocs animés partent masqués en CSS, ce qui évite le
  clignotement entre le rendu serveur et l'hydratation. Deux exceptions les
  rétablissent, toutes deux sans JavaScript : une requête média pour
  `prefers-reduced-motion: reduce`, et une règle `<noscript>` quand JavaScript
  est absent. Aucun script ne modifie le DOM avant l'hydratation, donc aucun
  écart entre le HTML du serveur et celui du client.

### Formulaire de contact

Un schéma zod unique ([`lib/validation.ts`](lib/validation.ts)) sert au
navigateur et au serveur ; la route revalide systématiquement.

| Situation | Réponse |
|---|---|
| Champs invalides | `400` + erreurs par champ |
| Corps illisible | `400` |
| Leurre anti-spam rempli | `200` sans envoi |
| Plus de 5 envois / 10 min par IP | `429` + `Retry-After` |
| Configuration Resend absente ou envoi en échec | `500`, détail journalisé côté serveur uniquement |
| Succès | `200` |

La limitation de débit est en mémoire : suffisante pour une instance unique.
Sur plusieurs instances, passer sur un compteur partagé (Redis / Upstash) —
voir le commentaire dans [`lib/rate-limit.ts`](lib/rate-limit.ts).

## Vérifications effectuées

`npm run build` et `npm run lint` passent sans erreur. Le HTML rendu par le
serveur contient l'intégralité du contenu (sections, accordéons `<details>`,
formulaire), les neuf `aria-labelledby` pointent vers un titre existant, les
polices sont auto-hébergées (aucune requête vers Google Fonts) et les six
comportements de la route `/api/contact` ont été testés un à un.
