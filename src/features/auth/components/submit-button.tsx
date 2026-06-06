"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        "w-full h-11 rounded-(--r)",
        "font-sans font-semibold",
        "text-[0.85rem]",
        "uppercase tracking-wider",
        "transition-all duration-200",
        pending
          ? "bg-(--bg-4) text-(--dim) cursor-not-allowed"
          : "bg-(--gold) text-(--bg) hover:bg-(--gold-2) hover:-translate-y-px",
      )}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <span
            className="w-4 h-4 border-2 border-(--bg) border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          Connexion...
        </span>
      ) : (
        "Se connecter"
      )}
    </button>
  );
}
