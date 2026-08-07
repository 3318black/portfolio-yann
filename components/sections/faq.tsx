import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionSplit } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FaqContent } from "@/content/types";

export function Faq({ content }: { content: FaqContent }) {
  return (
    <Section aria-labelledby="faq-title">
      <SectionSplit className="items-start gap-[clamp(28px,4vw,56px)]">
        <Reveal>
          <SectionHeading
            id="faq-title"
            title={content.title}
            intro={content.intro}
            introClassName="max-w-[340px]"
          />
        </Reveal>

        <Reveal>
          <Accordion items={content.items} size="compact" />
        </Reveal>
      </SectionSplit>
    </Section>
  );
}
