import Link from "next/link";
import {
  Building2,
  ChevronRight,
  CreditCard,
  FolderOpen,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";

const MODULES = [
  {
    label: "Customers",
    description: "Manage client accounts and contacts",
    href: "/dashboard/customers",
    color: "#64B5F6",
    bg: "rgba(21,101,192,0.15)",
    Icon: Building2,
  },
  {
    label: "Site Visits",
    description: "Schedule and track field surveys",
    href: "/dashboard/site-visits",
    color: "#4DB6AC",
    bg: "rgba(0,150,136,0.15)",
    Icon: MapPin,
  },
  {
    label: "Projects",
    description: "Active installations and progress",
    href: "/dashboard/projects",
    color: "#CE93D8",
    bg: "rgba(156,39,176,0.15)",
    Icon: FolderOpen,
  },
  {
    label: "AMC Plans",
    description: "Annual maintenance contracts",
    href: "/dashboard/amc",
    color: "#F5A623",
    bg: "rgba(245,166,35,0.12)",
    Icon: ShieldCheck,
  },
  {
    label: "WhatsApp",
    description: "Inbox, automation and templates",
    href: "/dashboard/whatsapp",
    color: "#25D366",
    bg: "rgba(37,211,102,0.12)",
    Icon: MessageSquare,
  },
  {
    label: "Automation",
    description: "Rules, triggers and workflows",
    href: "/dashboard/automation",
    color: "#FFB74D",
    bg: "rgba(255,183,77,0.12)",
    Icon: Zap,
  },
  {
    label: "Payments",
    description: "Record and track all payments",
    href: "/dashboard/payments",
    color: "#81C784",
    bg: "rgba(76,175,80,0.12)",
    Icon: CreditCard,
  },
] as const;

export default function DashboardMorePage() {
  return (
    <DashboardShell title="More" subtitle="All CRM modules">
      <div className="px-4 py-4">
        <div
          className="rounded-[12px] overflow-hidden"
          style={{ border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          {MODULES.map((mod, i) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="flex items-center gap-4 px-4 py-4 transition-colors active:opacity-70"
              style={{
                background: "#0F1F3D",
                borderTop: i > 0 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: mod.bg, color: mod.color }}
              >
                <mod.Icon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                  {mod.label}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                  {mod.description}
                </div>
              </div>
              <ChevronRight size={16} color="rgba(255,255,255,0.25)" />
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
