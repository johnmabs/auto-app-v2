import { UserRole } from "@generated/prisma/enums";
import { cn } from "@/lib/utils";

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Admin",
  [UserRole.SUPER_ADMIN]: "Super admin",
};

const ROLE_CLASSES: Record<UserRole, string> = {
  [UserRole.ADMIN]:
    "bg-[rgba(52,152,219,0.1)] text-(--blue) border-[rgba(52,152,219,0.3)]",
  [UserRole.SUPER_ADMIN]:
    "bg-[rgba(201,168,76,0.1)] text-(--gold) border-[rgba(201,168,76,0.3)]",
};

export function UserRolePill({ role }: { role: UserRole }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold",
        ROLE_CLASSES[role],
      )}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}

export function UserStatusPill({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.68rem] font-semibold",
        isActive
          ? "bg-[rgba(46,204,113,0.1)] text-(--green) border-[rgba(46,204,113,0.3)]"
          : "bg-[rgba(90,88,102,0.2)] text-(--muted) border-(--border)",
      )}
    >
      {isActive ? "Actif" : "Inactif"}
    </span>
  );
}
