import { NextResponse } from "next/server";
import { Resend } from "resend";

import { ContactNotification } from "@/emails/contact-notification";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

// Le SDK Resend s'appuie sur l'environnement Node, pas sur le runtime Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { allowed, retryAfter } = checkRateLimit(clientKey(request.headers));
  if (!allowed) {
    return NextResponse.json(
      { ok: false },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Revalidation systématique : le schéma du navigateur n'engage que le
  // navigateur, et rien n'empêche d'appeler cette route directement.
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, subject, message, company } = parsed.data;

  // Leurre rempli : on répond comme si tout s'était bien passé. Un rejet
  // explicite apprendrait au robot quel champ éviter au prochain essai.
  if (company && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Configuration incomplète : RESEND_API_KEY, CONTACT_TO_EMAIL et CONTACT_FROM_EMAIL sont requis.",
    );
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      // Permet de répondre au visiteur d'un simple « Répondre ».
      replyTo: email,
      subject: `[Portfolio] ${subject} — ${name}`,
      react: ContactNotification({ name, email, subject, message }),
    });

    if (error) {
      // Le détail reste dans les journaux du serveur : le renvoyer au client
      // exposerait la configuration du fournisseur.
      console.error("[contact] Échec de l'envoi Resend :", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Erreur inattendue :", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
