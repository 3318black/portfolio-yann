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
import { sections } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Skills />
        <About />
        <Projects />
        <Stack />
        {sections.showTestimonials ? <Testimonials /> : null}
        <Faq />
        {sections.showArticles ? <Articles /> : null}
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
