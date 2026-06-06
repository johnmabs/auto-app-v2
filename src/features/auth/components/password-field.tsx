"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const INPUT_BASE = cn(
  "w-full bg-(--bg-3)",
  "border border-(--border)",
  "rounded-(--r)",
  "py-3 pl-10 pr-10",
  "text-[0.9rem]",
  "text-(--text)",
  "placeholder:text-(--dim)",
  "outline-none",
  "transition-colors duration-150",
  "focus:border-(--gold)",
);

export default function PasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-[0.68rem] uppercase tracking-widest text-(--dim) mb-1.5 font-medium"
      >
        Mot de passe
      </label>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--dim)"
          aria-hidden="true"
        />

        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="current-password"
          required
          className={INPUT_BASE}
        />

        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--dim) hover:text-(--muted)"
          aria-label={
            showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
