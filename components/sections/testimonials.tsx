import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/content/site";

export function Testimonials() {
  return (
    <Section aria-labelledby="temoignages-title">
      <Reveal>
        <SectionHeading
          id="temoignages-title"
          title={testimonials.title}
          intro={testimonials.intro}
          introClassName="max-w-[520px]"
          className="mb-[clamp(24px,4vw,36px)]"
        />
      </Reveal>

      <Reveal
        mode="stagger"
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5"
      >
        {testimonials.items.map((item) =>
          item.kind === "quote" ? (
            <Card key={item.author}>
              <figure className="m-0">
                <blockquote className="m-0 text-[15px] leading-[1.65]">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 text-xs text-fg-muted">
                  {item.author}
                </figcaption>
              </figure>
            </Card>
          ) : (
            <Card
              key={item.caption}
              variant={item.emphasis === "neon" ? "neon" : "default"}
              className="flex flex-col justify-between"
            >
              <p
                className={
                  item.emphasis === "neon"
                    ? "font-display text-[46px] leading-none font-bold"
                    : "font-display text-[46px] leading-none font-bold text-neon"
                }
              >
                {item.value}
              </p>
              <p
                className={
                  item.emphasis === "neon"
                    ? "mt-4 text-[13px] leading-[1.5] font-bold"
                    : "mt-4 text-[13px] leading-[1.5] text-fg-muted"
                }
              >
                {item.caption}
              </p>
            </Card>
          ),
        )}
      </Reveal>
    </Section>
  );
}
