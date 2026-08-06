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

---

## 🔴 À faire — bloquant avant mise en ligne

### Remplacer le contenu factice

Tout est dans [content/site.ts](content/site.ts), aucun composant à toucher.

- [ ] **Témoignages** — les 4 témoignages nominatifs de la maquette sont
      **fictifs** (« Claire Fontaine — enseignante en statistiques »…).
      Les remplacer par de vrais retours, ou passer `sections.showTestimonials`
      à `false`. Publier de faux témoignages attribués à des personnes nommées
      n'est pas acceptable en production.
- [ ] Email et téléphone — `yann.niangara@email.com`, `+33 6 12 34 56 78`
- [ ] Liens LinkedIn / GitHub / Kaggle — pointent vers les pages d'accueil
- [ ] Statistiques 12 / 24 / 4 et le « 96 % de précision » du modèle de churn
- [ ] Descriptions des 4 projets, si elles doivent refléter des travaux réels
- [ ] Les 2 articles de veille, dates et URL comprises

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

- [ ] **Ajouter les images.** Déposer dans `public/`, puis renseigner le chemin
      dans `content/site.ts`. `MediaPlaceholder` bascule seul sur `next/image`.
      Concerne : photo de profil, portrait de contact, 4 captures de projets,
      2 illustrations d'articles.
- [ ] **Carte de partage Open Graph** — `app/opengraph-image.tsx` était prévu au
      plan mais n'a pas été créé. Sans lui, les partages LinkedIn n'affichent
      aucune image.
- [ ] **`favicon.ico`** — absent, le navigateur affiche l'icône par défaut.
- [ ] **`sitemap.ts` et `robots.ts`** — utiles au référencement.
- [ ] Renseigner `NEXT_PUBLIC_SITE_URL` avec l'URL Vercel définitive.

---

## 🟡 Dette technique connue

- [ ] **`.claude/settings.json` est suivi par git** et accumule des
      autorisations d'outils à chaque session : il ressort modifié à chaque
      fois et pollue les diffs. À retirer du suivi
      (`git rm --cached`, puis l'ajouter au `.gitignore`) — décision à
      confirmer, le fichier a été committé volontairement au départ.
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
