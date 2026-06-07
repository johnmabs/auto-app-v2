"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { cn } from "@/lib/utils";

import { submitContactAction } from "../actions/submit-contact.action";
import { SUBJECT_OPTIONS } from "../constants/contact.constants";
import type { ContactFormState } from "../types";
import { FormInput } from "./contact-form-input";
import { FormTextarea } from "./contact-form-textarea";

const initialState: ContactFormState = {
  success: false,
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    submitContactAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? "Message envoyé avec succès.");
      formRef.current?.reset();
      return;
    }

    if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      {!state.success && state.message && (
        <p className="rounded-(--r) border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {state.message}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <FormInput
          name="firstName"
          label="Prénom"
          autoComplete="given-name"
          defaultValue={state.values?.firstName}
          error={state.errors?.firstName?.[0]}
        />

        <FormInput
          name="lastName"
          label="Nom"
          autoComplete="family-name"
          defaultValue={state.values?.lastName}
          error={state.errors?.lastName?.[0]}
        />
      </div>

      <FormInput
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        defaultValue={state.values?.email}
        error={state.errors?.email?.[0]}
      />

      <FormInput
        name="phone"
        label="Téléphone"
        autoComplete="tel"
        defaultValue={state.values?.phone}
        error={state.errors?.phone?.[0]}
      />

      <div>
        <label
          htmlFor="contact-subject"
          className="block mb-1.5 text-xs uppercase tracking-widest text-(--dim) font-medium"
        >
          Sujet <span className="text-(--accent)">*</span>
        </label>

        <select
          id="contact-subject"
          name="subject"
          defaultValue={state.values?.subject ?? ""}
          aria-invalid={!!state.errors?.subject}
          className={cn(
            "w-full px-4 py-3 rounded-(--r) border bg-(--bg-3) text-[0.88rem] text-(--text) outline-none focus:border-(--gold) transition-colors [&>option]:bg-(--bg-2)",
            state.errors?.subject ? "border-red-500" : "border-(--border)",
          )}
        >
          <option value="">Choisir un sujet</option>

          {SUBJECT_OPTIONS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        {state.errors?.subject?.[0] && (
          <p className="text-xs text-red-500 mt-1">{state.errors.subject[0]}</p>
        )}
      </div>

      <FormTextarea
        name="message"
        label="Message"
        rows={5}
        defaultValue={state.values?.message}
        error={state.errors?.message?.[0]}
      />

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={pending}
        iconRight={<ArrowRight className="h-4 w-4" />}
      >
        Envoyer le message
      </Button>
    </form>
  );
}
