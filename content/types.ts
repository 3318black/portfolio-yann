import type { StripeTint } from "@/components/ui/media-placeholder";

/* -------------------------------------------------------------------------- */
/* Briques                                                                     */
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
/* Sections                                                                    */
/* -------------------------------------------------------------------------- */

export type Identity = {
  readonly name: string;
  readonly role: string;
  readonly availability: string;
  readonly email: string;
  /** Vide → le pied de page omet la ligne, plutôt qu'un numéro inventé. */
  readonly phone: string;
  readonly avatar?: string;
  readonly portrait?: string;
  /** `object-position` CSS du portrait : le point qui reste visible au rognage. */
  readonly portraitFocus?: string;
};

export type HeroContent = {
  readonly title: string;
  readonly subtitle: string;
  readonly cta: NavLink;
  readonly strip: { readonly text: string; readonly cta: NavLink };
};

export type SkillsContent = {
  readonly title: readonly string[];
  readonly intro: string;
  readonly items: readonly AccordionEntry[];
};

export type AboutContent = {
  readonly title: string;
  readonly body: string;
  readonly cta: NavLink;
  readonly stats: readonly { readonly value: number; readonly label: string }[];
};

export type ProjectsContent = {
  readonly title: string;
  readonly intro: string;
  readonly cta: NavLink;
  readonly items: readonly Project[];
};

export type StackContent = {
  readonly title: string;
  readonly items: readonly string[];
};

export type TestimonialsContent = {
  readonly title: string;
  readonly intro: string;
  readonly items: readonly Testimonial[];
};

export type FaqContent = {
  readonly title: readonly string[];
  readonly intro: string;
  readonly items: readonly AccordionEntry[];
};

export type ArticlesContent = {
  readonly title: string;
  readonly intro: string;
  readonly items: readonly Article[];
};

export type ContactContent = {
  readonly title: string;
  readonly intro: string;
  readonly submitLabel: string;
  readonly submittingLabel: string;
  /** Libellés du `<select>`, dans l'ordre de `CONTACT_SUBJECTS`. */
  readonly subjectLabels: Readonly<Record<string, string>>;
  readonly fields: {
    readonly name: string;
    readonly email: string;
    readonly subject: string;
    readonly message: string;
  };
  readonly placeholders: {
    readonly name: string;
    readonly email: string;
    readonly message: string;
  };
  readonly success: string;
  readonly errorGeneric: string;
  readonly errorRateLimit: string;
  /** Messages de validation, transmis au schéma zod du navigateur. */
  readonly validation: {
    readonly nameMin: string;
    readonly nameMax: string;
    readonly emailInvalid: string;
    readonly emailMax: string;
    readonly subjectInvalid: string;
    readonly messageMin: string;
    readonly messageMax: string;
  };
};

/** Libellés d'interface qui ne relèvent d'aucune section. */
export type UiContent = {
  readonly skipToContent: string;
  readonly mainNavLabel: string;
  readonly localeSwitcherLabel: string;
  /** Libellé du bouton d'appel à l'action de l'en-tête. */
  readonly headerContact: string;
  readonly notFound: {
    readonly code: string;
    readonly title: string;
    readonly body: string;
    readonly cta: string;
  };
};

/* -------------------------------------------------------------------------- */
/* Contenu complet d'une langue                                                */
/* -------------------------------------------------------------------------- */

/**
 * Forme que chaque fichier de langue doit satisfaire.
 *
 * C'est le garde-fou de l'internationalisation : une clé oubliée dans une
 * traduction devient une erreur de compilation, pas un trou découvert en
 * production.
 */
export type SiteContent = {
  readonly identity: Identity;
  readonly socials: readonly NavLink[];
  readonly nav: readonly NavLink[];
  readonly sections: {
    readonly showTestimonials: boolean;
    readonly showArticles: boolean;
  };
  readonly ui: UiContent;
  readonly hero: HeroContent;
  readonly skills: SkillsContent;
  readonly about: AboutContent;
  readonly projects: ProjectsContent;
  readonly stack: StackContent;
  readonly testimonials: TestimonialsContent;
  readonly faq: FaqContent;
  readonly articles: ArticlesContent;
  readonly contact: ContactContent;
  readonly footer: { readonly copyright: string };
};
