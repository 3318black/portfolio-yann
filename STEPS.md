# STEPS — journal de construction

Ce que le projet a réellement traversé, dans l'ordre. Sert à comprendre
*pourquoi* le code est écrit ainsi, notamment les décisions prises contre une
solution plus évidente.

Pour l'état d'avancement et ce qui reste à faire, voir [TASKS.md](TASKS.md).

---

## 1 · Import et analyse du design source

Le projet Claude Design `763096a3-9940-4e82-b541-f3de35622121` contient trois
fichiers, lus via l'outil natif **DesignSync** (le MCP `claude-design` décrit
en §0 du CLAUDE.md n'a pas été nécessaire) :

| Fichier | Nature |
|---|---|
| `Portfolio Dark Neon.dc.html` | La maquette retenue — seule implémentée |
| `Portfolio Yann Niangara.dc.html` | Canevas d'exploration : 3 propositions (Dark Neon, Data Clean, Data Vibrant) |
| `support.js` | Runtime Claude Design |

### Constat qui a changé le plan

**`support.js` ne contient aucune logique d'animation.** Le CLAUDE.md le
supposait porteur du comportement interactif. C'est en réalité le moteur de
rendu générique des fichiers `.dc.html` (`dc-runtime`) : parseur de template,
interpolation de props React, indicateur de chargement `@keyframes sc-shine`.
Vérifié par recherche exhaustive — zéro occurrence de `gsap`, `lenis`,
`ScrollTrigger`, `IntersectionObserver` ou `requestAnimationFrame` applicatif.

Conséquence : **toute la stratégie d'animation a été conçue, rien n'a été
transposé.** Les seuls comportements présents dans la maquette sont
l'accordéon `<details>` natif et deux props booléennes (`showTestimonials`,
`showArticles`).

### Relevé du design

Palette, typographie, rayons et espacements extraits valeur par valeur, sans
réinterprétation, puis transcrits en tokens `@theme` dans
[styles/globals.css](styles/globals.css).

---

## 2 · Plan validé

Passage en mode plan comme l'exige la §5 du CLAUDE.md. Trois arbitrages
tranchés avec l'utilisateur avant écriture de la moindre ligne :

| Question | Décision |
|---|---|
| Les visuels sont des motifs hachurés dans la maquette | Composant `MediaPlaceholder` : hachures sans `src`, `next/image` dès qu'un fichier est déposé |
| Le contenu est factice | Tout centralisé dans `content/` |
| Deux liens ne mènent nulle part | Page unique, liens externes configurables |

---

## 3 · Échafaudage

Versions vérifiées sur le registre npm au moment de l'installation, pas
supposées : Next **16.3.0**, React **19.2**, Tailwind **4.3**, GSAP **3.15**,
Lenis **1.3.26**, Resend **6.18**, Zod **4.4**.

Deux écarts par rapport aux valeurs par défaut :

- **Tailwind v4 en configuration CSS-first.** Pas de `tailwind.config.ts` : les
  tokens vivent dans un bloc `@theme` de `globals.css`.
- **`globals.css` dans `/styles`**, et non dans `app/`, pour suivre la §4 du
  CLAUDE.md.

`eslint-config-next` 16 expose des configurations « flat » natives. Le pont
`FlatCompat` initialement écrit échouait sur `TypeError: Converting circular
structure to JSON` — remplacé par les imports directs.

---

## 4 · Design system, puis sections

Ordre suivi : `cn()` → tokens CSS → composants `ui/` fondations → composants
composés → sections. Chaque section a d'abord été construite **sans
animation**, pour valider la fidélité visuelle avant d'ajouter du mouvement.

Les composants `ui/` suivent la méthode shadcn sans la dépendance : un fichier
autonome par composant, variantes en `cva`, composition via `cn()`, typage
strict, `forwardRef` où un ref est utile, aucune logique métier.

`Button` rend un `<a>` dès qu'une `href` est fournie et un `<button>` sinon —
les CTA de la maquette sont majoritairement des ancres. `buttonVariants` est
exporté pour styler n'importe quel élément.

---

## 5 · Animations

### Lenis piloté par le ticker GSAP

Lenis et ScrollTrigger tournent tous deux sur `requestAnimationFrame`. Les
laisser piloter chacun leur boucle produit un décalage d'une image entre la
position lissée et le calcul des déclencheurs — visible sous forme de
tremblement. La boucle interne de Lenis est donc coupée (`autoRaf: false`) et
c'est le ticker GSAP qui l'avance : une seule horloge.

`ScrollTrigger.refresh()` est rappelé après `document.fonts.ready`, sinon les
positions sont calculées sur des métriques de texte encore fausses.

### Révélations au scroll

Un composant `Reveal` client enveloppe des enfants qui restent des composants
serveur : le HTML est rendu côté serveur, l'animation ne fait que le dévoiler.

---

## 6 · Formulaire et route API

Un schéma Zod unique dans [lib/validation.ts](lib/validation.ts), importé par
le navigateur **et** par la route. Le serveur revalide systématiquement.

Six comportements testés un à un au `curl` contre le serveur de développement :

| Cas | Réponse obtenue |
|---|---|
| Champs invalides | `400` + erreurs par champ |
| Corps illisible | `400` |
| Leurre anti-spam rempli | `200` sans envoi |
| Configuration Resend absente | `500`, détail journalisé côté serveur uniquement |
| 6ᵉ envoi en 10 min | `429` + `retry-after: 584` |
| Succès | `200` |

Le leurre rempli renvoie `200` volontairement : un rejet explicite apprendrait
au robot quel champ éviter au prochain essai.

---

## 7 · Vérification du rendu

Aucun outil navigateur n'était disponible. La vérification a donc porté sur le
HTML réellement servi et sur le CSS compilé :

- contenu intégralement présent côté serveur, 12 `<details>` fonctionnels ;
- les 9 `aria-labelledby` pointent vers un titre existant ;
- polices auto-hébergées par `next/font`, **zéro** requête vers Google Fonts ;
- tokens `@theme` correctement compilés en utilitaires.

**Limite assumée : le scroll, les animations et le rendu visuel n'ont jamais
été observés dans un navigateur.** Ils sont validés par le code, le build et le
HTML servi — pas à l'œil.

---

## 8 · Défauts trouvés et corrigés

### Menu inatteignable sur mobile

Les quatre libellés occupent ≈ 388 px contre 320 px utiles à 360 px de large.
Le `<body>` masquant le débordement horizontal (comportement repris de la
maquette), le lien « veille » devenait **inatteignable**. La gélule est rendue
défilable horizontalement ; l'apparence est inchangée dès que la place suffit.

### Accordéon incohérent

L'état d'ouverture était un index unique alors que les `<details>` sont
indépendants : ouvrir une entrée repassait l'indicateur de la précédente à
« + » tout en la laissant dépliée. Remplacé par un `Set` d'index.

### Erreur d'hydratation sur `<html>`

Un script inline ajoutait la classe `js-motion` à `<html>` avant l'hydratation,
pour éviter le clignotement des blocs animés. React comparait alors le
`className` du serveur à celui du client → divergence.

La doc Next 16 recommande pour ce cas un script inline **plus**
`suppressHydrationWarning`. Cette solution n'a pas été retenue : la condition
(« JavaScript actif **et** pas de `prefers-reduced-motion` ») s'exprime
entièrement en CSS.

| Condition | Mécanisme |
|---|---|
| Mouvement réduit | `@media (prefers-reduced-motion: reduce)` |
| JavaScript absent | règle `<noscript>` dans le `<head>` |

Le script a donc été **supprimé**. Plus rien ne modifie le DOM avant
l'hydratation : il n'y a plus d'écart à masquer, plutôt qu'un avertissement
étouffé. Cela évite aussi de poser `suppressHydrationWarning` sur `<html>`, qui
aurait masqué *tous* les futurs écarts d'attributs sur cet élément.

---

## 9 · Navbar détachée au scroll

Sur demande : la gélule de navigation se détache au scroll et se fixe en haut
au centre, puis revient à sa place en haut de page.

### Trois pièges traités

**Le header transformé capturait le `fixed`.** Son animation d'entrée laissait
un `transform` inline. Un ancêtre transformé devient le bloc conteneur de ses
descendants `fixed` : la gélule se serait positionnée par rapport au header, et
non au viewport. Résolu par `clearProps: "transform"` en fin d'animation.

**Le bouton « contact » sautait.** Sortir la gélule du flux vide son
emplacement. Sa taille est mesurée *avant* le détachement et figée sur le
conteneur laissé vacant.

**Le centrage horizontal.** GSAP réécrit `transform` en entier — un
`-translate-x-1/2` posé en classe Tailwind aurait été écrasé dès la première
image. Le centrage passe par `xPercent: -50` dans GSAP, seul `left-1/2` reste
en CSS.

### Animation de sortie

Un booléen ne suffisait pas : `onLeaveBack` remettait l'état à faux, React
retirait le `fixed` à l'image suivante et la gélule claquait dans le header —
aucune fenêtre pour animer.

L'état est passé à trois valeurs, `idle | pinned | leaving`. `leaving` maintient
la gélule détachée pendant sa sortie ; c'est l'`onComplete` du tween qui
bascule vers `idle` et la remet dans le flux.

Deux cas limites : `killTweensOf` gère l'interruption (remonter puis redescendre
aussitôt), et l'état de départ n'est réimposé que si la gélule vient du flux —
sinon l'entrée reprend depuis sa position du moment. `pointer-events-none`
pendant `leaving` évite une cible cliquable invisible.

---

## Décisions structurantes, en une ligne chacune

| Décision | Raison |
|---|---|
| État masqué des blocs animés posé en CSS, pas au montage | Évite le clignotement serveur → hydratation, sans script pré-hydratation |
| `autoRaf: false` sur Lenis | Une seule horloge avec GSAP, pas de tremblement au scroll |
| Accordéon sur `<details>` natif | Fonctionne sans JavaScript, indexable |
| Valeur finale des statistiques rendue côté serveur | Le bon chiffre s'affiche sans JavaScript |
| Contenu isolé dans `content/` | Éditer le site sans toucher au JSX |
| Schéma Zod unique client + serveur | Une seule source de vérité pour la validation |
| Aucune image requise | Le site est complet dès le premier lancement |
