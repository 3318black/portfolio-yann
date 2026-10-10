# TASKS — état d'avancement

Ce qui est terminé, ce qui reste. Pour le détail des décisions et des pièges
rencontrés, voir [STEPS.md](STEPS.md).

**État général :** le site est fonctionnel et déployable. Ce qui reste relève
du contenu réel, des visuels et d'une vérification navigateur — pas du code.

---

## ✅ Terminé

### Mise en place

- [x] Analyse de la maquette `Portfolio Dark Neon.dc.html` via DesignSync
- [x] Plan validé avant toute écriture de code (§5 du CLAUDE.md)
- [x] Next 16 · React 19 · TypeScript strict · Tailwind v4 (CSS-first)
- [x] ESLint (flat config natif de `eslint-config-next` 16) · Prettier
- [x] Tokens du design en `@theme` — palette, typographie, rayons, halo néon
- [x] Polices auto-hébergées via `next/font`, aucune requête tierce

### Composants `ui/` — 16 fichiers

- [x] `button` `badge` `card` `section` `section-heading`
- [x] `input` `textarea` `select` `field`
- [x] `accordion` `avatar` `nav-pill` `stat`
- [x] `media-placeholder` `reveal` `animated-heading`

### Sections — les 11 de la maquette

- [x] Header · Hero · Compétences · À propos · Projets · Stack
- [x] Témoignages · FAQ · Veille · Contact · Footer
- [x] Drapeaux `showTestimonials` / `showArticles` repris des props du design

### Animations

- [x] Lenis synchronisé au ticker GSAP (`autoRaf: false`)
- [x] Révélations au scroll, titre hero mot à mot, parallaxe des cartes projets
- [x] Compteurs de statistiques, stagger des pills, accordéons animés
- [x] Suivi de la section active dans le menu
- [x] Navbar détachée au scroll, centrée en haut, avec animation d'entrée **et** de sortie
- [x] `prefers-reduced-motion` respecté partout

### Formulaire de contact

- [x] Schéma Zod unique partagé client/serveur
- [x] `react-hook-form`, erreurs par champ, `aria-invalid` / `aria-describedby`
- [x] Route API Resend, leurre anti-spam, limitation de débit, `replyTo`
- [x] Gabarit d'email HTML aux couleurs du design
- [x] 6 comportements de la route testés au `curl`

### Qualité

- [x] `build` · `lint` · `typecheck` verts
- [x] 9 `aria-labelledby` vérifiés, lien d'évitement, navigation clavier
- [x] Contenu intégralement lisible sans JavaScript
- [x] Correction : menu inatteignable sous 360 px
- [x] Correction : incohérence de l'indicateur d'accordéon
- [x] Correction : erreur d'hydratation sur `<html>`
- [x] `README.md` · `STEPS.md` · `TASKS.md`
- [x] `.claude/settings.*` retirés du suivi git et ignorés — ils accumulaient
      des autorisations d'outils à chaque session et polluaient tous les diffs

### Internationalisation

- [x] Trois langues rédigées et adaptées : français, anglais, espagnol
- [x] Une URL par langue (`/fr`, `/en`, `/es`), générées statiquement
- [x] Détection automatique via `Accept-Language`, tri par facteur `q`,
      correspondance sur le préfixe (`fr-CA` → `fr`), repli sur le français
- [x] Sélecteur `FR · EN · ES` dans l'en-tête, trois ancres réelles
- [x] `hreflang` et `canonical` par langue
- [x] Formulaire localisé, avec des clés de sujet stables côté serveur
- [x] Complétude garantie à la compilation par le type `SiteContent`

---

## 🔴 À faire — bloquant avant mise en ligne

### Remplacer le contenu factice

Tout est dans [content/](content/), aucun composant à toucher.
Ce qui reste est signalé par un commentaire `maquette` dans le fichier.

- [x] ~~Témoignages fictifs~~ — section masquée (`showTestimonials: false`)
- [x] ~~Email, téléphone, liens sociaux~~ — vrais liens en place, numéro retiré
- [x] ~~Statut d'étudiant, recherche de stage~~ — positionnement réécrit
- [x] ~~Projet churn fictif~~ — remplacé par
      [nsy-churn](https://github.com/3318black/nsy-churn), en tête de liste,
      chiffres repris de la mesure de référence du dépôt (14 septembre 2026).
      La carte entière pointe vers le dépôt.
- [ ] **Les 3 autres projets** sont ceux de la maquette et ne correspondent à
      aucun travail réel (ventes retail, dashboard RH, mobilité urbaine).
      À remplacer par de vrais dépôts.
- [ ] **Les 2 articles de veille** sont inventés, leurs liens factices.
      À remplacer ou masquer via `sections.showArticles = false`.
- [ ] **Statistiques 12 / 24 / 4** — non vérifiées.
- [ ] **Power BI, Tableau, Excel, R** dans la stack — non confirmés,
      à retirer s'ils ne sont pas pratiqués.
- [ ] **« Île-de-France »** dans la FAQ (question sur le télétravail) —
      localisation non confirmée.
- [ ] Numéro de téléphone, si tu souhaites en afficher un : renseigner
      `identity.phone`, le pied de page l'affichera automatiquement.
- [ ] Lien Kaggle, si tu as un profil : le réinsérer dans `socials`.

### Configurer Resend en production

- [ ] Créer la clé API et vérifier un domaine d'envoi
- [ ] Renseigner `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
      et `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement Vercel
- [ ] Envoyer un message de bout en bout et vérifier la réception + le `replyTo`

> Sans ces variables, la route répond `500` et le formulaire affiche une erreur.

### Vérifier dans un vrai navigateur

**Rien n'a été observé à l'œil** : aucun outil navigateur n'était disponible.
Tout est validé par le code, le build et le HTML servi.

- [ ] Scroll fluide Lenis, révélations, parallaxe des cartes projets
- [ ] Navbar détachée : seuil de déclenchement, position, entrée et sortie
- [ ] Rendu à 360 / 768 / 1024 / 1440 px
- [ ] `prefers-reduced-motion` activé → contenu visible, aucun mouvement
- [ ] Comparaison côte à côte avec la maquette source

---

## 🟠 À faire — recommandé

- [x] ~~Photo de profil~~ — `public/yann-niangara.jpg`, recadrée en carré et
      centrée sur le visage. Affichée dans l'en-tête et le bandeau du hero.
- [ ] **Portrait de la section contact** — la maquette y prévoit un « portrait
      secondaire », au cadre vertical. Toujours un motif hachuré.
      `public/yann-niangara-portrait.jpg` contient la photo d'origine non
      recadrée : renseigner `identity.portrait` dans `content/shared.ts` suffit
      à l'utiliser en attendant un autre visuel.
- [ ] **Autres images.** Déposer dans `public/`, puis renseigner le chemin dans
      le fichier de langue. `MediaPlaceholder` bascule seul sur `next/image`.
      Restent : 4 captures de projets (dont nsy-churn), 2 illustrations d'articles.
- [ ] **Carte de partage Open Graph** — `app/opengraph-image.tsx` était prévu au
      plan mais n'a pas été créé. Sans lui, les partages LinkedIn n'affichent
      aucune image.
- [ ] **`favicon.ico`** — absent, le navigateur affiche l'icône par défaut.
- [ ] **`sitemap.ts` et `robots.ts`** — utiles au référencement.
- [ ] Renseigner `NEXT_PUBLIC_SITE_URL` avec l'URL Vercel définitive.

---

## 🟡 Dette technique connue

- [ ] **La page 404 n'est pas stylée pour les adresses inconnues.** La mise en
      page racine vit sous `app/[lang]/`, donc une adresse ne correspondant à
      aucune route retombe sur le document d'erreur global de Next, sans mise
      en page ni feuille de style. La corriger imposerait une mise en page
      racine lisant la langue dans les en-têtes, donc rendue dynamiquement —
      et ferait perdre la génération statique de `/fr`, `/en` et `/es`.
      Arbitrage volontaire, détaillé dans `app/[lang]/not-found.tsx`.
- [ ] **`lib/lenis.ts` n'existe pas.** Les options Lenis sont posées
      directement dans `smooth-scroll-provider.tsx`. Acceptable tant qu'il n'y
      a qu'un seul point d'usage ; à extraire si un second apparaît.
- [ ] **Limitation de débit en mémoire.** Suffisante sur une instance unique.
      Vercel pouvant démarrer plusieurs instances, la protection s'affaiblit
      d'autant. Basculer sur `@upstash/ratelimit` si le formulaire est spammé.
      Voir le commentaire dans [lib/rate-limit.ts](lib/rate-limit.ts).
- [ ] **Aucun test automatisé.** Les vérifications ont été manuelles. Un test
      de la route `/api/contact` et un rendu des sections seraient le premier
      filet utile.
- [ ] **`gh` n'est pas installé** sur la machine : les pull requests doivent
      être ouvertes à la main depuis l'URL renvoyée par `git push`.
      `winget install GitHub.cli` puis `gh auth login` lèverait la contrainte.

---

## 💡 Pistes, non engagées

- [ ] Pages de détail `/projets/[slug]` — écartées au plan pour rester fidèle à
      la maquette, qui est une page unique. Demanderait de créer un style non
      fourni par le design.
- [ ] Version anglaise du site
- [ ] Mode clair — hors périmètre : le design est exclusivement sombre
