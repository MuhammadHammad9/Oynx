"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   GLOW CARD — mouse-tracking radial glow, theme-aware
───────────────────────────────────────────── */

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
}

export function GlowCard({
  children,
  glowColor = "rgba(11,189,244,0.10)",
  className,
  ...props
}: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group relative rounded-2xl overflow-hidden transition-all duration-300", className)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "var(--bg-card-hover)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "var(--bg-card)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
      {...props}
    >
      {/* Radial mouse-tracking glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background }}
      />
      {/* Border accent glow on hover */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-[#0BBDF4]/20 transition-all duration-500" />
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BADGE — theme-aware
───────────────────────────────────────────── */

type BadgeVariant = "blue" | "white" | "success" | "warning" | "danger" | "neutral" | "green" | "amber";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  blue:    "bg-[#0BBDF4]/15 text-[#0BBDF4] border-[#0BBDF4]/25",
  white:   "bg-white/8 text-white border-white/12",
  success: "bg-green-500/15 text-green-400 border-green-500/25",
  green:   "bg-green-500/15 text-green-400 border-green-500/25",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  amber:   "bg-amber-500/15 text-amber-400 border-amber-500/25",
  danger:  "bg-red-500/15 text-red-400 border-red-500/25",
  neutral: "border",
};

const dotVariants: Record<BadgeVariant, string> = {
  blue:    "bg-[#0BBDF4]",
  white:   "bg-white",
  success: "bg-green-400",
  green:   "bg-green-400",
  warning: "bg-amber-400",
  amber:   "bg-amber-400",
  danger:  "bg-red-400",
  neutral: "bg-neutral-400",
};

export function Badge({ children, variant = "blue", dot = false, className }: BadgeProps) {
  const neutralStyle =
    variant === "neutral"
      ? {
          background: "var(--bg-subtle)",
          color: "var(--fg-muted)",
          borderColor: "var(--border)",
        }
      : undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        badgeVariants[variant],
        className
      )}
      style={neutralStyle}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotVariants[variant])} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────── */

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  as?: "section" | "div" | "article";
}

export function Section({ children, id, as: Tag = "section", className, ...props }: SectionProps) {
  return (
    <Tag id={id} className={cn("py-24 md:py-32", className)} {...props}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADING — theme-aware
───────────────────────────────────────────── */

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl mb-16", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <Badge variant="blue" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2
        className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mb-4"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DIVIDER — theme-aware
───────────────────────────────────────────── */

export function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-full", className)}
      style={{ background: "linear-gradient(to right, transparent, var(--border-hover), transparent)" }}
    />
  );
}
