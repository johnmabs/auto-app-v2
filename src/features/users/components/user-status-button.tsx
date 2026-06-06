"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Power, PowerOff } from "lucide-react";
import { toast } from "sonner";
import {
  deactivateUserAction,
  reactivateUserAction,
} from "../actions/user.actions";

type Props = {
  id: string;
  label: string;
  isActive: boolean;
};

export function UserStatusButton({ id, label, isActive }: Props) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  function toggleStatus() {
    startTransition(async () => {
      const result = isActive
        ? await deactivateUserAction(id)
        : await reactivateUserAction(id);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(isActive ? "Utilisateur désactivé" : "Utilisateur activé");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      className="h-7 w-7 flex items-center justify-center rounded-(--r) border border-(--border) text-(--muted) hover:text-(--accent) hover:border-(--accent) transition-all disabled:opacity-40"
      aria-label={`${isActive ? "Désactiver" : "Activer"} ${label}`}
      title={isActive ? "Désactiver" : "Activer"}
      disabled={pending}
      onClick={toggleStatus}
    >
      {isActive ? (
        <PowerOff className="h-3.5 w-3.5" />
      ) : (
        <Power className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

