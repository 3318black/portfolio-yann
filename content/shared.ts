import type { NavLink } from "@/content/types";

/**
 * Valeurs identiques dans toutes les langues.
 *
 * Les garder ici évite de répéter une adresse email ou une URL dans trois
 * fichiers — et donc de n'en corriger que deux le jour où elle change.
 */

export const identityShared = {
  name: "Yann Niangara",
  email: "niangara33@gmail.com",
  /**
   * Vide tant qu'aucun numéro n'est communiqué : le pied de page omet alors la
   * ligne, plutôt que d'afficher un numéro inventé cliquable.
   */
  phone: "",
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

export const githubProfile = "https://github.com/3318black";

export const sectionFlags = {
  /**
   * Désactivé : les témoignages de la maquette sont fictifs et attribués à des
   * personnes nommées qui n'existent pas. Ne repasser ce drapeau à `true`
   * qu'après avoir remplacé le contenu par de vrais retours.
   */
  showTestimonials: false,
  showArticles: true,
} as const;

/**
 * Noms d'outils : ils ne se traduisent pas.
 *
 * POWER BI, TABLEAU, EXCEL et R viennent de la maquette et n'ont pas été
 * confirmés — Looker Studio est l'outil de restitution cité. Les retirer s'ils
 * ne sont pas réellement pratiqués.
 */
export const stackItems: readonly string[] = [
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
];

/**
 * Les ancres restent en français dans les trois langues : les traduire
 * casserait les liens déjà partagés, pour un gain nul en référencement.
 */
export const NAV_ANCHORS = {
  about: "#apropos",
  projects: "#projets",
  skills: "#competences",
  articles: "#veille",
  contact: "#contact",
} as const;
