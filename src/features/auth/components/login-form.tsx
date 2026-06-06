"use client";

import { Mail } from "lucide-react";

import {
  authenticate,
  type AuthenticateActionResponse,
} from "../actions/auth.actions";
import { cn } from "@/lib/utils";

import PasswordField from "./password-field";
import SubmitButton from "./submit-button";
import { useActionState } from "react";

type Props = {
  callbackUrl: string;
};

const INPUT_BASE = cn(
  "w-full bg-(--bg-3)",
  "border border-(--border)",
  "rounded-(--r)",
  "py-3 pl-10 pr-4",
  "text-[0.9rem]",
  "text-(--text)",
  "placeholder:text-(--dim)",
  "outline-none",
  "transition-colors duration-150",
  "focus:border-(--gold)",
);

export default function LoginForm({ callbackUrl }: Props) {
  const initialState: AuthenticateActionResponse | null = null;
  const [state, formAction] = useActionState(authenticate, initialState);

  return (
    <>
      {state?.error && (
        <div
          className="mb-4 px-4 py-3 rounded-(--r) bg-[rgba(230,57,70,0.08)] border border-[rgba(230,57,70,0.3)] text-(--accent) text-[0.82rem]"
          role="alert"
        >
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4" noValidate>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-[0.68rem] uppercase tracking-widest text-(--dim) mb-1.5 font-medium"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--dim)"
              aria-hidden="true"
            />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@autostore-cg.com"
              autoComplete="email"
              required
              className={INPUT_BASE}
            />
          </div>
        </div>

        {/* Password */}
        <PasswordField />

        <SubmitButton />
      </form>
    </>
  );
}
