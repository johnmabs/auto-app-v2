import {
  LayoutDashboard,
  Car,
  Users,
  FileText,
  HelpCircle,
  Shield,
  Inbox,
  MessageSquare,
  Handshake,
} from "lucide-react";

export type AdminIconKey =
  | "dashboard"
  | "vehicles"
  | "users"
  | "requests"
  | "content"
  | "faq"
  | "testimonials"
  | "partners"
  | "logs";

const adminIconMap: Record<
  AdminIconKey,
  React.ComponentType<{ className?: string }>
> = {
  dashboard: LayoutDashboard,
  vehicles: Car,
  users: Users,
  requests: Inbox,
  content: FileText,
  faq: HelpCircle,
  testimonials: MessageSquare,
  partners: Handshake,
  logs: Shield,
};

export function getAdminIconComponent(key?: AdminIconKey) {
  if (!key) return null;
  return adminIconMap[key] ?? null;
}
