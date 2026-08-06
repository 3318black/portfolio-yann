import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionSplit } from "@/components/ui/section";
import { Stat } from "@/components/ui/stat";
import { about, socials } from "@/content/site";

export function About() {
  return (
    <Section id="apropos" aria-labelledby="apropos-title">
      <SectionSplit className="items-start">
        <Reveal>
          <h2
            id="apropos-title"
            className="font-display text-section font-bold"
          >
            {about.title}
          </h2>
          <p className="mt-4 max-w-[480px] text-[15px] leading-[1.7] text-fg-muted">
            {about.body}
          </p>

          <ul className="mt-7 flex flex-wrap items-center gap-5 font-mono text-xs text-fg-muted">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-75"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <Button
            href={about.cta.href}
            variant="neon"
            size="caps"
            className="mt-7"
          >
            {about.cta.label}
          </Button>
        </Reveal>

        <Reveal
          mode="stagger"
          className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-6"
        >
          {about.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </Reveal>
      </SectionSplit>
    </Section>
  );
}
