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
 * Contenu anglais.
 *
 * Adapté et non décalqué : l'intention de chaque phrase est conservée, la
 * formulation est celle qu'un anglophone emploierait. Les ancres restent en
 * français (voir `NAV_ANCHORS`), seuls les libellés changent.
 */
export const en: SiteContent = {
  identity: {
    ...identityShared,
    role: "Data Analyst · Statistics & Machine Learning",
    availability: "Open to opportunities",
  },

  socials,
  sections: sectionFlags,

  nav: [
    { label: "about", href: NAV_ANCHORS.about },
    { label: "projects", href: NAV_ANCHORS.projects },
    { label: "skills", href: NAV_ANCHORS.skills },
    { label: "writing", href: NAV_ANCHORS.articles },
  ],

  ui: {
    skipToContent: "Skip to content",
    mainNavLabel: "Main navigation",
    localeSwitcherLabel: "Choose a language",
    headerContact: "contact",
    notFound: {
      code: "ERROR 404",
      title: "THIS PAGE DOESN'T EXIST",
      body: "The link may be out of date. The whole portfolio lives on a single page.",
      cta: "BACK TO HOME",
    },
  },

  hero: {
    title:
      "Your Data Already Holds The Answers. My Job Is To Make Them Readable.",
    subtitle:
      "Data analyst with a master's in data science. I bring the messiest datasets back into working order, draw reliable statistical and predictive analysis from them, and turn the result into something a team can actually read, in Looker Studio.",
    cta: { label: "selected projects", href: NAV_ANCHORS.projects },
    strip: {
      text: "A look at my background — a computer science degree, application development, then a master's in data science — and the projects that shaped how I work.",
      cta: { label: "about me", href: NAV_ANCHORS.about },
    },
  },

  skills: {
    title: ["WHAT I CAN", "DO FOR YOU"],
    intro:
      "It all starts with a dataset you can trust. I document every cleaning decision, then explain what the analysis proves — and what it doesn't.",
    items: [
      {
        title: "1. DATA CLEANING & PREPARATION",
        body: "The core of my work. Python, Pandas, NumPy: a quality audit before anything else, then missing and outlying values, format normalisation, deduplication, joins across multiple sources. Every correction is justified and traced, and the whole process runs again from end to end.",
      },
      {
        title: "2. STATISTICAL ANALYSIS & EXPLORATION (EDA)",
        body: "A critical read of distributions, correlations, hypothesis tests and segmentation. I document what the data can — and cannot — prove, and I never let a correlation pass for a cause.",
      },
      {
        title: "3. MACHINE LEARNING",
        body: "Regression, classification, cross-validation and model evaluation with scikit-learn. I care as much about measuring performance as about explaining what the model actually learnt, and which variables it leans on.",
      },
      {
        title: "4. VISUALISATION & REPORTING",
        body: "Looker Studio for shared dashboards, Matplotlib and Seaborn for analysis. Charts chosen for the question at hand and annotated, so a non-technical team knows what to do with them.",
      },
      {
        title: "5. SQL & DATABASES",
        body: "PostgreSQL: analytical queries, CTEs, window functions, schema design and modelling built for analysis.",
      },
      {
        title: "6. AUTOMATION",
        body: "Scripts and scheduled jobs that remove recurring manual steps: collection, quality checks, refreshing the deliverables.",
      },
      {
        title: "7. API DEVELOPMENT",
        body: "FastAPI and Flask, carried over from my computer science degree: putting a dataset or a model behind a stable, documented interface, for when a file or a dashboard isn't enough.",
      },
    ],
  },

  about: {
    title: "ABOUT ME",
    body: "I'm Yann Niangara, a data analyst. A computer science degree, some application development, then a master's in data science: that technical background mostly serves one purpose — making data trustworthy before analysing it. That's where I spend most of my time, because an analysis is never worth more than the dataset behind it. Then come the statistics, the machine learning, and the reporting work — explaining a result as clearly as producing it. I'm open to permanent roles, freelance work and apprenticeships alike.",
    cta: { label: "MY BACKGROUND", href: NAV_ANCHORS.contact },
    /** mockup — unverified figures, to confirm or correct */
    stats: [
      { value: 12, label: "Data projects delivered" },
      { value: 24, label: "Months of data training" },
      { value: 4, label: "Certifications earned" },
    ],
  },

  projects: {
    title: "FEATURED PROJECTS",
    intro:
      "Four analyses taken from raw data to recommendation, with the tools used spelled out.",
    cta: { label: "SEE ALL PROJECTS", href: githubProfile },
    items: [
      {
        badge: "MACHINE LEARNING",
        title: "CHURN PREDICTION · KKBOX",
        description:
          "A live retention app for a streaming service. Every Monday, it ranks subscribers by their risk of leaving and tells the agent what to say to each one on the phone. Out of 50 calls a week, the model finds 14 actual churners on average, against 4 for a revenue-based ranking — measured over 76 past weeks it had never seen. Python, XGBoost, scikit-learn, Streamlit.",
        mediaLabel: "live app · monday list",
        tint: "neutral",
        href: "https://appapppy-gm32tcl7sk2qhllhvg9vdv.streamlit.app/",
      },
      /**
       * mockup — the next three projects come from the design and match no
       * real work. To be replaced with actual repositories.
       */
      {
        badge: "POWER BI",
        title: "RETAIL SALES ANALYSIS",
        description:
          "Eighteen months of transactions consolidated into a single dashboard: seasonality, margin by category and store ranking. Three assortment recommendations came out of the analysis. Power BI, SQL, DAX.",
        mediaLabel: "retail sales dashboard screenshot",
        tint: "green",
      },
      {
        badge: "TABLEAU",
        title: "INTERACTIVE HR DASHBOARD",
        description:
          "Turnover, absenteeism and age distribution tracked across 800 employees. Filters by department and seniority. Tableau, Excel, cleaning in Python.",
        mediaLabel: "HR dashboard screenshot",
        tint: "blue",
      },
      {
        badge: "PYTHON & SQL",
        title: "URBAN MOBILITY OPEN DATA",
        description:
          "Public datasets cross-referenced to map the saturation hours of a transport network. PostgreSQL, Pandas, Matplotlib.",
        mediaLabel: "map + Python charts",
        tint: "amber",
      },
    ],
  },

  stack: { title: "TECH STACK", items: stackItems },

  testimonials: {
    title: "WHAT PEOPLE SAY ABOUT MY WORK",
    intro: "Feedback from teachers and teammates on group projects.",
    /** mockup — FICTITIOUS CONTENT, section disabled */
    items: [
      {
        kind: "quote",
        quote:
          "“Yann asks the right questions before touching the data. The group took his sales dashboard exactly as it was.”",
        author: "Claire Fontaine — statistics lecturer",
      },
      {
        kind: "metric",
        value: "96%",
        caption: "accuracy on the churn model, confirmed by cross-validation",
        emphasis: "neon",
      },
      {
        kind: "quote",
        quote:
          "“Rigorous about data quality and clear in how he presents it. He makes the analysis understandable to non-technical people.”",
        author: "Marc Delaunay — supervisor, group data project",
      },
      {
        kind: "quote",
        quote:
          "“He went back through our entire dataset, fixed the duplicates nobody had spotted and restructured the report in two days.”",
        author: "Sarah Amrani — project partner",
      },
      {
        kind: "quote",
        quote:
          "“Independent on SQL and Power BI, and above all able to explain what the number means.”",
        author: "Luc Berrada — programme director",
      },
      {
        kind: "metric",
        value: "- 32%",
        caption: "reporting time after automating the HR dashboard",
        emphasis: "dark",
      },
    ],
  },

  faq: {
    title: ["FREQUENTLY", "ASKED QUESTIONS"],
    intro:
      "What I get asked most often in interviews. Another question? The form is just below.",
    items: [
      {
        title: "WHICH TECHNOLOGIES DO YOU USE?",
        body: "Python (Pandas, NumPy, scikit-learn) and SQL daily, PostgreSQL for databases, Looker Studio for shared dashboards. FastAPI and Flask when a process needs exposing, Git for version control.",
      },
      {
        title: "WHAT KIND OF ROLE ARE YOU LOOKING FOR?",
        body: "I'm open to permanent roles and freelance work, and an apprenticeship remains an option. The format matters less than the subject: projects where data leads to a decision or a tool people actually use.",
      },
      {
        title: "HOW DO YOU APPROACH A DATA PROJECT?",
        body: "Framing the business question, then a systematic quality audit: until the dataset is trustworthy, the analysis means nothing. Exploration follows, modelling where it earns its place, then the reporting — a document, a Looker Studio dashboard or an API, depending on the use. Every cleaning decision is documented and repeatable.",
      },
      {
        title: "HAVE YOU WORKED IN A TEAM?",
        body: "Yes, on several group projects: work split through Git, peer code reviews and presentations to a panel.",
      },
      {
        title: "DO YOU WORK REMOTELY?",
        body: "Hybrid or on-site in the Paris region, with occasional fully remote work.",
      },
      {
        title: "HOW DO WE GET STARTED?",
        body: "A message through the form, then a 20-minute call to understand your data and your priorities.",
      },
    ],
  },

  articles: {
    title: "NOTES & READING",
    intro: "What I read, test and take away about analysis tools and methods.",
    /**
     * mockup — invented articles, placeholder links. Replace them, or hide the
     * whole section through `sectionFlags.showArticles`.
     */
    items: [
      {
        category: "METHOD",
        date: "12 JUNE 2026",
        title: "CLEANING A DATASET IN 5 REPEATABLE STEPS",
        excerpt:
          "The checklist I run before any analysis, from column typing to keeping a trace of every correction.",
        href: githubProfile,
      },
      {
        category: "TOOLS",
        date: "28 MAY 2026",
        title: "POWER BI OR TABLEAU: HOW I CHOOSE",
        excerpt:
          "A comparison on the same retail dataset: modelling, prototyping speed and sharing across a team.",
        href: githubProfile,
      },
    ],
  },

  contact: {
    title: "LET'S WORK TOGETHER",
    intro:
      "A role, a freelance project or an apprenticeship: tell me what you need and I'll reply within 24 hours.",
    submitLabel: "SEND",
    submittingLabel: "SENDING…",
    subjectLabels: {
      job: "Permanent role",
      apprenticeship: "Apprenticeship",
      freelance: "Freelance project",
      other: "Something else",
    },
    fields: {
      name: "NAME",
      email: "EMAIL",
      subject: "SUBJECT",
      message: "MESSAGE",
    },
    placeholders: {
      name: "Your name",
      email: "you@company.com",
      message: "Tell me about your data…",
    },
    success: "Message sent. I'll reply within 24 hours.",
    errorGeneric: "Sending failed. Try again, or email me directly.",
    errorRateLimit: "Too many messages sent. Try again in a few minutes.",
    validation: {
      nameMin: "Your name must be at least 2 characters.",
      nameMax: "Your name can't be longer than 80 characters.",
      emailInvalid: "Invalid email address.",
      emailMax: "This address is too long.",
      subjectInvalid: "Pick a subject from the list.",
      messageMin:
        "Describe what you need in a few words (20 characters minimum).",
      messageMax: "Please keep it under 2000 characters.",
    },
  },

  footer: { copyright: "© 2026 YANN NIANGARA — DATA ANALYST PORTFOLIO" },
};
