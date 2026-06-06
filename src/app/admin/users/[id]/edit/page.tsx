import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getUserByIdAction } from "@/features/users/actions/user.actions";
import { UserForm } from "@/features/users/components/user-form";

export const metadata: Metadata = { title: "Modifier un utilisateur" };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;
  const response = await getUserByIdAction(id);

  if (!response.success) {
    notFound();
  }

  const user = response.data;

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
          MODIFIER L&apos;UTILISATEUR
        </h1>
        <p className="text-[0.82rem] text-(--muted) mt-1">
          {user.name ?? user.email}
        </p>
      </header>

      <UserForm
        mode="update"
        initialValues={{
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }}
      />
    </main>
  );
}
