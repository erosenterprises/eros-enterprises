"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/website/theme-toggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-50 h-[60px] flex items-center px-5 lg:px-8 transition-all duration-200"
        style={{
          background: scrolled ? "var(--e-nav-bg-scroll)" : "var(--e-nav-bg)",
          borderBottom: `1px solid ${scrolled ? "var(--e-nav-bdr-scroll)" : "var(--e-nav-bdr)"}`,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-[#1565C0] rounded-[9px] flex items-center justify-center text-lg font-bold text-white select-none">
            💡
          </div>
          <div>
            <div className="font-heading font-bold text-[15px] leading-none" style={{ color: "var(--e-text)" }}>
              Eros Enterprises
            </div>
            <div className="text-[9px] uppercase tracking-[0.1em] font-medium" style={{ color: "var(--e-gold)" }}>
              Lighting with Purpose
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
                style={{ color: active ? "var(--e-nav-link-act)" : "var(--e-nav-link)" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right: Toggle + WA + CTA */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[7px] text-[12px] font-semibold transition-colors"
            style={{
              background: "rgba(37,211,102,0.1)",
              border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366",
            }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>

          {/* Get Free Quote */}
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-[7px] bg-[#1565C0] text-white text-[13px] font-semibold hover:bg-[#1E7FE8] transition-colors"
          >
            Get Free Quote
          </Link>
        </div>

        {/* Mobile: Toggle + Hamburger */}
        <div className="lg:hidden ml-auto flex items-center gap-2.5">
          <ThemeToggle />
          <button
            className="w-9 h-9 rounded-[8px] flex items-center justify-center"
            style={{ background: "var(--e-surface)", border: "1px solid var(--e-blue-bdr)", color: "var(--e-text)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] z-40"
             style={{ background: "var(--e-navy)", borderBottom: "1px solid var(--e-blue-bdr)" }}>
          <nav className="flex flex-col px-5 py-3">
            {navLinks.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-[14px] font-medium"
                  style={{
                    color: active ? "var(--e-nav-link-act)" : "var(--e-nav-link)",
                    borderBottom: "1px solid var(--e-divider)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            {/* Mobile WA button */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[13px] font-bold bg-[#25D366] text-black"
            >
              💬 WhatsApp Us
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
