import { UserRole } from "@generated/prisma/enums";
import { cn } from "@/lib/utils";
import { listUsersAction } from "../actions/user.actions";

async function getUserCount(filters: {
  role?: UserRole[];
  isActive?: boolean;
}) {
  const response = await listUsersAction(filters, { page: 1, limit: 1 });

  if (!response.success) {
    throw new Error(response.error);
  }

  return response.data.total;
}

export async function UserStats() {
  const [total, active, admins, superAdmins] = await Promise.all([
    getUserCount({}),
    getUserCount({ isActive: true }),
    getUserCount({ role: [UserRole.ADMIN] }),
    getUserCount({ role: [UserRole.SUPER_ADMIN] }),
  ]);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Total", value: total, color: "text-(--text)" },
        { label: "Actifs", value: active, color: "text-(--green)" },
        { label: "Admins", value: admins, color: "text-(--blue)" },
        { label: "Super admins", value: superAdmins, color: "text-(--gold)" },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) px-5 py-4"
        >
          <p
            className={cn(
              "font-display text-[2rem] tracking-wide",
              item.color,
            )}
          >
            {item.value}
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.08em] text-(--dim) mt-0.5">
            {item.label}
          </p>
        </div>
      ))}
    </section>
  );
}
