/**
 * Source unique du contenu du portfolio.
 *
 * Tous les textes, projets, liens et chiffres affichés par le site vivent ici :
 * les composants ne contiennent que de la présentation. Éditer ce fichier
 * suffit à mettre le site à jour, sans toucher au JSX.
 *
 * Les valeurs reprises telles quelles de la maquette sont marquées « exemple » :
 * elles sont à remplacer par les vraies avant mise en ligne.
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
  role: "Data Analyst · Data Science Student",
  availability: "Ouvert aux opportunités",
  /** exemple — à remplacer */
  email: "yann.niangara@email.com",
  /** exemple — à remplacer */
  phone: "+33 6 12 34 56 78",
  /** Photos : déposer les fichiers dans /public puis renseigner le chemin. */
  avatar: undefined as string | undefined,
  portrait: undefined as string | undefined,
} as const;

/** exemple — renseigner les vraies URL */
export const socials: readonly NavLink[] = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/" },
  { label: "GITHUB", href: "https://github.com/" },
  { label: "KAGGLE", href: "https://www.kaggle.com/" },
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
   * Les témoignages de la maquette sont fictifs et attribués à des personnes
   * nommées. Les remplacer par de vrais retours, ou passer ce flag à `false`,
   * avant toute mise en ligne.
   */
  showTestimonials: true,
  showArticles: true,
} as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  title:
    "Étudiant En Data Science Spécialisé En Analyse Et Visualisation De Données.",
  subtitle:
    "Je nettoie, j'explore et je restitue des données métier : dashboards Power BI, analyses Python et requêtes SQL au service de décisions concrètes.",
  cta: { label: "projets sélectionnés", href: "#projets" },
  strip: {
    text: "Découvrez mon parcours, ma formation en data science et les projets qui ont construit ma manière de travailler.",
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
    title: "3. VISUALISATION DE DONNÉES",
    body: "Power BI, Tableau, Matplotlib et Seaborn. Des graphiques choisis pour la question posée, lisibles par des équipes non techniques.",
  },
  {
    title: "4. SQL & GESTION DE BASES DE DONNÉES",
    body: "PostgreSQL et MySQL : requêtes analytiques, CTE, fonctions de fenêtrage, modélisation en étoile pour l'analyse.",
  },
  {
    title: "5. MACHINE LEARNING (BASES)",
    body: "Régression, classification, validation croisée, évaluation des modèles avec scikit-learn — et lecture honnête de leurs limites.",
  },
  {
    title: "6. DASHBOARDING & REPORTING",
    body: "Indicateurs partagés, rafraîchissement planifié, notes de lecture pour que le dashboard reste utilisé après la livraison.",
  },
];

export const skills = {
  title: ["CE QUE JE PEUX", "FAIRE POUR VOUS"],
  intro:
    "De la collecte au dashboard livré, je couvre la chaîne complète d'une analyse : cadrage de la question métier, préparation des données, exploration, restitution.",
  items: skillItems,
} as const;

/* -------------------------------------------------------------------------- */
/* À propos                                                                    */
/* -------------------------------------------------------------------------- */

export const about = {
  title: "À PROPOS DE MOI",
  body: "Je m'appelle Yann Niangara. Après une formation en data science, je me spécialise en data analyse : SQL, Python et Power BI au service de questions métier concrètes. Ce qui m'intéresse, c'est le moment où un chiffre change une décision. Je cherche un stage ou une alternance pour mettre ces compétences au contact du réel.",
  cta: { label: "MON PARCOURS", href: "#contact" },
  /** exemple — chiffres à confirmer */
  stats: [
    { value: 12, label: "Projets data réalisés" },
    { value: 24, label: "Mois de formation en data" },
    { value: 4, label: "Certifications obtenues" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Projets                                                                     */
/* -------------------------------------------------------------------------- */

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
  /** exemple — pointer vers le vrai profil GitHub */
  cta: { label: "VOIR TOUS LES PROJETS", href: "https://github.com/" },
  items: projectItems,
} as const;

/* -------------------------------------------------------------------------- */
/* Stack technique                                                             */
/* -------------------------------------------------------------------------- */

export const stack = {
  title: "STACK TECHNIQUE",
  items: [
    "PYTHON",
    "PANDAS",
    "SQL",
    "POWER BI",
    "TABLEAU",
    "EXCEL",
    "R",
    "GIT",
    "SCIKIT-LEARN",
    "POSTGRESQL",
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
    body: "Python (Pandas, scikit-learn), SQL, Power BI et Tableau au quotidien ; R, Git et Excel avancé en appui.",
  },
  {
    title: "ÊTES-VOUS DISPONIBLE POUR UNE ALTERNANCE ?",
    body: "Oui, sur un rythme 3 semaines en entreprise / 1 semaine en école, dès la rentrée. Un stage de fin d'études est également possible.",
  },
  {
    title: "COMMENT TRAVAILLEZ-VOUS SUR UN PROJET DATA ?",
    body: "Cadrage de la question métier, audit de la qualité des données, exploration, restitution visuelle, puis recommandations chiffrées. Chaque étape est documentée dans un notebook ou un rapport court.",
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

/** exemple — pointer vers les vrais articles */
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
    "Un stage, une alternance ou une mission data : dites-moi ce dont vous avez besoin, je réponds sous 24 h.",
  submitLabel: "ENVOYER",
  submittingLabel: "ENVOI…",
} as const;

export const footer = {
  copyright: "© 2026 YANN NIANGARA — PORTFOLIO DATA ANALYST",
} as const;
