import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionSplit } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/content/site";

export function Faq() {
  return (
    <Section aria-labelledby="faq-title">
      <SectionSplit className="items-start gap-[clamp(28px,4vw,56px)]">
        <Reveal>
          <SectionHeading
            id="faq-title"
            title={faq.title}
            intro={faq.intro}
            introClassName="max-w-[340px]"
          />
        </Reveal>

        <Reveal>
          <Accordion items={faq.items} size="compact" />
        </Reveal>
      </SectionSplit>
    </Section>
  );
}
