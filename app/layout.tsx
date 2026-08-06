import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { hero, identity } from "@/content/site";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${identity.name} — ${identity.role}`,
    template: `%s — ${identity.name}`,
  },
  description: hero.subtitle,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: identity.name,
    title: `${identity.name} — ${identity.role}`,
    description: hero.subtitle,
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.role}`,
    description: hero.subtitle,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

/**
 * Rétablit la visibilité des blocs animés quand JavaScript est absent.
 *
 * Ces blocs partent d'une opacité nulle (voir globals.css) en attendant que
 * GSAP les révèle. Sans JavaScript, personne ne les révélerait : cette règle
 * les rend visibles d'emblée, et le contenu ne dépend jamais d'un script pour
 * être lisible.
 *
 * `<noscript>` plutôt qu'un script qui poserait une classe sur `<html>` : le
 * navigateur exécuterait ce script avant l'hydratation, et React signalerait
 * alors un écart entre l'attribut rendu par le serveur et celui du client.
 */
const NOSCRIPT_REVEAL_STYLE = `[data-reveal="self"],[data-reveal="stagger"]>*,[data-word]{opacity:1!important}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_REVEAL_STYLE }} />
        </noscript>
      </head>
      <body className="bg-ink font-sans text-fg antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-pill focus:bg-neon focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Aller au contenu
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
