"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Receipt,
  Users,
  X,
} from "lucide-react";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const QUICK_ACTIONS = [
  {
    label: "New lead",
    href: "/dashboard/leads",
    color: "#1565C0",
    bg: "rgba(21,101,192,0.15)",
    border: "rgba(21,101,192,0.25)",
    Icon: Users,
    isWa: false,
  },
  {
    label: "New quotation",
    href: "/dashboard/quotations",
    color: "#F5A623",
    bg: "rgba(245,166,35,0.12)",
    border: "rgba(245,166,35,0.25)",
    Icon: FileText,
    isWa: false,
  },
  {
    label: "Schedule visit",
    href: "/dashboard/site-visits",
    color: "#4CAF50",
    bg: "rgba(76,175,80,0.12)",
    border: "rgba(76,175,80,0.25)",
    Icon: Calendar,
    isWa: false,
  },
  {
    label: "New invoice",
    href: "/dashboard/invoices",
    color: "#CE93D8",
    bg: "rgba(156,39,176,0.12)",
    border: "rgba(156,39,176,0.25)",
    Icon: Receipt,
    isWa: false,
  },
  {
    label: "WhatsApp",
    href: "/dashboard/whatsapp",
    color: "#25D366",
    bg: "rgba(37,211,102,0.12)",
    border: "rgba(37,211,102,0.25)",
    Icon: MessageSquare,
    isWa: true,
  },
  {
    label: "Record payment",
    href: "/dashboard/payments",
    color: "#EF5350",
    bg: "rgba(239,83,80,0.12)",
    border: "rgba(239,83,80,0.25)",
    Icon: CreditCard,
    isWa: false,
  },
] as const;

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard", Icon: LayoutDashboard, exact: true },
  { label: "Leads", href: "/dashboard/leads", Icon: Users, exact: false },
  { label: "Billing", href: "/dashboard/quotations", Icon: Receipt, exact: false },
  { label: "More", href: "/dashboard/more", Icon: MoreHorizontal, exact: false },
] as const;

function DashboardTopBar({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-4"
      style={{
        height: "52px",
        background: "#0A1628",
        borderBottom: "1px solid rgba(245,166,35,0.12)",
      }}
    >
      <div className="flex min-w-0 flex-col justify-center">
        <span
          className="truncate"
          style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.25 }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "1px" }}
          >
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {actions}
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-label="Notifications"
        >
          <Bell size={15} color="rgba(255,255,255,0.65)" />
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
            style={{ background: "#EF5350" }}
          />
        </button>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold tracking-wide"
          style={{ background: "#1565C0", color: "#FFFFFF" }}
        >
          AM
        </div>
      </div>
    </header>
  );
}

function DashboardBottomNav({ onAddPress }: { onAddPress: () => void }) {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        height: "60px",
        background: "#0A1628",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex h-full max-w-lg items-center justify-around px-2">
        {NAV_ITEMS.slice(0, 2).map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <item.Icon size={21} color={active ? "#F5A623" : "rgba(255,255,255,0.3)"} />
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.02em",
                  color: active ? "#F5A623" : "rgba(255,255,255,0.3)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={onAddPress}
          className="flex items-center justify-center rounded-full"
          style={{
            width: "44px",
            height: "44px",
            background: "#F5A623",
            border: "3px solid #050A14",
            marginTop: "-12px",
            color: "#050A14",
            flexShrink: 0,
          }}
          aria-label="Quick add"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>

        {NAV_ITEMS.slice(2).map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <item.Icon size={21} color={active ? "#F5A623" : "rgba(255,255,255,0.3)"} />
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.02em",
                  color: active ? "#F5A623" : "rgba(255,255,255,0.3)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function QuickAddSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-[1.75rem] px-5 pb-10 pt-5"
            style={{
              background: "#0F1F3D",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <div className="mb-1 flex justify-center">
              <div
                className="h-1 w-10 rounded-full"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />
            </div>
            <div className="mb-5 mt-3 flex items-center justify-between">
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF" }}>
                Quick add
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
                aria-label="Close"
              >
                <X size={14} color="rgba(255,255,255,0.65)" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl p-3.5 transition-opacity active:opacity-70"
                  style={{
                    background: action.bg,
                    border: `1px solid ${action.border}`,
                  }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${action.color}20`, color: action.color }}
                  >
                    {action.isWa ? (
                      <WhatsAppIcon size={18} />
                    ) : (
                      <action.Icon size={18} />
                    )}
                  </div>
                  <span
                    style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.3 }}
                  >
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DashboardShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="relative min-h-screen" style={{ background: "#050A14" }}>
      <DashboardTopBar title={title} subtitle={subtitle} actions={actions} />
      <main style={{ paddingTop: "52px", paddingBottom: "80px" }}>{children}</main>
      <DashboardBottomNav onAddPress={() => setSheetOpen(true)} />
      <QuickAddSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}
