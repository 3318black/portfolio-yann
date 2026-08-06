import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionSplit } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/content/site";

export function Skills() {
  return (
    <Section id="competences" aria-labelledby="competences-title">
      <SectionSplit>
        <Reveal>
          <SectionHeading
            id="competences-title"
            title={skills.title}
            intro={skills.intro}
            introClassName="max-w-[340px]"
          />
        </Reveal>

        <Reveal>
          <Accordion items={skills.items} defaultOpen={0} />
        </Reveal>
      </SectionSplit>
    </Section>
  );
}
