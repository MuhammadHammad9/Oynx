"use client";

import { useRef } from "react";
import { GlowCard, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, QuoteMessage } from "iconoir-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CaseStudyData {
  client: string;
  industry: string;
  service: string;
  metric: string;
  metricLabel: string;
  title: string;
  challenge: string;
  approach: string;
  stats: { number: string; label: string }[];
  tech: string[];
  heroImage: string;
  contentImages: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export function CaseStudyClient({ data }: { data: CaseStudyData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), { stiffness: 80, damping: 28 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      className="min-h-screen"
      ref={containerRef}
      style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Immersive Parallax Hero */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-end">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity, backgroundColor: "var(--bg)" }}
        >
          <img
            src={data.heroImage}
            alt={data.title}
            className="w-full h-full object-cover opacity-60 grayscale-[15%]"
          />
          {/* Gradient fades into the theme background color */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, var(--bg) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 40%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors uppercase tracking-widest font-semibold"
            style={{ color: "var(--fg-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
          >
            <ArrowLeft className="w-4 h-4" />
            All Work
          </Link>

          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <Badge variant="blue" className="backdrop-blur-md px-4 py-1">
                {data.industry}
              </Badge>
              <span
                className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium border backdrop-blur-md"
                style={{
                  background: "rgba(var(--bg-card), 0.6)",
                  color: "var(--fg)",
                  borderColor: "var(--border)",
                }}
              >
                {data.service}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.05] drop-shadow-sm"
              style={{ color: "var(--fg)" }}
            >
              {data.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12 pl-6"
              style={{ borderLeft: "2px solid #0BBDF4" }}
            >
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1"
                  style={{ color: "var(--fg-subtle)" }}
                >
                  Key Outcome
                </p>
                <p className="text-4xl md:text-5xl font-black text-[#0BBDF4] tracking-tight">
                  {data.metric}
                </p>
              </div>
              <div className="sm:mt-4">
                <p
                  className="text-sm md:text-base font-medium max-w-xs leading-relaxed"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {data.metricLabel}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left: Main Narrative */}
          <motion.div
            className="lg:col-span-8 space-y-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* The Challenge */}
            <motion.div variants={fadeUp}>
              <h2 className="text-sm text-[#0BBDF4] uppercase tracking-widest font-bold mb-4">
                01. The Challenge
              </h2>
              <p
                className="leading-relaxed text-xl md:text-2xl font-light"
                style={{ color: "var(--fg-muted)" }}
              >
                {data.challenge}
              </p>
            </motion.div>

            {/* Immersive Mid-Content Image 1 */}
            <motion.div
              variants={fadeUp}
              className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm"
              style={{ border: "1px solid var(--border)" }}
            >
              <img
                src={data.contentImages[0]}
                alt="Challenge Context"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* The Approach */}
            <motion.div variants={fadeUp}>
              <h2 className="text-sm text-[#0BBDF4] uppercase tracking-widest font-bold mb-4">
                02. Engineering Approach
              </h2>
              <p
                className="leading-relaxed text-xl md:text-2xl font-light"
                style={{ color: "var(--fg-muted)" }}
              >
                {data.approach}
              </p>
            </motion.div>

            {/* Stat Cards Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {data.stats.map((s) => (
                <GlowCard
                  key={s.label}
                  className="p-8 text-center sm:text-left transition-all"
                >
                  <span
                    className="text-4xl font-black block mb-2"
                    style={{ color: "var(--fg)" }}
                  >
                    {s.number}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-widest font-semibold"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    {s.label}
                  </span>
                </GlowCard>
              ))}
            </motion.div>

            {/* Integrated Testimonial */}
            <motion.div
              variants={fadeUp}
              className="relative mt-24 mb-10 pt-16"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <QuoteMessage
                className="absolute top-8 left-0 w-12 h-12 -z-10"
                style={{ color: "rgba(11,189,244,0.2)" }}
              />
              <blockquote
                className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-10"
                style={{ color: "var(--fg)" }}
              >
                "{data.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={data.testimonial.image}
                  alt={data.testimonial.author}
                  className="w-14 h-14 rounded-full object-cover grayscale"
                  style={{ border: "1px solid var(--border)" }}
                />
                <div>
                  <p
                    className="font-bold text-sm tracking-wide"
                    style={{ color: "var(--fg)" }}
                  >
                    {data.testimonial.author}
                  </p>
                  <p className="text-[#0BBDF4] text-xs font-semibold uppercase tracking-widest mt-1">
                    {data.testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Immersive Mid-Content Image 2 */}
            <motion.div
              variants={fadeUp}
              className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-sm"
              style={{ border: "1px solid var(--border)" }}
            >
              <img
                src={data.contentImages[1]}
                alt="Results"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>

          {/* Right: Sticky Sidebar Details */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl p-8 shadow-xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="text-xs uppercase tracking-widest font-bold mb-8"
                style={{ color: "var(--fg-subtle)" }}
              >
                Project Details
              </h3>
              <div className="space-y-8">
                <div>
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] block mb-2 font-semibold"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    Client Partner
                  </span>
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--fg)" }}
                  >
                    {data.client}
                  </span>
                </div>
                <div>
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] block mb-2 font-semibold"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    Industry
                  </span>
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--fg)" }}
                  >
                    {data.industry}
                  </span>
                </div>
                <div
                  className="pt-6"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] block mb-4 font-semibold"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {data.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium font-mono border"
                        style={{
                          background: "var(--bg-subtle)",
                          color: "var(--fg-muted)",
                          borderColor: "var(--border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metric Callout */}
                <div
                  className="pt-6 mt-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.15em] block mb-3 font-semibold"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    Key Result
                  </span>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(11,189,244,0.08)",
                      border: "1px solid rgba(11,189,244,0.2)",
                    }}
                  >
                    <span className="text-3xl font-black text-[#0BBDF4] block tracking-tight">
                      {data.metric}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-widest font-semibold block mt-1"
                      style={{ color: "var(--fg-subtle)" }}
                    >
                      {data.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      {/* CTA Section */}
      <section
        className="py-32 text-center relative overflow-hidden"
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(11,189,244,0.06), transparent)",
          }}
        />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ color: "var(--fg)" }}
          >
            Drive similar results.
          </h2>
          <p
            className="mb-10 text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            Partner with us to engineer robust, high-performance systems that elevate your business.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="px-10 h-14 text-base font-semibold text-white"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Start a Conversation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
