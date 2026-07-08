"use client";

import { useState } from "react";
import type { CSSProperties, ChangeEvent, FormEvent } from "react";
import { Section, SectionHeading, GlowCard, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { CAREERS } from "@/lib/data";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import Link from "next/link";
import { Trophy, Shield, Network } from "iconoir-react";

const EMPLOYEE_TESTIMONIALS = [
  {
    quote: "At Onyx, there is no micromanagement. We are given complete autonomy to deliver high-quality work on our own schedules. It's the best remote engineering experience I've had.",
    author: "Jonas M. — Senior Frontend Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1200&fit=crop&q=80",
    alt: "Portrait of Jonas",
  },
  {
    quote: "The focus on clean code and design tokens saved us months of refactoring. We pair program directly and learn new patterns weekly.",
    author: "Sara T. — Full Stack Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1200&fit=crop&q=80",
    alt: "Portrait of Sara",
  }
];

type GeneralApplicationState = {
  name: string;
  email: string;
  role: string;
  portfolio: string;
  message: string;
};

const PERKS = [
  {
    icon: <Network className="w-6 h-6" />,
    title: "100% Remote & Async",
    desc: "Work from anywhere in the world. Choose the hours and location that optimize your lifestyle and output.",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Learning Budget",
    desc: "Generous annual budget for books, courses, conferences, and technical equipment of your choosing.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Annual Offsites",
    desc: "We meet in person once or twice a year to brainstorm, connect, and enjoy exotic destinations together.",
  },
];

export default function CareersIndex() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<GeneralApplicationState>({
    name: "",
    email: "",
    role: "",
    portfolio: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const departments = ["All", "Engineering", "Design", "Product"];
  
  const filteredRoles = selectedDept === "All" 
    ? CAREERS 
    : CAREERS.filter(role => role.department === selectedDept);

  const validate = (next = form) => ({
    name: !next.name.trim()
      ? "Name is required."
      : next.name.trim().length < 2
      ? "Please enter at least 2 characters."
      : "",
    email: !next.email.trim()
      ? "Email is required."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)
      ? "Enter a valid email address."
      : "",
    role: !next.role.trim() ? "Tell us the role you're targeting." : "",
    portfolio: !next.portfolio.trim()
      ? "Add a portfolio, GitHub, LinkedIn, or CV link."
      : "",
    message: !next.message.trim()
      ? "Tell us what makes you a strong fit."
      : next.message.trim().length < 20
      ? "Add a little more detail."
      : "",
  });

  const updateField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    setErrors(validate(next));
  };

  const markTouched = (field: keyof GeneralApplicationState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      role: true,
      portfolio: true,
      message: true,
    });
    if (Object.values(nextErrors).some(Boolean)) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const showError = (field: keyof GeneralApplicationState) => touched[field] || submitted;
  const inputBase: CSSProperties = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="min-h-screen">
      <main className="flex-1 flex flex-col pt-16">
        {/* Culture Hero */}
        <section className="relative py-28 overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] bg-[#0BBDF4]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <Badge variant="blue" className="mb-6">Careers at Onyx</Badge>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-8 leading-none">
              Shape the Future of Technology With Us
            </h1>
            <div className="mt-10 max-w-2xl mx-auto" style={{ color: "var(--fg)" }}>
              <TextGradientScroll
                type="word"
                textOpacity="soft"
                className="text-lg md:text-xl font-medium leading-relaxed"
                text="We are a fully distributed team of engineers, designers, and thinkers crafting premium software solutions for modern enterprises."
              />
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <Section className="border-t transition-colors" style={{ borderColor: "var(--border)", background: "var(--section-alt)" } as React.CSSProperties}>
          <SectionHeading
            eyebrow="Perks & Benefits"
            title="Designed for Your Growth and Well-being"
            subtitle="We believe in offering high flexibility, direct ownership, and premium support for our team."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {PERKS.map((perk) => (
              <GlowCard key={perk.title} className="p-8">
                <div className="w-12 h-12 rounded-xl bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center mb-6">
                  {perk.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{perk.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{perk.desc}</p>
              </GlowCard>
            ))}
          </div>
        </Section>

        {/* Interview Stepper/Timeline */}
        <Section className="border-t transition-colors" style={{ borderColor: "var(--border)" } as React.CSSProperties}>
          <SectionHeading
            eyebrow="Our Process"
            title="A Transparent Selection Framework"
            subtitle="How we evaluate talent: simple, structured, and focused on practical proficiency."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 relative">
            <div className="flex flex-col gap-3">
              <span className="text-3xl font-black text-[#0BBDF4]">01</span>
              <h4 className="font-bold">Application Review</h4>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>We assess alignment of technical skills and past projects.</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-3xl font-black text-[#0BBDF4]">02</span>
              <h4 className="font-bold">Technical Alignment</h4>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>A short conversation discussing engineering architecture and core patterns.</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-3xl font-black text-[#0BBDF4]">03</span>
              <h4 className="font-bold">Practical Assessment</h4>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>A paid, real-world task completed on your own schedule.</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-3xl font-black text-[#0BBDF4]">04</span>
              <h4 className="font-bold">Final Review & Offer</h4>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>Aligning on values, expectations, and compensation structures.</p>
            </div>
          </div>
        </Section>

        {/* Filterable Open Roles List */}
        <Section className="border-t transition-colors" style={{ borderColor: "var(--border)", background: "var(--section-alt)" } as React.CSSProperties}>
          <SectionHeading
            eyebrow="Open Roles"
            title="Find Your Next Challenge"
            subtitle="Explore our active engineering and design openings below."
          />

          {/* Department Filter Buttons */}
          <div className="flex gap-2 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                  selectedDept === dept
                    ? "bg-[#0BBDF4] text-black border-[#0BBDF4] font-semibold"
                    : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-hover)] hover:text-[var(--fg)]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Roles list */}
          <div className="flex flex-col gap-4">
            {filteredRoles.map((role) => (
              <div
                key={role.slug}
                className="rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(11,189,244,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="blue">{role.department}</Badge>
                    <Badge variant="neutral">{role.location}</Badge>
                  </div>
                </div>
                <div>
                  <Link href={`/careers/${role.slug}`}>
                    <Button variant="secondary" className="group">
                      View Role
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {filteredRoles.length === 0 && (
              <p className="text-center py-12" style={{ color: "var(--fg-subtle)" }}>No current roles in this department. Check back soon!</p>
            )}
          </div>
        </Section>

        {/* Spotlight Quotes - Reused Testimonial Reel for Employees */}
        <section className="px-6 py-24 border-t transition-colors" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }} aria-label="Employee stories">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
            <div className="text-center max-w-2xl">
              <Badge variant="blue" className="mb-4">Team Voice</Badge>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--fg)" }}>
                What it's like to build at Onyx
              </h2>
            </div>
            <ScrollReelTestimonials testimonials={EMPLOYEE_TESTIMONIALS} className="w-full" />
          </div>
        </section>

        {/* CTA: General Application */}
        <Section className="border-t transition-colors py-20" style={{ borderColor: "var(--border)", background: "var(--section-alt)" } as React.CSSProperties}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
              Don't see your role?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--fg-muted)" }}>
              We are always looking for exceptional, self-driven talent. Send us a general application.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-[28px] border p-6 md:p-8" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
            {submitted ? (
              <div className="min-h-[280px] flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-[#0BBDF4]/15 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#0BBDF4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>Application received!</h3>
                <p className="max-w-xl" style={{ color: "var(--fg-muted)" }}>
                  Thanks for reaching out. We’ll review your general application and follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6" noValidate>
                <div>
                  <label htmlFor="general-name" className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--fg-subtle)" }}>
                    Full Name *
                  </label>
                  <input id="general-name" name="name" type="text" value={form.name} onChange={updateField} onBlur={() => markTouched("name")} placeholder="Ayesha Khan" style={inputBase} />
                  {showError("name") && errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="general-email" className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--fg-subtle)" }}>
                    Email Address *
                  </label>
                  <input id="general-email" name="email" type="email" value={form.email} onChange={updateField} onBlur={() => markTouched("email")} placeholder="you@domain.com" style={inputBase} />
                  {showError("email") && errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="general-role" className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--fg-subtle)" }}>
                    Target Role *
                  </label>
                  <input id="general-role" name="role" type="text" value={form.role} onChange={updateField} onBlur={() => markTouched("role")} placeholder="Frontend Engineer" style={inputBase} />
                  {showError("role") && errors.role && <p className="mt-2 text-xs text-red-500">{errors.role}</p>}
                </div>
                <div>
                  <label htmlFor="general-portfolio" className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--fg-subtle)" }}>
                    Portfolio / CV Link *
                  </label>
                  <input id="general-portfolio" name="portfolio" type="url" value={form.portfolio} onChange={updateField} onBlur={() => markTouched("portfolio")} placeholder="https://..." style={inputBase} />
                  {showError("portfolio") && errors.portfolio && <p className="mt-2 text-xs text-red-500">{errors.portfolio}</p>}
                </div>
                <div className="lg:col-span-2">
                  <label htmlFor="general-message" className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--fg-subtle)" }}>
                    Tell Us More *
                  </label>
                  <textarea id="general-message" name="message" rows={5} value={form.message} onChange={updateField} onBlur={() => markTouched("message")} placeholder="Share your background, preferred specialty, and why you'd like to join Onyx." style={{ ...inputBase, resize: "vertical" }} />
                  <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: "var(--fg-subtle)" }}>
                    <span>Required</span>
                    <span>{form.message.length}/800</span>
                  </div>
                  {showError("message") && errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
                </div>
                <div className="lg:col-span-2 pt-2">
                  <Button type="submit" size="lg" className="w-full md:w-auto px-8" disabled={loading}>
                    {loading ? "Sending..." : "Send General Application"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Section>
      </main>
    </div>
  );
}
