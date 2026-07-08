"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/components/ui/theme-provider";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, mounted } = useTheme();
  const pathname = usePathname();
  const isDark = mounted ? theme === "dark" : true;

  const { scrollY } = useScroll();
  const scrolled = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Frosted backdrop — fades in as user scrolls */}
        <motion.div
          className="absolute inset-0 border-b transition-colors duration-300"
          style={{
            opacity: scrolled,
            backgroundColor: isDark ? "rgba(0,0,0,0.88)" : "rgba(245,247,250,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
          }}
        />

        <nav className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Onyx Interactive home">
            <motion.div
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(11,189,244,0.06)",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(11,189,244,0.12)",
              }}
            >
              <Image
                src="/logo.png"
                alt="Onyx Interactive"
                fill
                sizes="36px"
                className="object-contain p-0.5"
                priority
              />
            </motion.div>
            <span
              className="font-bold text-lg tracking-tight transition-colors duration-300"
              style={{ color: "var(--fg)" }}
            >
              Oynx Interactive
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch
                  className="relative px-4 py-2 text-sm transition-colors duration-200 group rounded-lg"
                  aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                  style={{ color: pathname.startsWith(link.href) ? "var(--fg)" : "var(--fg-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = pathname.startsWith(link.href) ? "var(--fg)" : "var(--fg-muted)")}
                >
                  {link.label}
                  <span className={`absolute bottom-1 left-4 right-4 h-px bg-[#0BBDF4] transition-transform duration-200 origin-left ${pathname.startsWith(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              prefetch
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#0BBDF4] text-black rounded-lg hover:bg-[#4DD4FA] transition-all duration-200 hover:shadow-[0_0_20px_rgba(11,189,244,0.4)]"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile: theme toggle + burger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="p-2 transition-colors"
              style={{ color: "var(--fg-muted)" }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <motion.line
                  x1="3" y1={isMenuOpen ? "10" : "5"} x2="17" y2={isMenuOpen ? "10" : "5"}
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  animate={{ rotate: isMenuOpen ? 45 : 0 }}
                  style={{ transformOrigin: "center" }}
                  transition={{ duration: 0.2 }}
                />
                <motion.line
                  x1="3" y1="10" x2="17" y2="10"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.line
                  x1="3" y1={isMenuOpen ? "10" : "15"} x2="17" y2={isMenuOpen ? "10" : "15"}
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  animate={{ rotate: isMenuOpen ? -45 : 0 }}
                  style={{ transformOrigin: "center" }}
                  transition={{ duration: 0.2 }}
                />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8 md:hidden"
            style={{
              backgroundColor: isDark ? "rgba(0,0,0,0.97)" : "rgba(245,247,250,0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            <ul className="flex flex-col gap-2" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={link.href}
                    prefetch
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-2xl font-semibold border-b transition-colors"
                    style={{
                      color: "var(--fg)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/contact"
                prefetch
                onClick={() => setIsMenuOpen(false)}
                className="text-center py-3 text-sm font-semibold bg-[#0BBDF4] text-black rounded-lg hover:bg-[#4DD4FA] transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
