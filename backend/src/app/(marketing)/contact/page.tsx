"use client";

import { useMemo, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Check } from "iconoir-react";

const STEPS = [
  {
    id: 1,
    question: "What best describes your project?",
    options: ["New product / MVP", "Redesign / rebuild", "Staff augmentation", "Ongoing maintenance"],
  },
  {
    id: 2,
    question: "What's your approximate timeline?",
    options: ["< 3 months", "3–6 months", "6–12 months", "Flexible / TBD"],
  },
  {
    id: 3,
    question: "What's your estimated budget range?",
    options: ["< $10k", "$10k – $50k", "$50k – $200k", "$200k+"],
  },
];

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ContactField = keyof ContactFormState;

export default function ContactPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const requiredStepsComplete = [1, 2, 3].every((step) => answers[step]);

  const validators = useMemo<Record<ContactField, (value: string) => string>>(() => ({
    name: (value: string) => {
      if (!value.trim()) return "Name is required.";
      if (value.trim().length < 2) return "Name should be at least 2 characters.";
      return "";
    },
    email: (value: string) => {
      if (!value.trim()) return "Work email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
      return "";
    },
    message: (value: string) => {
      if (!value.trim()) return "Tell us a bit about the project.";
      if (value.trim().length < 20) return "Give us a little more detail.";
      if (value.length > 800) return "Keep the message under 800 characters.";
      return "";
    },
    company: () => "",
  }), []);

  const messageLength = form.message.length;
  const formErrors = {
    name: validators.name(form.name),
    email: validators.email(form.email),
    company: validators.company(form.company),
    message: validators.message(form.message),
  };
  const canSubmit = requiredStepsComplete && !Object.values(formErrors).some(Boolean);

  const setField = (field: ContactField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
  };

  const markTouched = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](form[field]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = {
      name: validators.name(form.name),
      email: validators.email(form.email),
      message: validators.message(form.message),
    };
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (!requiredStepsComplete || Object.values(nextErrors).some(Boolean)) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>
      {/* Background ambient gradient */}
      <div className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-[#0BBDF4]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start relative z-10" ref={containerRef}>

        {/* ─── LEFT — Interactive Scroll Journey ─── */}
        <div className="max-w-2xl relative">
          
          {/* Scroll Progress Line */}
          <div className="absolute left-[-2rem] top-0 bottom-0 w-1 rounded-full hidden md:block" style={{ backgroundColor: "var(--bg-subtle)" }}>
             <motion.div 
               className="w-full rounded-full"
               style={{ height: progressHeight, backgroundColor: "var(--accent)" }}
             />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mb-32"
          >
            <Badge variant="blue" className="mb-8">Start a Project</Badge>
            <h1 className="text-[clamp(3rem,5vw,5.5rem)] font-bold tracking-tight mb-6 leading-[1.1] max-w-xl">
              Tell us about your project.
            </h1>
            <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-xl" style={{ color: "var(--fg-muted)" }}>
              We'll review your requirements and get back to you within 24 hours with a clear, actionable plan.
            </p>
          </motion.div>

          {!submitted ? (
            <div className="space-y-32">
              {/* Questions as a scrollable list */}
              {STEPS.map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className="scroll-mt-24"
                  >
                    {/* Enable this step only if previous step answered */}
                    {(() => {
                      const isEnabled = step.id === 1 || !!answers[step.id - 1];
                      return (
                        <>
                          <h2 className="text-3xl font-bold mb-8" style={{ opacity: isEnabled ? 1 : 0.5 }}>{step.question}</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {step.options.map((opt) => {
                              const isSelected = answers[step.id] === opt;
                              const disabled = !isEnabled;
                              return (
                                <button
                                  key={opt}
                                  onClick={() => !disabled && setAnswers(prev => ({ ...prev, [step.id]: opt }))}
                                  disabled={disabled}
                                  className="group relative w-full text-left p-6 rounded-2xl border transition-all duration-300 overflow-hidden"
                                  style={{
                                    backgroundColor: disabled
                                      ? "var(--bg-card-muted)"
                                      : isSelected
                                      ? "var(--bg-card-hover)"
                                      : "var(--bg-card)",
                                    borderColor: disabled
                                      ? "var(--border-muted)"
                                      : isSelected
                                      ? "var(--accent)"
                                      : "var(--border)",
                                    boxShadow: isSelected ? "var(--shadow-glow-sm)" : "var(--shadow-card)",
                                    transform: "scale(1)",
                                    cursor: disabled ? "not-allowed" : "pointer",
                                    opacity: disabled ? 0.6 : 1,
                                  }}
                                  onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(1.02)"; }}
                                  onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(1)"; }}
                                >
                                  <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                                    style={{ backgroundColor: "var(--accent)" }}
                                  />
                                  <div className="flex items-center justify-between relative z-10">
                                    <span className="font-semibold text-lg" style={{ color: isSelected ? "var(--accent)" : "var(--fg)" }}>{opt}</span>
                                    {isSelected && <Check className="w-6 h-6 text-[#0BBDF4]" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                ))}

              {/* Detail form at the bottom */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="pt-12 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <h2 className="text-3xl font-bold mb-8">Almost there — a few details</h2>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <p className="text-sm text-[var(--fg-muted)]">
                    Required: project type, timeline, budget, name, work email, and a short project summary.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold mb-2" style={{ color: "var(--fg)" }}>
                        Name <span className="text-[#0BBDF4]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        onBlur={() => markTouched("name")}
                        placeholder="Ayesha Khan"
                        className="w-full px-5 py-4 rounded-xl border transition-all text-base focus:outline-none focus:ring-2 focus:ring-[#0BBDF4]/50 focus:border-[#0BBDF4]"
                        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }}
                      />
                      {(touched.name || submitted) && errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-semibold mb-2" style={{ color: "var(--fg)" }}>
                        Company <span className="text-[var(--fg-subtle)]">(optional)</span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full px-5 py-4 rounded-xl border transition-all text-base focus:outline-none focus:ring-2 focus:ring-[#0BBDF4]/50 focus:border-[#0BBDF4]"
                        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold mb-2" style={{ color: "var(--fg)" }}>
                      Work Email <span className="text-[#0BBDF4]">*</span>
                    </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        onBlur={() => markTouched("email")}
                        placeholder="you@company.com"
                        className="w-full px-5 py-4 rounded-xl border transition-all text-base focus:outline-none focus:ring-2 focus:ring-[#0BBDF4]/50 focus:border-[#0BBDF4]"
                        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }}
                      />
                      {(touched.email || submitted) && errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold mb-2" style={{ color: "var(--fg)" }}>
                        Tell us more <span className="text-[#0BBDF4]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      onBlur={() => markTouched("message")}
                      placeholder="Brief overview of the challenge, existing tech stack, or must-have constraints..."
                      className="w-full px-5 py-4 rounded-xl border transition-all text-base focus:outline-none focus:ring-2 focus:ring-[#0BBDF4]/50 focus:border-[#0BBDF4] resize-none"
                      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }}
                    />
                    <div className="mt-2 flex items-center justify-between text-[10px]" style={{ color: "var(--fg-subtle)" }}>
                      <span>Required</span>
                      <span>{messageLength}/800</span>
                    </div>
                    {(touched.message || submitted) && errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
                  </div>
                  <Button type="submit" size="lg" disabled={!canSubmit} className="w-full md:w-auto px-12 py-6 text-lg mt-4 font-bold tracking-wide rounded-xl shadow-[0_0_20px_rgba(11,189,244,0.3)] hover:shadow-[0_0_30px_rgba(11,189,244,0.5)] transition-all disabled:opacity-40 disabled:shadow-none">
                    Send Project Details
                  </Button>
                </form>
              </motion.div>
            </div>
          ) : (
            /* Success state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="py-16 p-12 rounded-3xl border text-center"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="w-20 h-20 rounded-full bg-[#0BBDF4]/15 text-[#0BBDF4] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(11,189,244,0.2)]">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Message Received.</h2>
              <p className="text-xl max-w-md mx-auto" style={{ color: "var(--fg-muted)" }}>
                Expect a direct reply from a qualified engineer within 24 business hours. No bots, no generic sales emails.
              </p>
            </motion.div>
          )}
        </div>

        {/* ─── RIGHT — Sticky Reassurance panel (parallax/desktop) ─── */}
        <aside className="hidden lg:block sticky top-32">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl border p-10 flex flex-col gap-10 shadow-2xl backdrop-blur-xl"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            {/* Response time */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--fg-subtle)" }}>Average Response</p>
              <p className="text-4xl font-black text-[#0BBDF4]">&lt; 24 hrs</p>
              <p className="text-sm font-medium mt-2" style={{ color: "var(--fg-muted)" }}>From a qualified engineer, not a bot.</p>
            </div>

            <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }} />

            {/* Account lead */}
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop"
                alt="Omar Farhan"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#0BBDF4]/20 shadow-lg"
              />
              <div>
                <p className="font-bold text-lg" style={{ color: "var(--fg)" }}>Omar Farhan</p>
                <p className="text-sm font-medium" style={{ color: "var(--fg-muted)" }}>Head of Client Solutions</p>
              </div>
            </div>

            <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }} />

            {/* Client quotes */}
            <div className="space-y-8">
              {[
                {
                  quote: "First agency that actually read our brief before the first call.",
                  author: "CEO, Fintech Startup",
                },
                {
                  quote: "They told us what we needed, not just what we asked for.",
                  author: "CTO, SaaS Company",
                },
              ].map((q, i) => (
                <div key={i} className="border-l-4 pl-5 transition-colors duration-300 hover:border-[#0BBDF4]" style={{ borderColor: "var(--border-hover)" }}>
                  <p className="text-base italic mb-3 font-medium leading-relaxed" style={{ color: "var(--fg)" }}>"{q.quote}"</p>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--fg-subtle)" }}>— {q.author}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </aside>

      </div>
    </div>
  );
}
