import { footer, identity, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-neon text-ink">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-[clamp(20px,5vw,64px)] py-[26px] font-mono text-xs">
        <a
          href={`mailto:${identity.email}`}
          className="transition-opacity hover:opacity-75"
        >
          {identity.email}
        </a>
        {/* Omis tant qu'aucun numéro n'est renseigné : mieux vaut un pied de
            page à deux entrées qu'un numéro inventé, cliquable de surcroît. */}
        {identity.phone ? (
          <a
            href={`tel:${identity.phone.replace(/\s/g, "")}`}
            className="transition-opacity hover:opacity-75"
          >
            {identity.phone}
          </a>
        ) : null}
        <ul className="flex gap-4">
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
      </div>
      <p className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)] pb-[22px] font-mono text-[11px] opacity-65">
        {footer.copyright}
      </p>
    </footer>
  );
}
