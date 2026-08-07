"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Field, errorId } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ContactContent } from "@/content/types";
import {
  CONTACT_SUBJECTS,
  buildContactSchema,
  type ContactInput,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ content }: { content: ContactContent }) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverError, setServerError] = React.useState<string>();

  // Le schéma est reconstruit si la langue change : seuls les messages
  // diffèrent, les règles restent celles que le serveur applique.
  const schema = React.useMemo(
    () => buildContactSchema(content.validation),
    [content.validation],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { subject: "job", company: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("submitting");
    setServerError(undefined);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setServerError(
          response.status === 429
            ? content.errorRateLimit
            : content.errorGeneric,
        );
        setStatus("error");
        return;
      }

      // La saisie n'est effacée qu'en cas de succès : après un échec réseau,
      // le message rédigé doit rester disponible pour un nouvel essai.
      reset({
        name: "",
        email: "",
        subject: "job",
        message: "",
        company: "",
      });
      setStatus("success");
    } catch {
      setServerError(content.errorGeneric);
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Leurre anti-spam : masqué visuellement et retiré de l'ordre de
          tabulation, donc invisible pour un humain comme pour un lecteur
          d'écran, mais rempli par la plupart des robots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company">Société</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
        <Field
          label={content.fields.name}
          htmlFor="name"
          error={errors.name?.message}
        >
          <Input
            id="name"
            type="text"
            placeholder={content.placeholders.name}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            {...register("name")}
          />
        </Field>

        <Field
          label={content.fields.email}
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder={content.placeholders.email}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <Field
        label={content.fields.subject}
        htmlFor="subject"
        error={errors.subject?.message}
        className="mt-3.5"
      >
        <Select
          id="subject"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? errorId("subject") : undefined}
          {...register("subject")}
        >
          {/* La valeur envoyée est une clé neutre, seul le libellé est traduit :
              changer de langue ne casse donc pas la validation serveur. */}
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {content.subjectLabels[subject]}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label={content.fields.message}
        htmlFor="message"
        error={errors.message?.message}
        className="mt-3.5"
      >
        <Textarea
          id="message"
          rows={4}
          placeholder={content.placeholders.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId("message") : undefined}
          {...register("message")}
        />
      </Field>

      <Button
        type="submit"
        variant="neon"
        size="caps"
        disabled={isSubmitting}
        className="mt-5 px-[30px] py-3.5"
      >
        {isSubmitting ? content.submittingLabel : content.submitLabel}
      </Button>

      <p
        role="status"
        aria-live="polite"
        className="mt-4 text-[13px] text-neon"
      >
        {status === "success" ? content.success : null}
      </p>

      {status === "error" && serverError ? (
        <p role="alert" className="mt-1 text-[13px] text-danger">
          {serverError}
        </p>
      ) : null}
    </form>
  );
}
