import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { stack } from "@/content/site";

export function Stack() {
  return (
    <Section aria-labelledby="stack-title">
      <Reveal>
        <h2
          id="stack-title"
          className="mb-6 font-display text-section font-bold"
        >
          {stack.title}
        </h2>
      </Reveal>

      <Reveal
        mode="stagger"
        stagger={0.03}
        y={12}
        className="flex flex-wrap gap-3"
      >
        {stack.items.map((item) => (
          <Badge key={item} variant="tag">
            {item}
          </Badge>
        ))}
      </Reveal>
    </Section>
  );
}
