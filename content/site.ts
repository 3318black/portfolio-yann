/**
 * Source unique du contenu du portfolio.
 *
 * Tous les textes, projets, liens et chiffres affichés par le site vivent ici :
 * les composants ne contiennent que de la présentation. Éditer ce fichier
 * suffit à mettre le site à jour, sans toucher au JSX.
 *
 * Identité, positionnement, compétences, stack, FAQ et contact décrivent le
 * profil réel. Restent issus de la maquette, donc **non vérifiés** : les quatre
 * projets, les deux articles de veille, les statistiques et les témoignages
 * (ces derniers désactivés, voir `sections.showTestimonials`). Ils sont
 * signalés par un commentaire « maquette » et suivis dans TASKS.md.
 */

import type { StripeTint } from "@/components/ui/media-placeholder";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type NavLink = { readonly label: string; readonly href: string };

export type AccordionEntry = { readonly title: string; readonly body: string };

export type Project = {
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  /** Légende du visuel : décrit ce que la capture doit montrer. */
  readonly mediaLabel: string;
  /** Chemin dans /public. Absent → motif rayé du design. */
  readonly image?: string;
  readonly tint: StripeTint;
  readonly href?: string;
};

export type Testimonial =
  | { readonly kind: "quote"; readonly quote: string; readonly author: string }
  | {
      readonly kind: "metric";
      readonly value: string;
      readonly caption: string;
      readonly emphasis: "neon" | "dark";
    };

export type Article = {
  readonly category: string;
  readonly date: string;
  readonly title: string;
  readonly excerpt: string;
  readonly href: string;
  readonly image?: string;
};

/* -------------------------------------------------------------------------- */
/* Identité                                                                    */
/* -------------------------------------------------------------------------- */

export const identity = {
  name: "Yann Niangara",
  role: "Data Scientist · Développeur Python",
  availability: "Ouvert aux opportunités",
  email: "niangara33@gmail.com",
  /**
   * Laisser vide tant qu'aucun numéro n'est communiqué : le pied de page
   * l'omet alors, plutôt que d'afficher un numéro inventé cliquable.
   */
  phone: "" as string,
  /** Photos : déposer les fichiers dans /public puis renseigner le chemin. */
  avatar: undefined as string | undefined,
  portrait: undefined as string | undefined,
} as const;

/**
 * La maquette prévoyait un troisième lien « KAGGLE ». Il est retiré faute de
 * profil : renvoyer vers la page d'accueil de Kaggle aurait donné un lien mort
 * en apparence légitime. Le réinsérer ici suffit à le rétablir.
 */
export const socials: readonly NavLink[] = [
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/yann-niangara-9b32a1395/",
  },
  { label: "GITHUB", href: "https://github.com/3318black" },
];

export const nav: readonly NavLink[] = [
  { label: "à propos", href: "#apropos" },
  { label: "projets", href: "#projets" },
  { label: "compétences", href: "#competences" },
  { label: "veille", href: "#veille" },
];

/* -------------------------------------------------------------------------- */
/* Sections optionnelles — reprises des props du design                        */
/* -------------------------------------------------------------------------- */

export const sections = {
  /**
   * Désactivé : les témoignages de la maquette sont fictifs et attribués à des
   * personnes nommées qui n'existent pas. Ne repasser ce drapeau à `true`
   * qu'après avoir remplacé le contenu de `testimonials.items` par de vrais
   * retours.
   */
  showTestimonials: false,
  showArticles: true,
} as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  title:
    "Diplômé En Data Science Et Développeur Python, De L'Analyse Au Déploiement.",
  subtitle:
    "J'explore les données, j'entraîne des modèles et je livre les API qui les rendent utilisables : Python, SQL, FastAPI et PostgreSQL au service de décisions concrètes.",
  cta: { label: "projets sélectionnés", href: "#projets" },
  strip: {
    text: "Découvrez mon parcours — licence en informatique, développement d'applications, master en data science — et les projets qui ont construit ma manière de travailler.",
    cta: { label: "à propos de moi", href: "#apropos" },
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Compétences                                                                 */
/* -------------------------------------------------------------------------- */

const skillItems: readonly AccordionEntry[] = [
  {
    title: "1. NETTOYAGE & PRÉPARATION DES DONNÉES",
    body: "Python, Pandas, NumPy. Détection des valeurs manquantes et aberrantes, normalisation des formats, jointures de sources multiples, pipeline documenté et reproductible.",
  },
  {
    title: "2. ANALYSE STATISTIQUE & EXPLORATION (EDA)",
    body: "Lecture critique des distributions, corrélations, tests d'hypothèses, segmentation. Je documente ce que les données peuvent — et ne peuvent pas — démontrer.",
  },
  {
    title: "3. MACHINE LEARNING",
    body: "Régression, classification, validation croisée et évaluation des modèles avec scikit-learn. Je m'attache autant à mesurer la performance qu'à énoncer les limites d'un modèle.",
  },
  {
    title: "4. DÉVELOPPEMENT D'API & MISE EN PRODUCTION",
    body: "FastAPI et Flask : exposer un modèle ou un jeu de données derrière une interface stable, typée et documentée. Un résultat qui reste dans un notebook ne sert personne.",
  },
  {
    title: "5. SQL & MODÉLISATION DE BASES DE DONNÉES",
    body: "PostgreSQL : requêtes analytiques, CTE, fonctions de fenêtrage, conception de schéma et modélisation en étoile pour l'analyse.",
  },
  {
    title: "6. AUTOMATISATION",
    body: "Scripts et traitements planifiés pour supprimer les étapes manuelles récurrentes : collecte, contrôle de qualité, rafraîchissement des livrables.",
  },
  {
    title: "7. VISUALISATION & RESTITUTION",
    body: "Matplotlib, Seaborn et outils de dashboarding. Des graphiques choisis pour la question posée, lisibles par des équipes non techniques.",
  },
];

export const skills = {
  title: ["CE QUE JE PEUX", "FAIRE POUR VOUS"],
  intro:
    "De la donnée brute à l'API livrée, je couvre la chaîne complète : cadrage de la question métier, préparation des données, modélisation, mise à disposition du résultat.",
  items: skillItems,
} as const;

/* -------------------------------------------------------------------------- */
/* À propos                                                                    */
/* -------------------------------------------------------------------------- */

export const about = {
  title: "À PROPOS DE MOI",
  body: "Je m'appelle Yann Niangara. Une licence en informatique, du développement d'applications, puis un master en data science : je travaille aujourd'hui à la jonction des deux. Ce qui m'intéresse, c'est le moment où un chiffre change une décision — et le code qui permet d'y arriver, du pipeline de traitement à l'API qui expose le résultat. Je suis ouvert au CDI, aux missions freelance comme à l'alternance.",
  cta: { label: "MON PARCOURS", href: "#contact" },
  /** maquette — chiffres non vérifiés, à confirmer ou à corriger */
  stats: [
    { value: 12, label: "Projets data réalisés" },
    { value: 24, label: "Mois de formation en data" },
    { value: 4, label: "Certifications obtenues" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Projets                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * maquette — ces quatre projets sont ceux du design, ils ne correspondent à
 * aucun travail réel. À remplacer par de vrais dépôts (github.com/3318black).
 */
const projectItems: readonly Project[] = [
  {
    badge: "POWER BI",
    title: "ANALYSE DES VENTES RETAIL",
    description:
      "18 mois de transactions consolidés en un dashboard unique : saisonnalité, marge par catégorie et classement des magasins. Trois recommandations d'assortiment issues de l'analyse. Power BI, SQL, DAX.",
    mediaLabel: "capture dashboard ventes retail",
    tint: "green",
  },
  {
    badge: "MACHINE LEARNING",
    title: "PRÉDICTION DE CHURN CLIENT",
    description:
      "Modèle de classification identifiant les clients à risque de résiliation, avec les trois variables les plus prédictives isolées pour l'équipe commerciale. Python, scikit-learn, Seaborn.",
    mediaLabel: "courbe ROC · matrice de confusion",
    tint: "neutral",
  },
  {
    badge: "TABLEAU",
    title: "DASHBOARD RH INTERACTIF",
    description:
      "Suivi du turnover, de l'absentéisme et de la pyramide des âges pour 800 salariés. Filtres par service et par ancienneté. Tableau, Excel, nettoyage sous Python.",
    mediaLabel: "capture dashboard RH",
    tint: "blue",
  },
  {
    badge: "PYTHON & SQL",
    title: "MOBILITÉ URBAINE OPEN DATA",
    description:
      "Croisement de jeux de données publics pour cartographier les heures de saturation d'un réseau de transport. PostgreSQL, Pandas, Matplotlib.",
    mediaLabel: "carte + graphiques Python",
    tint: "amber",
  },
];

export const projects = {
  title: "PROJETS PHARES",
  intro:
    "Quatre analyses menées de la donnée brute à la recommandation, avec le détail des outils employés.",
  cta: { label: "VOIR TOUS LES PROJETS", href: "https://github.com/3318black" },
  items: projectItems,
} as const;

/* -------------------------------------------------------------------------- */
/* Stack technique                                                             */
/* -------------------------------------------------------------------------- */

export const stack = {
  title: "STACK TECHNIQUE",
  /**
   * POWER BI, TABLEAU, EXCEL et R viennent de la maquette et n'ont pas été
   * confirmés : les retirer si tu ne les pratiques pas réellement.
   */
  items: [
    "PYTHON",
    "PANDAS",
    "SCIKIT-LEARN",
    "SQL",
    "POSTGRESQL",
    "FASTAPI",
    "FLASK",
    "GIT",
    "POWER BI",
    "TABLEAU",
    "EXCEL",
    "R",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Témoignages — CONTENU FICTIF, voir sections.showTestimonials                */
/* -------------------------------------------------------------------------- */

const testimonialItems: readonly Testimonial[] = [
  {
    kind: "quote",
    quote:
      "« Yann pose les bonnes questions avant de toucher aux données. Son dashboard sur les ventes a été repris tel quel par le groupe projet. »",
    author: "Claire Fontaine — enseignante en statistiques",
  },
  {
    kind: "metric",
    value: "96 %",
    caption: "de précision sur le modèle de churn, validé en cross-validation",
    emphasis: "neon",
  },
  {
    kind: "quote",
    quote:
      "« Rigoureux sur la qualité des données et clair dans ses restitutions. Il rend l'analyse compréhensible par des profils non techniques. »",
    author: "Marc Delaunay — tuteur, projet data collectif",
  },
  {
    kind: "quote",
    quote:
      "« Il a repris tout notre jeu de données, corrigé les doublons que personne n'avait vus et refait la structure du rapport en deux jours. »",
    author: "Sarah Amrani — binôme de projet",
  },
  {
    kind: "quote",
    quote:
      "« Autonome sur SQL et Power BI, et surtout capable d'expliquer ce que le chiffre veut dire. »",
    author: "Luc Berrada — responsable de la formation",
  },
  {
    kind: "metric",
    value: "- 32 %",
    caption: "de temps de reporting après automatisation du tableau de bord RH",
    emphasis: "dark",
  },
];

export const testimonials = {
  title: "CE QU'ON DIT DE MON TRAVAIL",
  intro: "Retours d'enseignants et de camarades de projet collectif.",
  items: testimonialItems,
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

const faqItems: readonly AccordionEntry[] = [
  {
    title: "QUELLES TECHNOLOGIES MAÎTRISEZ-VOUS ?",
    body: "Python (Pandas, scikit-learn), SQL et PostgreSQL au quotidien, FastAPI et Flask pour exposer les traitements, Git pour le versionnement.",
  },
  {
    title: "QUEL TYPE DE POSTE RECHERCHEZ-VOUS ?",
    body: "Je suis ouvert au CDI comme aux missions freelance, et l'alternance reste envisageable. Le format compte moins que le sujet : les projets où la donnée débouche sur une décision ou un outil réellement utilisé.",
  },
  {
    title: "COMMENT TRAVAILLEZ-VOUS SUR UN PROJET DATA ?",
    body: "Cadrage de la question métier, audit de la qualité des données, exploration, modélisation, puis mise à disposition du résultat — rapport, tableau de bord ou API selon l'usage. Chaque étape est documentée.",
  },
  {
    title: "AVEZ-VOUS DÉJÀ TRAVAILLÉ EN ÉQUIPE ?",
    body: "Oui, sur plusieurs projets collectifs : répartition des tâches sur Git, revues de code croisées et restitution devant un jury.",
  },
  {
    title: "TRAVAILLEZ-VOUS À DISTANCE ?",
    body: "Hybride ou présentiel en Île-de-France, distanciel possible ponctuellement.",
  },
  {
    title: "COMMENT DÉMARRER UNE COLLABORATION ?",
    body: "Un message via le formulaire, puis un échange de 20 minutes pour comprendre vos données et vos priorités.",
  },
];

export const faq = {
  title: ["QUESTIONS", "FRÉQUENTES"],
  intro:
    "Ce qu'on me demande le plus souvent en entretien. Une autre question ? Le formulaire est juste en dessous.",
  items: faqItems,
} as const;

/* -------------------------------------------------------------------------- */
/* Veille                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * maquette — articles inventés, liens factices. Les remplacer, ou masquer la
 * section entière via `sections.showArticles = false`.
 */
const articleItems: readonly Article[] = [
  {
    category: "MÉTHODE",
    date: "12 JUIN 2026",
    title: "NETTOYER UN JEU DE DONNÉES EN 5 ÉTAPES REPRODUCTIBLES",
    excerpt:
      "La checklist que j'applique avant toute analyse, du typage des colonnes à la traçabilité des corrections.",
    href: "https://github.com/",
  },
  {
    category: "OUTILS",
    date: "28 MAI 2026",
    title: "POWER BI OU TABLEAU : COMMENT JE CHOISIS",
    excerpt:
      "Comparaison sur un même jeu de données retail : modélisation, rapidité de prototypage et partage en équipe.",
    href: "https://github.com/",
  },
];

export const articles = {
  title: "VEILLE DATA",
  intro:
    "Ce que je lis, teste et retiens sur les outils et les méthodes d'analyse.",
  items: articleItems,
} as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contact = {
  title: "TRAVAILLONS ENSEMBLE",
  intro:
    "Un poste, une mission freelance ou une alternance : dites-moi ce dont vous avez besoin, je réponds sous 24 h.",
  submitLabel: "ENVOYER",
  submittingLabel: "ENVOI…",
} as const;

export const footer = {
  copyright: "© 2026 YANN NIANGARA — PORTFOLIO DATA ANALYST",
} as const;
