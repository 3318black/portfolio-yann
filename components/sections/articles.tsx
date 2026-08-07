import { Card } from "@/components/ui/card";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ArticlesContent } from "@/content/types";

export function Articles({ content }: { content: ArticlesContent }) {
  return (
    <Section id="veille" aria-labelledby="veille-title">
      <Reveal>
        <SectionHeading
          id="veille-title"
          title={content.title}
          intro={content.intro}
          introClassName="max-w-[520px]"
          className="mb-[clamp(24px,4vw,36px)]"
        />
      </Reveal>

      <Reveal
        mode="stagger"
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
      >
        {content.items.map((article) => (
          <a
            key={article.title}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-opacity hover:opacity-90"
          >
            <Card padding="none" className="overflow-hidden">
              <MediaPlaceholder
                src={article.image}
                alt={article.image ? article.title : ""}
                label="illustration article"
                labelPosition="center"
                tint="panel"
                angle={115}
                stripeWidth={10}
                sizes="(max-width: 700px) 100vw, 50vw"
                className="h-[200px]"
              />
              <div className="p-[22px]">
                <p className="mb-2.5 font-mono text-[11px] text-fg-muted">
                  {article.category} · {article.date}
                </p>
                <h3 className="mb-2.5 text-lg font-bold tracking-[0.02em]">
                  {article.title}
                </h3>
                <p className="text-sm leading-[1.6] text-fg-muted">
                  {article.excerpt}
                </p>
              </div>
            </Card>
          </a>
        ))}
      </Reveal>
    </Section>
  );
}
