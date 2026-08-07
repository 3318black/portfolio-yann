import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import type { HeroContent, Identity } from "@/content/types";

export function Hero({
  content,
  identity,
}: {
  content: HeroContent;
  identity: Identity;
}) {
  return (
    <section
      id="contenu"
      aria-labelledby="hero-title"
      className="mx-auto max-w-[1100px] px-[clamp(20px,5vw,48px)] pt-[clamp(48px,9vw,120px)] pb-[clamp(48px,7vw,80px)] text-center"
    >
      <AnimatedHeading
        id="hero-title"
        text={content.title}
        className="mx-auto max-w-[940px] font-display text-hero leading-[1.16] font-medium tracking-[-0.02em] text-neon-soft"
      />

      <Reveal immediate delay={0.4} mode="stagger" stagger={0.12}>
        <p className="mx-auto mt-[clamp(24px,3vw,34px)] max-w-[620px] text-base leading-[1.6] text-fg-tertiary">
          {content.subtitle}
        </p>

        <div className="mt-[clamp(28px,4vw,42px)] flex justify-center">
          <Button href={content.cta.href} variant="surface" size="md">
            {content.cta.label}
          </Button>
        </div>

        <Card
          variant="raised"
          radius="strip"
          padding="md"
          className="mt-[clamp(40px,7vw,88px)] flex flex-wrap items-center gap-5 text-left"
        >
          <Avatar src={identity.avatar} alt="" size={52} />
          <p className="flex-1 basis-[260px] text-[15px] leading-[1.6] text-fg-tertiary">
            {content.strip.text}
          </p>
          <Button href={content.strip.cta.href} variant="secondary" size="sm">
            {content.strip.cta.label}
          </Button>
        </Card>
      </Reveal>
    </section>
  );
}
