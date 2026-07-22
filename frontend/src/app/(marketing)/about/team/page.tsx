"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "iconoir-react";
import ProfileCard from "@/components/ui/ProfileCard";
import { CORE_TEAM } from "@/lib/team";

/* ─── Department grouping ─── */
const DEPARTMENTS = ["All", "Leadership", "Operations", "Engineering", "Interns"] as const;

const MEMBER_DEPARTMENT: Record<string, string> = {
  "Umair Jadoon": "Leadership",
  "Muhammad Fahad": "Engineering",
  "Hammad Ellahi": "Leadership",
  "Syed Raza Ali Gillani": "Operations",
  "Samiullah Khan": "Operations",
  "Talha Mujahid": "Operations",
  "Muhammad Hammad": "Engineering",
  "Hafsa Azhar": "Interns",
  "Muhammad Ehtisham": "Interns",
  "Anum Shahzadi": "Interns",
  "Naveed Ahmed": "Interns",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] },
  }),
};

export default function TeamPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const filtered =
    selectedDept === "All"
      ? CORE_TEAM
      : CORE_TEAM.filter((m) => MEMBER_DEPARTMENT[m.name] === selectedDept);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden pt-24 pb-20 border-b transition-colors"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0BBDF4]/5 via-transparent to-[#7C3AED]/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0BBDF4]/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium mb-10 hover:text-[#0BBDF4] transition-colors" style={{ color: "var(--fg-muted)" }}>
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="blue" className="mb-6">Core Team</Badge>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight leading-[1.02] mb-6" style={{ color: "var(--fg)" }}>
              The people behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0BBDF4] via-[#38BDF8] to-[#7C3AED]">
                every delivery
              </span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "var(--fg-muted)" }}>
              We're a tight-knit team of practitioners — not career administrators. Every person here has skin in the game on the work we ship.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              { value: `${CORE_TEAM.length}`, label: "Team members" },
              { value: "3", label: "City offices" },
              { value: "4+", label: "Continents served" },
              { value: "10+", label: "Avg. years experience" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-black text-[#0BBDF4]">{stat.value}</span>
                <span className="text-sm font-medium" style={{ color: "var(--fg-muted)" }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Department Filter ── */}
      <div
        className="sticky top-16 z-30 border-b backdrop-blur-xl transition-colors"
        style={{ borderColor: "var(--border)", background: "var(--bg)/80" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold uppercase tracking-widest mr-3 shrink-0" style={{ color: "var(--fg-subtle)" }}>
            Filter:
          </span>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 shrink-0 ${
                selectedDept === dept
                  ? "bg-[#0BBDF4] text-white border-[#0BBDF4] shadow-lg shadow-[#0BBDF4]/25"
                  : "border-transparent hover:border-[#0BBDF4]/40 hover:text-[#0BBDF4]"
              }`}
              style={selectedDept !== dept ? { color: "var(--fg-muted)", background: "var(--bg-subtle)" } : {}}
            >
              {dept}
            </button>
          ))}
          <div className="ml-auto shrink-0">
            <span className="text-sm font-medium" style={{ color: "var(--fg-muted)" }}>
              {filtered.length} member{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* ── Team Grid ── */}
      <Section>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDept}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {filtered.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={i}
                className="flex flex-col items-center"
              >
                {/* Profile Card */}
                <ProfileCard
                  name={member.name}
                  title={member.title}
                  handle={member.handle || member.name.replace(/\s+/g, '').toLowerCase()}
                  status={member.status}
                  contactText="Contact Me"
                  avatarUrl={member.avatarUrl}
                  showUserInfo
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.open(member.linkedin, "_blank")}
                  behindGlowEnabled
                  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                />


              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* ── Join the Team Banner ── */}
      <section
        className="relative overflow-hidden border-t py-24 transition-colors"
        style={{ borderColor: "var(--border)", background: "var(--section-alt)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0BBDF4]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0BBDF4] to-transparent opacity-40" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Badge variant="blue" className="mb-6">We're Hiring</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6" style={{ color: "var(--fg)" }}>
            Think you belong here?
          </h2>
          <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "var(--fg-muted)" }}>
            We're always looking for exceptional engineers, designers, and product thinkers who care deeply about craftsmanship and client impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg" className="px-10" rightIcon={<ArrowLeft className="w-4 h-4 rotate-180" />}>
                View Open Roles
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-10">
                Reach Out Directly
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
