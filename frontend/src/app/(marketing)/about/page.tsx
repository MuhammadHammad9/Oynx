"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import Link from "next/link";
import { ArrowRight, Trophy, Shield, Network } from "iconoir-react";
import { Globe, Target, Code, Users, MapPin } from "lucide-react";
import ProfileCard from "@/components/ui/ProfileCard";
import Strands from "@/components/ui/Strands";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useRef } from "react";
import { useTheme } from "@/components/ui/theme-provider";
import { CORE_TEAM } from "@/lib/team";


const VALUES = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Radical Transparency",
    detail: "No black boxes.",
    desc: "We don't hide behind status emails. You see our commit logs, active sprint boards, and direct QA test reports in real-time. Every stakeholder gets the same unfiltered view we have. We believe that true partnership is built on open communication and shared understanding of both successes and setbacks.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
    stat: "100%",
    statLabel: "client visibility on sprints",
  },
  {
    icon: <Network className="w-7 h-7" />,
    title: "Autonomy with Accountability",
    detail: "Outcomes over hours.",
    desc: "We hire adults and trust them to manage their own schedules. We measure outcomes, velocity, and craftsmanship — not clock-in times. Accountability is built into every commit and every delivery. Our teams are empowered to make architectural decisions that best serve the product's long-term viability.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80",
    stat: "0",
    statLabel: "micromanagement layers",
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    title: "Craftsmanship First",
    detail: "Code that lasts.",
    desc: "We believe in writing readable, performant code that stands up to audited security checks and scales under load. Every PR goes through Playwright E2E, accessibility checks, and automated regression before it ships. We refuse to compromise on quality to meet arbitrary deadlines.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80",
    stat: "Every PR",
    statLabel: "fully tested before merge",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] },
  }),
};

export default function AboutPage() {
  const strandsContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Strands colors adapt to theme
  const strandsColors = isDark
    ? ["#0EA5E9", "#7C3AED", "#061a23"]
    : ["#0EA5E9", "#38BDF8", "#f0f4f8"];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* ── Hero ── */}
      <Section className="pb-12 pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="blue" className="mb-6">About Onyx Interactive</Badge>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-8 leading-[1.05]" style={{ color: "var(--fg)" }}>
            A software house built on{" "}
            <span className="text-[#0BBDF4]">trust</span> and delivery capability.
          </h1>
          <div className="mt-12 text-left" style={{ color: "var(--fg)" }}>
            <TextGradientScroll
              type="word"
              textOpacity="soft"
              className="max-w-3xl mx-auto text-2xl md:text-3xl font-medium leading-relaxed text-center"
              text="Onyx Interactive exists to give ambitious teams an engineering partner they can trust with the parts of the product that matter most."
            />
          </div>
          <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-balance" style={{ color: "var(--fg-muted)" }}>
            Since our inception, we have focused on one thing: shipping robust, scalable, and beautifully designed digital products. We don't just write code; we build sustainable software architectures that power next-generation businesses.
          </p>
        </div>
      </Section>

      {/* ── Core Stats ── */}
      <section className="py-16 md:py-24 border-y transition-colors" style={{ borderColor: "var(--border)", background: "var(--section-alt)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { label: "Year in Business", value: "1", icon: <Target className="w-5 h-5 mx-auto mb-2 text-[#0BBDF4]" /> },
              { label: "Products Launched", value: "20", icon: <Code className="w-5 h-5 mx-auto mb-2 text-[#0BBDF4]" /> },
              { label: "Global Clients", value: "7", icon: <Globe className="w-5 h-5 mx-auto mb-2 text-[#0BBDF4]" /> },
              { label: "Team Members", value: "15", icon: <Users className="w-5 h-5 mx-auto mb-2 text-[#0BBDF4]" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                {stat.icon}
                <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground" style={{ color: "var(--fg-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Footprint — scroll storytelling ── */}
      <div
        ref={strandsContainerRef}
        className="relative min-h-[150vh] border-b transition-colors"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Background dynamically switches based on theme */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700" style={{ background: isDark ? "#0a0a0a" : "#fdfdfd" }}>
          {/* Strands */}
          <div className="absolute inset-0 z-0">
            <Strands
              colors={strandsColors}
              count={5}
              speed={0.1}
              amplitude={1.5}
              waviness={1.8}
              thickness={0.6}
              glow={isDark ? 1.8 : 0.5}
              taper={1.2}
              spread={1.2}
              intensity={0.5}
              saturation={1.4}
              opacity={isDark ? 1 : 0.7}
              scale={2.0}
              glass={false}
            />
          </div>

          {/* Overlay gradient to ensure text readability */}
          <div className={`absolute inset-0 z-[1] pointer-events-none ${isDark ? 'bg-gradient-to-b from-black/80 via-black/40 to-black/80' : 'bg-gradient-to-b from-white/80 via-white/40 to-white/80'}`} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <Badge variant="blue" className={`mb-12 ${isDark ? '!bg-white/10 !border-white/20 !text-white' : '!bg-black/5 !border-black/10 !text-black'} backdrop-blur-md`}>
              Global Footprint
            </Badge>
            
            <ScrollReveal
              scrollContainerRef={strandsContainerRef}
              enableBlur={true}
              baseOpacity={0}
              baseRotation={3}
              blurStrength={8}
              textClassName={`font-bold drop-shadow-xl ${isDark ? 'text-white' : 'text-slate-900'}`}
              rotationEnd="bottom bottom"
              wordAnimationEnd="center center"
            >
              Serving clients from three tech hubs. Our engineering delivery operates from Lahore, Karachi, and Islamabad, giving us direct access to the region's elite technical talent. We sync work hours with EMEA and North American teams to ensure continuous developer handoff and zero communication gaps.
            </ScrollReveal>

            {/* City pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mt-16"
            >
              {["Lahore, PK", "Karachi, PK", "Islamabad, PK"].map((city) => (
                <span key={city} className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-black/5 border-black/10 text-slate-800'} border backdrop-blur-md font-semibold text-sm shadow-sm`}>
                  <MapPin className="h-4 w-4" aria-hidden="true" /> {city}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Culture & Values ── */}
      <section
        id="culture"
        className="py-24 md:py-32 transition-colors"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Culture & Values"
            title="Our Operational DNA"
            subtitle="How we collaborate internally and partner with client organizations to build lasting products."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="group relative rounded-2xl overflow-hidden min-h-[420px] cursor-default"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.25)" : "0 18px 50px rgba(15,23,42,0.08)",
                }}
              >
                {/* Background image layer */}
                <div className="absolute inset-0 z-0 bg-black">
                  <img
                    src={val.image}
                    alt={val.title}
                    className="w-full h-full object-cover opacity-60 grayscale transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] text-transparent"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isDark ? "bg-gradient-to-t from-black via-black/82 to-black/35" : "bg-gradient-to-t from-white via-white/86 to-white/50"}`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                  {/* Top: icon + stat */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#0BBDF4]/12 text-[#0BBDF4] flex items-center justify-center border border-[#0BBDF4]/25">
                      {val.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#0BBDF4] drop-shadow-md">{val.stat}</div>
                      <div className="text-[11px] font-medium uppercase tracking-wider mt-0.5" style={{ color: isDark ? "rgba(255,255,255,0.76)" : "rgba(2,6,23,0.62)" }}>{val.statLabel}</div>
                    </div>
                  </div>

                  {/* Bottom: text */}
                  <div>
                    <p className="text-xs font-semibold text-[#0BBDF4] uppercase tracking-widest mb-2 drop-shadow-sm">{val.detail}</p>
                    <h3 className="font-bold text-2xl mb-3 leading-tight" style={{ color: isDark ? "#fff" : "#07111f" }}>{val.title}</h3>
                    <p className="text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-60 transition-[max-height] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(2,6,23,0.76)" }}>
                      {val.desc}
                    </p>
                    <p className="text-sm leading-relaxed group-hover:hidden block" style={{ color: isDark ? "rgba(255,255,255,0.78)" : "rgba(2,6,23,0.64)" }}>
                      {val.desc.substring(0, 90)}…
                    </p>
                  </div>
                </div>

                {/* Hover glow accent */}
                <div className="absolute inset-0 z-20 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-[#0BBDF4]/30 transition-shadow duration-200 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Team ── */}
      <section
        id="leadership"
        className="py-24 md:py-32 border-t transition-colors"
        style={{ borderColor: "var(--border)", background: "var(--section-alt)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Leadership"
            title="Meet the Core Team"
            subtitle="Our leaders are practitioners who have built and scaled systems, not just career administrators."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {CORE_TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
              >
                <ProfileCard
                  name={member.name}
                  title={member.title}
                  handle={member.handle.replace('@', '')}
                  status={member.status}
                  contactText="Contact Me"
                  avatarUrl={member.avatarUrl}
                  showUserInfo
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.open(member.linkedin, "_blank")}
                  behindGlowEnabled={false}
                  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link href="/about/team">
              <Button size="lg" className="px-10 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(11,189,244,0.3)] hover:shadow-[0_0_30px_rgba(11,189,244,0.5)] transition-all" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden border-t py-32 text-center transition-colors"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0BBDF4]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Badge variant="blue" className="mb-8">Work With Us</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: "var(--fg)" }}>
            Let's create something <span className="text-[#0BBDF4]">reliable</span>
          </h2>
          <p className="mb-12 text-xl leading-relaxed text-balance" style={{ color: "var(--fg-muted)" }}>
            Discuss your engineering challenges with our team today. No pitch decks, no pressure. Just a straightforward conversation about how we can help you build better.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" className="px-10 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(11,189,244,0.2)]" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start a Conversation
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="secondary" className="px-10 py-6 text-lg rounded-xl border-2">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
