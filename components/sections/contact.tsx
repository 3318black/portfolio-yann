import { ContactForm } from "@/components/sections/contact-form";
import { Card } from "@/components/ui/card";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { ContactContent, Identity } from "@/content/types";

export function Contact({
  content,
  identity,
}: {
  content: ContactContent;
  identity: Identity;
}) {
  return (
    <Section
      id="contact"
      aria-labelledby="contact-title"
      className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-[clamp(24px,3vw,48px)] pb-[clamp(56px,7vw,88px)]"
    >
      <Reveal>
        <MediaPlaceholder
          src={identity.portrait}
          alt={identity.portrait ? identity.name : ""}
          objectPosition={identity.portraitFocus}
          label="portrait secondaire"
          tint="surface"
          sizes="(max-width: 700px) 100vw, 50vw"
          className="flex h-full min-h-[360px] items-end rounded-panel border border-line-panel p-[18px]"
          overlay={
            <span
              aria-hidden
              className="absolute right-[18px] bottom-[18px] flex size-12 items-center justify-center rounded-full bg-neon text-xs font-bold text-ink"
            >
              ↓
            </span>
          }
        />
      </Reveal>

      <Reveal>
        <Card radius="panel" padding="lg" className="h-full">
          <h2 id="contact-title" className="font-display text-panel font-bold">
            {content.title}
          </h2>
          <p className="mt-2.5 mb-6 text-sm leading-[1.6] text-fg-muted">
            {content.intro}
          </p>
          <ContactForm content={content} />
        </Card>
      </Reveal>
    </Section>
  );
}
