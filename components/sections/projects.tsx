import { ProjectCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProjectsContent } from "@/content/types";

export function Projects({ content }: { content: ProjectsContent }) {
  return (
    <Section id="projets" aria-labelledby="projets-title">
      <Reveal>
        <SectionHeading
          id="projets-title"
          title={content.title}
          intro={content.intro}
          introClassName="max-w-[520px]"
          className="mb-[clamp(28px,4vw,40px)]"
        />
      </Reveal>

      <div className="flex flex-col gap-[clamp(20px,3vw,30px)]">
        {content.items.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <Reveal className="mt-[clamp(28px,4vw,40px)] flex justify-center">
        <Button href={content.cta.href} variant="outline" size="caps">
          {content.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
