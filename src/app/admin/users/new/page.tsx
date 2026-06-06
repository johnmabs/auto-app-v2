import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { UserForm } from "@/features/users/components/user-form";

export const metadata: Metadata = { title: "Nouvel utilisateur" };

export default function NewUserPage() {
  return (
    <main className="max-w-3xl space-y-6">
      <header>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-[0.78rem] text-(--muted) hover:text-(--gold) transition-colors mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour
        </Link>
        <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
          NOUVEL UTILISATEUR
        </h1>
        <p className="text-[0.82rem] text-(--muted) mt-1">
          Créer un compte administrateur
        </p>
      </header>

      <UserForm mode="create" />
    </main>
  );
}

