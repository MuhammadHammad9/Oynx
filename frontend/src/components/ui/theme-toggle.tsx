"use client";

import { useTheme } from "@/components/ui/theme-provider";
import { SunLight, HalfMoon } from "iconoir-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = mounted
    ? `Switch to ${isDark ? "light" : "dark"} mode`
    : "Toggle color theme";

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
        hover:bg-black/5 dark:hover:bg-white/10
        ${className ?? ""}`}
      style={{ color: "var(--fg)" }}
    >
      <AnimatePresence mode="wait">
        {mounted && isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <SunLight className="w-4.5 h-4.5" />
          </motion.span>
        ) : mounted ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <HalfMoon className="w-4.5 h-4.5" />
          </motion.span>
        ) : (
          <span className="w-4.5 h-4.5" aria-hidden="true" />
        )}
      </AnimatePresence>
    </button>
  );
}
