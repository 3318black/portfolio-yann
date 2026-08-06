import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[720px] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.1em] text-neon">ERREUR 404</p>
      <h1 className="mt-4 font-display text-section font-bold">
        CETTE PAGE N&apos;EXISTE PAS
      </h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-fg-muted">
        Le lien est peut-être obsolète. Tout le portfolio tient sur une seule
        page.
      </p>
      <Button href="/" variant="neon" size="caps" className="mt-8">
        RETOUR À L&apos;ACCUEIL
      </Button>
    </main>
  );
}
