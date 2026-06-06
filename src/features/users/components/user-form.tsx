"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { UserRole } from "@generated/prisma/enums";
import { Button } from "@/shared/ui/Button";
import {
  createUserAction,
  updateUserAction,
  updateUserRoleAction,
} from "../actions/user.actions";

type UserFormValues = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
};

type Props =
  | {
      mode: "create";
      initialValues?: never;
    }
  | {
      mode: "update";
      initialValues: UserFormValues;
    };

const inputClassName =
  "w-full px-3 py-2 text-[0.85rem] bg-(--bg-3) border border-(--border) rounded-(--r) text-(--text) placeholder:text-(--dim) outline-none focus:border-(--gold) transition-colors";

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-[0.68rem] uppercase tracking-widest text-(--dim) mb-1.5 font-medium">
        {label}
        {required && <span className="text-(--accent) ml-0.5">*</span>}
      </label>
      {children}
      {hint ? <p className="text-[0.68rem] text-(--dim) mt-1">{hint}</p> : null}
    </div>
  );
}

export function UserForm(props: Props) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const isUpdate = props.mode === "update";

  function submit(formData: FormData) {
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const response =
        props.mode === "create"
          ? await createUserAction(null, formData)
          : await updateUserAction(props.initialValues.id, null, formData);

      if (!response.success) {
        setError(response.error);
        return;
      }

      if (props.mode === "update") {
        const roleFormData = new FormData();
        roleFormData.set("role", String(formData.get("role") ?? ""));
        const roleResponse = await updateUserRoleAction(
          props.initialValues.id,
          null,
          roleFormData,
        );

        if (!roleResponse.success) {
          setError(roleResponse.error);
          return;
        }
      }

      setMessage(
        props.mode === "create"
          ? "Utilisateur créé"
          : "Utilisateur mis à jour",
      );
      router.push("/admin/users");
      router.refresh();
    });
  }

  return (
    <form action={submit} className="grid gap-6">
      <section className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom" required>
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              defaultValue={isUpdate ? (props.initialValues.name ?? "") : ""}
              className={inputClassName}
              placeholder="Nom complet"
            />
          </Field>

          <Field label="Email" required>
            <input
              name="email"
              type="email"
              required
              defaultValue={isUpdate ? props.initialValues.email : ""}
              className={inputClassName}
              placeholder="admin@autostore.com"
            />
          </Field>

          {!isUpdate ? (
            <Field
              label="Mot de passe"
              required
              hint="Minimum 8 caractères, une majuscule, une minuscule et un chiffre."
            >
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className={inputClassName}
                placeholder="Mot de passe temporaire"
              />
            </Field>
          ) : (
            <Field label="Image">
              <input
                name="image"
                type="url"
                defaultValue={props.initialValues.image ?? ""}
                className={inputClassName}
                placeholder="https://..."
              />
            </Field>
          )}

          <Field label="Rôle" required>
            <select
              name="role"
              required
              defaultValue={isUpdate ? props.initialValues.role : UserRole.ADMIN}
              className={inputClassName}
            >
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.SUPER_ADMIN}>Super admin</option>
            </select>
          </Field>
        </div>
      </section>

      {error ? (
        <p className="rounded-(--r) border border-[rgba(230,57,70,0.3)] bg-[rgba(230,57,70,0.08)] p-3 text-sm text-(--accent)">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-(--r) border border-[rgba(46,204,113,0.3)] bg-[rgba(46,204,113,0.08)] p-3 text-sm text-(--green)">
          {message}
        </p>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          disabled={pending}
          onClick={() => router.push("/admin/users")}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          loading={pending}
          icon={<Save className="h-4 w-4" />}
        >
          {isUpdate ? "Mettre à jour" : "Créer l'utilisateur"}
        </Button>
      </div>
    </form>
  );
}
