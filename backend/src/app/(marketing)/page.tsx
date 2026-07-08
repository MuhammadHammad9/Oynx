"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GlowCard,
  Badge,
  Section,
  SectionHeading,
  Divider,
} from "@/components/ui/primitives";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { ShaderBackground } from "@/components/ui/hero-shader";
import { useTheme } from "@/components/ui/theme-provider";
import {
  ArrowRight,
  Code,
  ViewGrid,
  SmartphoneDevice,
  Server,
  Brain,
  ShieldCheck,
  Dashboard,
  Clock,
  ChatBubble,
} from "iconoir-react";
import { SERVICES } from "@/lib/data";

/* ─── Testimonials (Google Maps ★★★★★ 5.0 / 15 reviews) ─── */
const TESTIMONIALS = [
  {
    quote:
      "Best team to deliver my software according to my requirements. They understood exactly what I needed and executed flawlessly.",
    author: "Muhammad Hammad — Verified Google Review ★★★★★",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1200&fit=crop&q=80",
    alt: "Portrait of Muhammad Hammad",
  },
  {
    quote:
      "Best software house to work with and professional staff. Highly recommend Onyx Interactive for any tech project.",
    author: "Zalim Ali Khan — Verified Google Review ★★★★★",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&h=1200&fit=crop&q=80",
    alt: "Portrait of Zalim Ali Khan",
  },
  {
    quote:
      "Very cooperative company. The team went above and beyond to ensure our project was completed on time and to the highest standard.",
    author: "Talha Jadoon — Verified Google Review ★★★★★",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1200&fit=crop&q=80",
    alt: "Portrait of Talha Jadoon",
  },
  {
    quote:
      "Outstanding service and technical expertise. Onyx Interactive delivered our project exactly as envisioned, with exceptional attention to detail.",
    author: "Verified Client — Google Review ★★★★★",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&h=1200&fit=crop&q=80",
    alt: "Verified Google review client",
  },
  {
    quote:
      "The most transparent and reliable software house I have worked with. Real-time updates, zero surprises, and a team that truly cares about outcomes.",
    author: "Verified Client — Google Review ★★★★★",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=1200&fit=crop&q=80",
    alt: "Verified Google review client",
  },
  {
    quote:
      "Exceptional quality and communication throughout. From concept to launch, Onyx delivered a world-class product that exceeded every expectation.",
    author: "Verified Client — Google Review ★★★★★",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=1200&fit=crop&q=80",
    alt: "Verified Google review client",
  },
];

const PROOF_IMAGES = [
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=800&fit=crop&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590a?w=800&h=800&fit=crop&q=80",
];

/* ─── Trust-strip logos ─── */
const TRUST_LOGOS = [
  "Arbisoft",
  "Folio3",
  "Systems Ltd",
  "NetSol",
  "TechVista",
  "Devsinc",
];

/* ─── Service icon map ─── */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "product-design": <ViewGrid className="w-5 h-5" />,
  "web-development": <Code className="w-5 h-5" />,
  "mobile-development": <SmartphoneDevice className="w-5 h-5" />,
  "cloud-devops": <Server className="w-5 h-5" />,
  "ai-data": <Brain className="w-5 h-5" />,
  "quality-engineering": <ShieldCheck className="w-5 h-5" />,
};

/* ─── Case studies ─── */
const CASE_STUDIES = [
  {
    client: "Fintech Startup",
    industry: "Financial Technology",
    metric: "3× faster",
    desc: "time-to-market after redesigning their core onboarding flow.",
    slug: "#",
  },
  {
    client: "UAE Retail Group",
    industry: "Retail & E-Commerce",
    metric: "47% lift",
    desc: "in repeat purchases within 60 days of mobile app relaunch.",
    slug: "#",
  },
  {
    client: "US Logistics SaaS",
    industry: "Logistics",
    metric: "99.97%",
    desc: "uptime delivered for mission-critical shipment tracking platform.",
    slug: "#",
  },
];

/* ─── Why Onyx ─── */
const WHY_ONYX = [
  {
    icon: <Dashboard className="w-6 h-6" />,
    headline: "Dedicated project dashboard",
    body: "Every client gets structured milestone tracking, collaborative file sharing, and direct communication channels.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    headline: "Security-first by default",
    body: "Multi-tenant isolation, RBAC, MFA, audit logs — built into every project, not bolted on after the fact.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    headline: "QA that earns trust",
    body: "Playwright E2E, accessibility checks, and automated regression run on every PR — zero compromise.",
  },
  {
    icon: <ChatBubble className="w-6 h-6" />,
    headline: "One team. Full accountability.",
    body: "No hand-offs between siloed vendors. Your account lead owns design, engineering, and QA under one roof.",
  },
];

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -32, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.07,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

/* ─── Parallax helper – spring-smoothed ─── */
function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  outputRange: [number, number]
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], outputRange);
  return useSpring(raw, { stiffness: 80, damping: 28, restDelta: 0.001 });
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* Hero scroll */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useSpring(
    useTransform(heroProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 60]),
    { stiffness: 80, damping: 28 }
  );
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroBgY = useTransform(
    heroProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "20%"]
  );

  /* Section refs */
  const servicesRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  const servicesY = useParallax(
    servicesRef,
    shouldReduceMotion ? [0, 0] : [30, -30]
  );
  const proofY = useParallax(
    proofRef,
    shouldReduceMotion ? [0, 0] : [20, -20]
  );
  const whyY = useParallax(
    whyRef,
    shouldReduceMotion ? [0, 0] : [25, -15]
  );

  return (
    <>
      {/* ══════════════════════════════════════
          HERO — full-viewport, shader bg
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Shader background with gentle parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroBgY }}>
          <ShaderBackground className="absolute inset-0 w-full h-full relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.0)_70%,rgba(255,255,255,0.5)_100%)] dark:bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.10)_70%,rgba(0,0,0,0.80)_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f0f9ff] dark:to-black pointer-events-none transition-colors duration-300" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/40 dark:from-black/40 to-transparent pointer-events-none transition-colors duration-300" />
          </ShaderBackground>
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <Badge variant="blue" className="mb-8 py-1.5 px-4">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0BBDF4] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0BBDF4]" />
                </span>
                Accepting New Projects for 2026
              </span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-[clamp(2.75rem,7vw,6rem)] font-bold tracking-tight leading-[1.02] mb-6 text-white"
            style={{
              textShadow: "0px 4px 20px rgba(0, 0, 0, 0.4), 0px 1px 3px rgba(0,0,0,0.8)"
            }}
          >
            Engineering that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DD4FA] via-white to-[#0BBDF4]">
              ships
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#4DD4FA] to-white">
              and scales.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="max-w-2xl text-lg md:text-xl leading-relaxed mb-10 text-white/90 font-medium"
            style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.8)" }}
          >
            Onyx Interactive is a premium software studio delivering
            world-class web apps, mobile products, and enterprise software —
            with the quality, speed, and transparency your business demands.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="px-8"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </motion.div>
            </Link>
            <Link href="/work">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="secondary" size="lg" className="px-8">
                  See Our Work
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#0BBDF4]/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════ */}
      <motion.section
        className="border-y py-8 transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg-subtle)",
          borderColor: "var(--border)",
        }}
        aria-label="Trusted by"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            variants={fadeIn}
            className="text-xs uppercase tracking-widest text-center mb-6"
            style={{ color: "var(--fg-subtle)" }}
          >
            Trusted by teams across industries
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {TRUST_LOGOS.map((name, i) => (
              <motion.span
                key={name}
                variants={fadeIn}
                custom={i}
                whileHover={{ scale: 1.08, color: "var(--accent)" }}
                className="font-bold text-sm tracking-wider uppercase cursor-default"
                style={{ color: "var(--fg-subtle)" }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          SERVICES — spring parallax
      ══════════════════════════════════════ */}
      <div ref={servicesRef} className="overflow-hidden">
        <motion.div style={{ y: servicesY }}>
          <Section id="services" aria-label="Services overview">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <SectionHeading
                eyebrow="What We Build"
                title="Full-spectrum software delivery"
                subtitle="From design to deployment — every capability under one roof, every project under one accountable team."
                centered
              />
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {SERVICES.slice(0, 6).map((s, i) => (
                <motion.div key={s.slug} variants={scaleIn} custom={i}>
                  <GlowCard className="p-7 flex flex-col h-full min-h-[300px] relative overflow-hidden group hover:border-[#0BBDF4]/30 transition-all duration-500 bg-[#0B0F19] hover:bg-[#0F1523]">
                    <div className="w-12 h-12 mb-6 rounded-xl bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center border border-[#0BBDF4]/20 shadow-sm group-hover:bg-[#0BBDF4]/20 group-hover:scale-110 transition-all duration-300">
                      {SERVICE_ICONS[s.slug] || <Code className="w-5 h-5" />}
                    </div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight text-white group-hover:text-[#0BBDF4] transition-colors duration-300">
                      {s.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6 flex-1 text-slate-400">
                      {s.oneLineDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.techBadges?.slice(0, 3).map(badge => (
                        <span key={badge} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 whitespace-nowrap">
                          {badge}
                        </span>
                      ))}
                      {s.techBadges && s.techBadges.length > 3 && (
                        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-[#0BBDF4]/10 border border-[#0BBDF4]/20 text-[#0BBDF4]">
                          +{s.techBadges.length - 3}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group/link mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#0BBDF4] hover:text-[#4DD4FA] transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </motion.div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          PROOF / CASE STUDIES — spring parallax
      ══════════════════════════════════════ */}
      <div ref={proofRef} className="overflow-hidden">
        <motion.div style={{ y: proofY }}>
          <Section id="work" aria-label="Case studies">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInLeft}
            >
              <SectionHeading
                eyebrow="Proof"
                title="Results that speak louder than decks"
                subtitle="Metrics from real clients, measured after delivery — not marketing projections."
              />
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {CASE_STUDIES.map((cs, i) => (
                <motion.div key={cs.client} variants={fadeUp} custom={i}>
                  <GlowCard className="flex flex-col h-full group relative overflow-hidden p-0">
                    <div className="absolute inset-0 z-0 bg-[var(--bg-card)] overflow-hidden">
                      <img src={PROOF_IMAGES[i]} alt={cs.client} className="w-full h-full object-cover opacity-30 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-[0.4] group-hover:scale-105 text-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/90 to-[var(--bg-card)]/40 group-hover:from-black/90 group-hover:via-black/70 pointer-events-none transition-colors duration-500" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full p-8">
                      <Badge variant="blue" className="mb-6 self-start">
                        {cs.industry}
                      </Badge>
                    <motion.p
                      className="text-5xl font-black text-[#0BBDF4] mb-3 tracking-tight"
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1 + 0.2,
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      {cs.metric}
                    </motion.p>
                    <p className="text-sm leading-relaxed mb-8 flex-1 text-[var(--fg-muted)] group-hover:text-white/80 transition-colors duration-500">
                      {cs.desc}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-subtle)] group-hover:text-white/60 transition-colors duration-500">
                      {cs.client}
                    </p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <motion.section
        className="px-6 py-24 transition-colors duration-300"
        style={{ backgroundColor: "var(--bg-subtle)" }}
        aria-label="Testimonials"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
          <div className="text-center max-w-2xl">
            <Badge variant="blue" className="mb-4">
              Google Reviews ★★★★★ 5.0
            </Badge>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--fg)" }}
            >
              What our clients say on Google
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>
              Verified reviews from Google Maps · 15 reviews · 5.0 stars
            </p>
          </div>
          <ScrollReelTestimonials
            testimonials={TESTIMONIALS}
            className="w-full"
          />
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          WHY ONYX — spring parallax
      ══════════════════════════════════════ */}
      <div ref={whyRef} className="overflow-hidden">
        <motion.div style={{ y: whyY }}>
          <Section
            id="about"
            className="border-y transition-colors duration-300"
            style={{
              backgroundColor: "var(--section-alt)",
              borderColor: "var(--border)",
            } as React.CSSProperties}
            aria-label="Why Onyx"
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <SectionHeading
                eyebrow="Why Onyx"
                title="Built different. Delivered differently."
                subtitle="We close the gaps that every other agency leaves open."
                centered
              />
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {WHY_ONYX.map((item, i) => (
                <motion.div key={i} variants={slideInLeft}>
                  <GlowCard className="flex gap-5 p-7">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h3
                        className="font-bold text-lg mb-2"
                        style={{ color: "var(--fg)" }}
                      >
                        {item.headline}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          CONTACT / QUERY FORM
      ══════════════════════════════════════ */}
      <ContactFormSection isDark={isDark} />
    </>
  );
}

/* ─── Contact / Query Form Section ─── */
const SERVICE_OPTIONS = [
  "Product Design & UX",
  "Web Development",
  "Mobile Development",
  "Cloud & DevOps",
  "AI & Data",
  "Quality Engineering",
  "Not sure yet",
];

function ContactFormSection({ isDark }: { isDark: boolean }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (next = form) => ({
    name: !next.name.trim()
      ? "Your name is required."
      : next.name.trim().length < 2
      ? "Please enter at least 2 characters."
      : "",
    email: !next.email.trim()
      ? "Work email is required."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)
      ? "Enter a valid email address."
      : "",
    budget: !next.budget ? "Select a budget range." : "",
    service: !next.service ? "Select one service area." : "",
    message: !next.message.trim()
      ? "Project brief is required."
      : next.message.trim().length < 20
      ? "Add a little more detail."
      : "",
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    setErrors(validate(next));
  };

  const markTouched = (field: keyof typeof form) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleService = (s: string) =>
    setForm((prev) => {
      const next = { ...prev, service: s };
      setErrors(validate(next));
      return next;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, company: true, budget: true, service: true, message: true });
    if (Object.values(nextErrors).some(Boolean)) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const isValid = !Object.values(validate()).some(Boolean);
  const showFieldError = (field: keyof typeof form) => touched[field] || submitted;

  const inputBase: React.CSSProperties = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <motion.section
      className="relative overflow-hidden border-t"
      style={{
        borderColor: "var(--border)",
        backgroundColor: isDark ? "#000000" : "#eef1f5",
      }}
      aria-label="Start a project query"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0BBDF4] to-transparent opacity-60" />
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0BBDF4]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: copy */}
          <motion.div variants={fadeUp} custom={0}>
            <Badge variant="blue" className="mb-6">
              Let's Build Together
            </Badge>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight"
              style={{ color: "var(--fg)" }}
            >
              Tell us about your{" "}
              <span className="text-[#0BBDF4]">project.</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: "var(--fg-muted)" }}
            >
              We'll respond within one business day with a clear plan — not a
              sales deck. No commitments, no pressure.
            </p>

            {/* Trust proof */}
            <div className="space-y-4">
              {[
                { emoji: "⚡", text: "Response within 1 business day" },
                { emoji: "📋", text: "Detailed project plan, not a pitch" },
                { emoji: "🔒", text: "NDA available on request" },
                { emoji: "🌍", text: "Serving clients across 4 continents" },
              ].map(({ emoji, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="text-xl">{emoji}</span>
                  <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div variants={fadeUp} custom={1}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col items-center justify-center text-center p-12 rounded-2xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    minHeight: 480,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#0BBDF4]/15 flex items-center justify-center mb-6">
                    <svg
                      className="w-8 h-8 text-[#0BBDF4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: "var(--fg)" }}
                  >
                    Message received!
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-xs"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    We'll review your brief and get back to{" "}
                    <span className="text-[#0BBDF4] font-semibold">
                      {form.email}
                    </span>{" "}
                    within one business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl p-8 space-y-5"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        style={{ color: "var(--fg-subtle)" }}
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Alex Johnson"
                        value={form.name}
                        onChange={updateField}
                        onBlur={() => markTouched("name")}
                        style={inputBase}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = "#0BBDF4")
                        }
                        onBlurCapture={(e) =>
                          (e.currentTarget.style.borderColor = "var(--border)")
                        }
                      />
                      {showFieldError("name") && errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        style={{ color: "var(--fg-subtle)" }}
                      >
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={updateField}
                        onBlur={() => markTouched("email")}
                        style={inputBase}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = "#0BBDF4")
                        }
                        onBlurCapture={(e) =>
                          (e.currentTarget.style.borderColor = "var(--border)")
                        }
                      />
                      {showFieldError("email") && errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Company + Budget row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        style={{ color: "var(--fg-subtle)" }}
                      >
                        Company / Startup
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        placeholder="Acme Inc."
                        value={form.company}
                        onChange={updateField}
                        style={inputBase}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = "#0BBDF4")
                        }
                        onBlurCapture={(e) =>
                          (e.currentTarget.style.borderColor = "var(--border)")
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        style={{ color: "var(--fg-subtle)" }}
                      >
                        Budget Range
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={form.budget}
                        onChange={updateField}
                        style={{ ...inputBase, cursor: "pointer" }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = "#0BBDF4")
                        }
                        onBlurCapture={(e) =>
                          (e.currentTarget.style.borderColor = "var(--border)")
                        }
                      >
                        <option value="">Select range…</option>
                        <option value="under-10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 – $25,000</option>
                        <option value="25k-50k">$25,000 – $50,000</option>
                        <option value="50k-100k">$50,000 – $100,000</option>
                        <option value="100k+">$100,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Service chips */}
                  <div>
                    <p
                      className="text-xs font-semibold mb-2.5 uppercase tracking-wide"
                      style={{ color: "var(--fg-subtle)" }}
                    >
                      I need help with
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleService(s)}
                          className="px-3 py-1.5 text-xs rounded-full border transition-all duration-200 font-medium"
                          style={{
                            borderColor:
                              form.service === s ? "#0BBDF4" : "var(--border)",
                            background:
                              form.service === s
                                ? "rgba(11,189,244,0.12)"
                                : "transparent",
                            color:
                              form.service === s ? "#0BBDF4" : "var(--fg-muted)",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project brief */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                      style={{ color: "var(--fg-subtle)" }}
                    >
                      Project Brief *
                    </label>
                  <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us what you're building, the problem you're solving, and any timeline or technical constraints…"
                      value={form.message}
                      onChange={updateField}
                      onBlur={() => markTouched("message")}
                      style={{ ...inputBase, resize: "vertical" }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "#0BBDF4")
                      }
                      onBlurCapture={(e) =>
                          (e.currentTarget.style.borderColor = "var(--border)")
                        }
                    />
                    <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: "var(--fg-subtle)" }}>
                      <span>Required</span>
                      <span>{form.message.length}/800</span>
                    </div>
                    {showFieldError("message") && errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading || !isValid}
                    className="w-full py-3.5 text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    style={{
                      background: loading
                        ? "rgba(11,189,244,0.6)"
                        : "#0BBDF4",
                      color: "#000000",
                    }}
                    whileHover={loading ? {} : { scale: 1.02 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Project Brief
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[11px]" style={{ color: "var(--fg-subtle)" }}>
                    No spam. No commitments. We'll respond within 1 business day.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
