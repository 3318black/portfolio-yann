import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionSplit } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SkillsContent } from "@/content/types";

export function Skills({ content }: { content: SkillsContent }) {
  return (
    <Section id="competences" aria-labelledby="competences-title">
      <SectionSplit>
        <Reveal>
          <SectionHeading
            id="competences-title"
            title={content.title}
            intro={content.intro}
            introClassName="max-w-[340px]"
          />
        </Reveal>

        <Reveal>
          <Accordion items={content.items} defaultOpen={0} />
        </Reveal>
      </SectionSplit>
    </Section>
  );
}
