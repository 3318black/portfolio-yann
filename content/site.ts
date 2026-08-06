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
  role: "Data Analyst · Statistiques & Machine Learning",
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
    "Data Analyst, Je Nettoie Les Données Avec Méthode Et J'Explique Ce Qu'Elles Disent.",
  subtitle:
    "Aucune conclusion sans un jeu de données fiable : nettoyage documenté et reproductible, statistiques et machine learning, restitution lisible sous Looker Studio.",
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
    body: "Le cœur de mon travail. Python, Pandas, NumPy : audit de la qualité avant toute chose, traitement des valeurs manquantes et aberrantes, normalisation des formats, déduplication, jointures de sources multiples. Chaque correction est justifiée et tracée, et le traitement est reproductible d'un bout à l'autre.",
  },
  {
    title: "2. ANALYSE STATISTIQUE & EXPLORATION (EDA)",
    body: "Lecture critique des distributions, corrélations, tests d'hypothèses, segmentation. Je documente ce que les données peuvent — et ne peuvent pas — démontrer, et je distingue toujours une corrélation d'une causalité.",
  },
  {
    title: "3. MACHINE LEARNING",
    body: "Régression, classification, validation croisée et évaluation des modèles avec scikit-learn. Je m'attache autant à mesurer la performance qu'à expliquer ce que le modèle a réellement appris, et sur quelles variables il s'appuie.",
  },
  {
    title: "4. VISUALISATION & RESTITUTION",
    body: "Looker Studio pour les tableaux de bord partagés, Matplotlib et Seaborn pour l'analyse. Des graphiques choisis pour la question posée et commentés, pour qu'une équipe non technique sache quoi en faire.",
  },
  {
    title: "5. SQL & BASES DE DONNÉES",
    body: "PostgreSQL : requêtes analytiques, CTE, fonctions de fenêtrage, conception de schéma et modélisation pour l'analyse.",
  },
  {
    title: "6. AUTOMATISATION",
    body: "Scripts et traitements planifiés pour supprimer les étapes manuelles récurrentes : collecte, contrôle de qualité, rafraîchissement des livrables.",
  },
  {
    title: "7. DÉVELOPPEMENT D'API",
    body: "FastAPI et Flask, hérités de ma licence en informatique : exposer un jeu de données ou un modèle derrière une interface stable et documentée, quand un fichier ou un tableau de bord ne suffit pas.",
  },
];

export const skills = {
  title: ["CE QUE JE PEUX", "FAIRE POUR VOUS"],
  intro:
    "Tout part d'un jeu de données fiable. Je documente chaque décision de nettoyage, puis j'explique ce que l'analyse démontre — et ce qu'elle ne démontre pas.",
  items: skillItems,
} as const;

/* -------------------------------------------------------------------------- */
/* À propos                                                                    */
/* -------------------------------------------------------------------------- */

export const about = {
  title: "À PROPOS DE MOI",
  body: "Je m'appelle Yann Niangara, data analyst. Une licence en informatique, du développement d'applications, puis un master en data science : ce parcours technique me sert surtout à fiabiliser la donnée avant de l'analyser. C'est là que je passe le plus de temps, parce qu'une analyse ne vaut jamais mieux que le jeu de données qui la porte. Ensuite viennent les statistiques, le machine learning, et le travail de restitution — expliquer un résultat aussi clairement que l'obtenir. Je suis ouvert au CDI, aux missions freelance comme à l'alternance.",
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
   * confirmés — Looker Studio est l'outil de restitution cité. Les retirer
   * s'ils ne sont pas réellement pratiqués.
   */
  items: [
    "PYTHON",
    "PANDAS",
    "NUMPY",
    "SCIKIT-LEARN",
    "SQL",
    "POSTGRESQL",
    "LOOKER STUDIO",
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
    body: "Python (Pandas, NumPy, scikit-learn) et SQL au quotidien, PostgreSQL pour les bases, Looker Studio pour les tableaux de bord partagés. FastAPI et Flask quand un traitement doit être exposé, Git pour le versionnement.",
  },
  {
    title: "QUEL TYPE DE POSTE RECHERCHEZ-VOUS ?",
    body: "Je suis ouvert au CDI comme aux missions freelance, et l'alternance reste envisageable. Le format compte moins que le sujet : les projets où la donnée débouche sur une décision ou un outil réellement utilisé.",
  },
  {
    title: "COMMENT TRAVAILLEZ-VOUS SUR UN PROJET DATA ?",
    body: "Cadrage de la question métier, puis un audit de qualité systématique : tant que le jeu de données n'est pas fiable, l'analyse ne veut rien dire. Viennent ensuite l'exploration, la modélisation si elle se justifie, et la restitution — rapport, tableau de bord Looker Studio ou API selon l'usage. Chaque décision de nettoyage est documentée et reproductible.",
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
