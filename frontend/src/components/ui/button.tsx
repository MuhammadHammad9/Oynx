"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   BUTTON — Primary, Secondary, Ghost, Danger
───────────────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0BBDF4] text-black font-semibold hover:bg-[#4DD4FA] hover:shadow-[0_0_24px_rgba(11,189,244,0.45)] disabled:bg-[#0BBDF4]/40",
  secondary:
    "bg-transparent border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] disabled:opacity-40",
  ghost:
    "bg-transparent text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] disabled:opacity-40",
  danger:
    "bg-[#ef4444] text-white hover:bg-[#dc2626] disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-5 text-sm gap-2 rounded-lg",
  lg: "h-12 px-7 text-base gap-2.5 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0BBDF4]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          "disabled:pointer-events-none select-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
