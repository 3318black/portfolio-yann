import { notFound } from "next/navigation";

import { About } from "@/components/sections/about";
import { Articles } from "@/components/sections/articles";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Skills } from "@/components/sections/skills";
import { Stack } from "@/components/sections/stack";
import { Testimonials } from "@/components/sections/testimonials";
import { getContent, isLocale } from "@/content/index";
import { NAV_ANCHORS } from "@/content/shared";

/**
 * Point unique de résolution de la langue.
 *
 * Le contenu est chargé ici puis distribué en props : les sections restent des
 * composants serveur sans import de contenu, donc réutilisables telles quelles
 * dans n'importe quelle langue.
 */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = getContent(lang);

  return (
    <>
      <SiteHeader
        identity={content.identity}
        nav={content.nav}
        ui={content.ui}
        locale={lang}
        contactLabel={content.ui.headerContact}
        contactHref={NAV_ANCHORS.contact}
      />
      <main>
        <Hero content={content.hero} identity={content.identity} />
        <Skills content={content.skills} />
        <About content={content.about} socials={content.socials} />
        <Projects content={content.projects} />
        <Stack content={content.stack} />
        {content.sections.showTestimonials ? (
          <Testimonials content={content.testimonials} />
        ) : null}
        <Faq content={content.faq} />
        {content.sections.showArticles ? (
          <Articles content={content.articles} />
        ) : null}
        <Contact content={content.contact} identity={content.identity} />
      </main>
      <SiteFooter
        identity={content.identity}
        socials={content.socials}
        copyright={content.footer.copyright}
      />
    </>
  );
}
