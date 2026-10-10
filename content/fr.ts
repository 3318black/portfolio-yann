import {
  NAV_ANCHORS,
  githubProfile,
  identityShared,
  sectionFlags,
  socials,
  stackItems,
} from "@/content/shared";
import type { SiteContent } from "@/content/types";

/**
 * Contenu français — version de référence.
 *
 * Identité, positionnement, compétences, stack, FAQ et contact décrivent le
 * profil réel. Restent issus de la maquette, donc **non vérifiés** : les quatre
 * projets, les deux articles de veille, les statistiques et les témoignages
 * (ces derniers désactivés, voir `sectionFlags`). Ils sont signalés par un
 * commentaire « maquette » et suivis dans TASKS.md.
 */
export const fr: SiteContent = {
  identity: {
    ...identityShared,
    role: "Data Analyst · Statistiques & Machine Learning",
    availability: "Ouvert aux opportunités",
  },

  socials,
  sections: sectionFlags,

  nav: [
    { label: "à propos", href: NAV_ANCHORS.about },
    { label: "projets", href: NAV_ANCHORS.projects },
    { label: "compétences", href: NAV_ANCHORS.skills },
    { label: "veille", href: NAV_ANCHORS.articles },
  ],

  ui: {
    skipToContent: "Aller au contenu",
    mainNavLabel: "Navigation principale",
    localeSwitcherLabel: "Choisir la langue",
    headerContact: "contact",
    notFound: {
      code: "ERREUR 404",
      title: "CETTE PAGE N'EXISTE PAS",
      body: "Le lien est peut-être obsolète. Tout le portfolio tient sur une seule page.",
      cta: "RETOUR À L'ACCUEIL",
    },
  },

  hero: {
    title:
      "Vos Données Contiennent Déjà Les Réponses. Mon Métier Est De Les Rendre Lisibles.",
    subtitle:
      "Data analyst diplômé en data science. Je remets en état les jeux de données les plus imparfaits, j'en tire des analyses statistiques et prédictives fiables, et j'en restitue une lecture claire sous Looker Studio.",
    cta: { label: "projets sélectionnés", href: NAV_ANCHORS.projects },
    strip: {
      text: "Découvrez mon parcours — licence en informatique, développement d'applications, master en data science — et les projets qui ont construit ma manière de travailler.",
      cta: { label: "à propos de moi", href: NAV_ANCHORS.about },
    },
  },

  skills: {
    title: ["CE QUE JE PEUX", "FAIRE POUR VOUS"],
    intro:
      "Tout part d'un jeu de données fiable. Je documente chaque décision de nettoyage, puis j'explique ce que l'analyse démontre — et ce qu'elle ne démontre pas.",
    items: [
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
    ],
  },

  about: {
    title: "À PROPOS DE MOI",
    body: "Je m'appelle Yann Niangara, data analyst. Une licence en informatique, du développement d'applications, puis un master en data science : ce parcours technique me sert surtout à fiabiliser la donnée avant de l'analyser. C'est là que je passe le plus de temps, parce qu'une analyse ne vaut jamais mieux que le jeu de données qui la porte. Ensuite viennent les statistiques, le machine learning, et le travail de restitution — expliquer un résultat aussi clairement que l'obtenir. Je suis ouvert au CDI, aux missions freelance comme à l'alternance.",
    cta: { label: "MON PARCOURS", href: NAV_ANCHORS.contact },
    /** maquette — chiffres non vérifiés, à confirmer ou à corriger */
    stats: [
      { value: 12, label: "Projets data réalisés" },
      { value: 24, label: "Mois de formation en data" },
      { value: 4, label: "Certifications obtenues" },
    ],
  },

  projects: {
    title: "PROJETS PHARES",
    intro:
      "Quatre analyses menées de la donnée brute à la recommandation, avec le détail des outils employés.",
    cta: { label: "VOIR TOUS LES PROJETS", href: githubProfile },
    items: [
      {
        badge: "MACHINE LEARNING",
        title: "PRÉDICTION DE CHURN · KKBOX",
        description:
          "Chaque lundi, les abonnés d'un service de streaming classés par risque de départ, avec jusqu'à trois motifs sur lesquels agir. Sur 50 appels par semaine, le modèle désigne en moyenne 14 vrais départs, contre 4 pour un tri par revenu — validation chronologique sur 76 semaines jamais vues. Mené en binôme avec un collègue. Python, XGBoost, scikit-learn, Streamlit.",
        mediaLabel: "liste du lundi · motifs par abonné",
        tint: "neutral",
        href: "https://github.com/3318black/nsy-churn",
      },
      /**
       * maquette — les trois projets suivants sont ceux du design, ils ne
       * correspondent à aucun travail réel. À remplacer par de vrais dépôts.
       */
      {
        badge: "POWER BI",
        title: "ANALYSE DES VENTES RETAIL",
        description:
          "18 mois de transactions consolidés en un dashboard unique : saisonnalité, marge par catégorie et classement des magasins. Trois recommandations d'assortiment issues de l'analyse. Power BI, SQL, DAX.",
        mediaLabel: "capture dashboard ventes retail",
        tint: "green",
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
    ],
  },

  stack: { title: "STACK TECHNIQUE", items: stackItems },

  testimonials: {
    title: "CE QU'ON DIT DE MON TRAVAIL",
    intro: "Retours d'enseignants et de camarades de projet collectif.",
    /** maquette — CONTENU FICTIF, section désactivée */
    items: [
      {
        kind: "quote",
        quote:
          "« Yann pose les bonnes questions avant de toucher aux données. Son dashboard sur les ventes a été repris tel quel par le groupe projet. »",
        author: "Claire Fontaine — enseignante en statistiques",
      },
      {
        kind: "metric",
        value: "96 %",
        caption:
          "de précision sur le modèle de churn, validé en cross-validation",
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
        caption:
          "de temps de reporting après automatisation du tableau de bord RH",
        emphasis: "dark",
      },
    ],
  },

  faq: {
    title: ["QUESTIONS", "FRÉQUENTES"],
    intro:
      "Ce qu'on me demande le plus souvent en entretien. Une autre question ? Le formulaire est juste en dessous.",
    items: [
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
    ],
  },

  articles: {
    title: "VEILLE DATA",
    intro:
      "Ce que je lis, teste et retiens sur les outils et les méthodes d'analyse.",
    /**
     * maquette — articles inventés, liens factices. Les remplacer, ou masquer
     * la section entière via `sectionFlags.showArticles`.
     */
    items: [
      {
        category: "MÉTHODE",
        date: "12 JUIN 2026",
        title: "NETTOYER UN JEU DE DONNÉES EN 5 ÉTAPES REPRODUCTIBLES",
        excerpt:
          "La checklist que j'applique avant toute analyse, du typage des colonnes à la traçabilité des corrections.",
        href: githubProfile,
      },
      {
        category: "OUTILS",
        date: "28 MAI 2026",
        title: "POWER BI OU TABLEAU : COMMENT JE CHOISIS",
        excerpt:
          "Comparaison sur un même jeu de données retail : modélisation, rapidité de prototypage et partage en équipe.",
        href: githubProfile,
      },
    ],
  },

  contact: {
    title: "TRAVAILLONS ENSEMBLE",
    intro:
      "Un poste, une mission freelance ou une alternance : dites-moi ce dont vous avez besoin, je réponds sous 24 h.",
    submitLabel: "ENVOYER",
    submittingLabel: "ENVOI…",
    subjectLabels: {
      job: "Poste (CDI/CDD)",
      apprenticeship: "Alternance",
      freelance: "Mission freelance",
      other: "Autre",
    },
    fields: {
      name: "NOM",
      email: "EMAIL",
      subject: "SUJET",
      message: "MESSAGE",
    },
    placeholders: {
      name: "Votre nom",
      email: "vous@entreprise.com",
      message: "Parlez-moi de vos données…",
    },
    success: "Message envoyé. Je réponds sous 24 h.",
    errorGeneric:
      "L'envoi a échoué. Réessayez, ou écrivez-moi directement par email.",
    errorRateLimit:
      "Trop de messages envoyés. Réessayez dans quelques minutes.",
    validation: {
      nameMin: "Votre nom doit contenir au moins 2 caractères.",
      nameMax: "Votre nom ne peut pas dépasser 80 caractères.",
      emailInvalid: "Adresse email invalide.",
      emailMax: "Cette adresse est trop longue.",
      subjectInvalid: "Choisissez un sujet dans la liste.",
      messageMin:
        "Décrivez votre besoin en quelques mots (20 caractères minimum).",
      messageMax: "Merci de rester sous 2000 caractères.",
    },
  },

  footer: { copyright: "© 2026 YANN NIANGARA — PORTFOLIO DATA ANALYST" },
};
