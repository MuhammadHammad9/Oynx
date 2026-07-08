"use client";

import { useState } from "react";
import { Section, SectionHeading, GlowCard, Badge } from "@/components/ui/primitives";
import Link from "next/link";
import { ArrowRight, NavArrowRight, NavArrowLeft } from "iconoir-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  service: string;
  metric: string;
  metricLabel: string;
  title: string;
  summary: string;
  image: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "fintech-onboarding",
    client: "Fintech Startup",
    industry: "Fintech",
    service: "Product Design",
    metric: "3× faster",
    metricLabel: "User Onboarding Flow Duration",
    title: "Re-engineering onboarding flow for a high-growth fintech platform",
    summary: "By rewriting the core onboarding wizard, removing redundant authentication prompts, and integrating biometric API checks, we improved customer success rates from 34% to 89% in under 90 days.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "uae-retail-rerelease",
    client: "UAE Retail Group",
    industry: "Retail & E-commerce",
    service: "Mobile Development",
    metric: "47% lift",
    metricLabel: "Repeat Purchase Rate Boost",
    title: "Revamping regional mobile apps for a multi-billion dollar group",
    summary: "Built with React Native and Expo EAS, we delivered native mobile applications supporting offline-first cart state, local synchronization, and custom push-notification segmentation triggers.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "logistics-saas-infra",
    client: "Logistics SaaS Company",
    industry: "Logistics",
    service: "Cloud & DevOps",
    metric: "99.97%",
    metricLabel: "Uptime and SLA Delivered",
    title: "Scaling cloud infrastructure for mission-critical shipment trackers",
    summary: "Migrated a legacy monolith to AWS ECS Fargate, deployed infrastructure-as-code using Terraform, and built automated canary deployment hooks in GitHub Actions for zero-downtime releases.",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "healthcare-telemedicine",
    client: "Nova Care Systems",
    industry: "Healthcare",
    service: "Web Development",
    metric: "140ms",
    metricLabel: "Telehealth Video Connection Delay",
    title: "Building a latency-critical video consultation platform",
    summary: "Developed WebRTC custom endpoints combined with Next.js App Router server actions. Enforced strict HIPAA compliance, multi-tenant isolation, and encrypted patient file uploads.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "ai-financial-reconciliation",
    client: "Apex Financial",
    industry: "Fintech",
    service: "AI & Data",
    metric: "18k hrs",
    metricLabel: "Manual Audit Effort Saved Annually",
    title: "Deploying automated financial auditing using machine learning models",
    summary: "Built high-throughput ETL data pipelines using PyTorch and pgvector databases. Enabled semantic audit cross-referencing that flags outliers with a low false-positive rate.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "govtech-dashboard",
    client: "Federal Services Authority",
    industry: "Government & Public Sector",
    service: "Web Development",
    metric: "2.4M",
    metricLabel: "Citizens Served Through Platform",
    title: "Building a unified citizen services portal for a federal authority",
    summary: "Designed and launched a centralized government portal handling visa renewals, permit applications, and civil records. Arabic and English bilingual with WCAG 2.1 AA compliance and PKI signing.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "edtech-adaptive-learning",
    client: "EduPath Academy",
    industry: "EdTech",
    service: "AI & Data",
    metric: "38%",
    metricLabel: "Improvement in Student Retention",
    title: "Deploying adaptive learning algorithms for an online education platform",
    summary: "Integrated reinforcement learning-based lesson sequencing into an existing LMS. Personalized content pathways for 500K+ learners across STEM and language modules, reducing course drop rates significantly.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "real-estate-proptech",
    client: "Gulf Properties Group",
    industry: "Real Estate & PropTech",
    service: "Product Design",
    metric: "4.1×",
    metricLabel: "Increase in Lead-to-Viewing Conversions",
    title: "Redesigning a PropTech platform to accelerate real estate transactions",
    summary: "Introduced AI-powered property recommendations, 3D virtual tour integrations, and a streamlined offer management flow that dramatically improved agent productivity and buyer conversion rates.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "supply-chain-visibility",
    client: "GlobalTrade Systems",
    industry: "Logistics",
    service: "Cloud & DevOps",
    metric: "91%",
    metricLabel: "Shipment Visibility Accuracy",
    title: "End-to-end supply chain visibility platform built on event-driven architecture",
    summary: "Replaced a fragmented, email-based tracking system with a real-time event-driven pipeline using Kafka, Postgres CDC, and a live dashboard serving 300+ enterprise clients with live ETAs and anomaly alerts.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "insurtech-claims",
    client: "Axis Shield Insurance",
    industry: "Insurance & InsurTech",
    service: "AI & Data",
    metric: "72%",
    metricLabel: "Reduction in Claims Processing Time",
    title: "Automating insurance claims triage using computer vision and NLP",
    summary: "Built a multi-modal AI pipeline that classifies incoming claims by damage type, extracts structured data from uploaded documents, and routes to the correct underwriter — cutting manual triage from days to minutes.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
  },
];

const ITEMS_PER_PAGE = 5;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function WorkIndex() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedService, setSelectedService] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const industries = ["All", "Fintech", "Retail & E-commerce", "Logistics", "Healthcare", "Government & Public Sector", "EdTech", "Real Estate & PropTech", "Insurance & InsurTech"];
  const services = ["All", "Product Design", "Web Development", "Mobile Development", "Cloud & DevOps", "AI & Data"];

  const filteredStudies = CASE_STUDIES.filter((cs) => {
    const matchInd = selectedIndustry === "All" || cs.industry === selectedIndustry;
    const matchServ = selectedService === "All" || cs.service === selectedService;
    return matchInd && matchServ;
  });

  const totalPages = Math.ceil(filteredStudies.length / ITEMS_PER_PAGE);
  const paginatedStudies = filteredStudies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (type: "industry" | "service", value: string) => {
    if (type === "industry") setSelectedIndustry(value);
    else setSelectedService(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <main className="flex-1 flex flex-col pt-16">
        <Section className="pb-8">
          <SectionHeading
            eyebrow="Our Work"
            title="Results that speak louder than pitches"
            subtitle="Explore how we partner with scaling enterprises to deliver secure, performant digital systems."
          />

          {/* Filters */}
          <div
            className="flex flex-col gap-6 mb-12 py-8"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
            {/* Industry filter */}
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.2em] mb-4 font-semibold"
                style={{ color: "var(--fg-subtle)" }}
              >
                Filter by Industry
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => handleFilterChange("industry", ind)}
                    className="px-4 py-2 text-xs rounded-full border transition-all duration-300"
                    style={
                      selectedIndustry === ind
                        ? {
                            background: "#0BBDF4",
                            color: "#000",
                            borderColor: "#0BBDF4",
                            fontWeight: 700,
                            boxShadow: "0 0 15px rgba(11,189,244,0.3)",
                          }
                        : {
                            background: "var(--bg-card)",
                            color: "var(--fg-muted)",
                            borderColor: "var(--border)",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (selectedIndustry !== ind) {
                        e.currentTarget.style.borderColor = "var(--border-hover)";
                        e.currentTarget.style.color = "var(--fg)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedIndustry !== ind) {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--fg-muted)";
                      }
                    }}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Service filter */}
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.2em] mb-4 font-semibold"
                style={{ color: "var(--fg-subtle)" }}
              >
                Filter by Capability
              </p>
              <div className="flex flex-wrap gap-2">
                {services.map((srv) => (
                  <button
                    key={srv}
                    onClick={() => handleFilterChange("service", srv)}
                    className="px-4 py-2 text-xs rounded-full border transition-all duration-300"
                    style={
                      selectedService === srv
                        ? {
                            background: "#0BBDF4",
                            color: "#000",
                            borderColor: "#0BBDF4",
                            fontWeight: 700,
                            boxShadow: "0 0 15px rgba(11,189,244,0.3)",
                          }
                        : {
                            background: "var(--bg-card)",
                            color: "var(--fg-muted)",
                            borderColor: "var(--border)",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (selectedService !== srv) {
                        e.currentTarget.style.borderColor = "var(--border-hover)";
                        e.currentTarget.style.color = "var(--fg)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedService !== srv) {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--fg-muted)";
                      }
                    }}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <p className="text-xs" style={{ color: "var(--fg-subtle)" }}>
              Showing{" "}
              <span style={{ color: "#0BBDF4", fontWeight: 700 }}>
                {filteredStudies.length}
              </span>{" "}
              case {filteredStudies.length === 1 ? "study" : "studies"}
              {selectedIndustry !== "All" || selectedService !== "All"
                ? " matching your filters"
                : " across all industries"}
            </p>
          </div>

          {/* Grid of Case Studies */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedIndustry}-${selectedService}-${currentPage}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {paginatedStudies.map((cs) => (
                <motion.div key={cs.slug} variants={fadeUp}>
                  <Link href={`/work/${cs.slug}`} className="block h-full group">
                    <GlowCard className="p-0 overflow-hidden flex flex-col justify-between h-full min-h-[460px] transition-all duration-500">
                      {/* Image Header */}
                      <div
                        className="w-full h-56 md:h-64 overflow-hidden relative"
                        style={{ borderBottom: "1px solid var(--border)" }}
                      >
                        <img
                          src={cs.image}
                          alt={cs.client}
                          className="w-full h-full object-cover grayscale-[30%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        {/* Gradient overlay — uses CSS var for bg */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(to top, var(--bg) 0%, transparent 60%)",
                            opacity: 0.85,
                          }}
                        />

                        <div className="absolute bottom-4 left-6 flex items-center gap-2">
                          <Badge variant="blue" className="backdrop-blur-md">
                            {cs.industry}
                          </Badge>
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-md"
                            style={{
                              background: "var(--bg-card)",
                              color: "var(--fg)",
                              borderColor: "var(--border)",
                            }}
                          >
                            {cs.service}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        {/* Large blue hero metric */}
                        <div className="mb-6">
                          <span className="text-4xl md:text-5xl font-black text-[#0BBDF4] block tracking-tight group-hover:text-[#4DD4FA] transition-colors duration-300">
                            {cs.metric}
                          </span>
                          <span
                            className="text-[10px] uppercase tracking-widest block mt-2 font-semibold"
                            style={{ color: "var(--fg-subtle)" }}
                          >
                            {cs.metricLabel}
                          </span>
                        </div>

                        <h3
                          className="text-xl md:text-2xl font-bold mb-3 leading-snug group-hover:text-[#0BBDF4] transition-colors duration-300"
                          style={{ color: "var(--fg)" }}
                        >
                          {cs.title}
                        </h3>
                        <p
                          className="text-sm md:text-base leading-relaxed mb-8 flex-1"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          {cs.summary}
                        </p>

                        <div
                          className="pt-5 flex items-center justify-between mt-auto"
                          style={{ borderTop: "1px solid var(--border)" }}
                        >
                          <span
                            className="text-[11px] font-semibold uppercase tracking-wider"
                            style={{ color: "var(--fg-subtle)" }}
                          >
                            {cs.client}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0BBDF4] group-hover:text-[#4DD4FA] transition-colors">
                            Explore Study
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                </motion.div>
              ))}

              {filteredStudies.length === 0 && (
                <div className="col-span-2 text-center py-24">
                  <p className="mb-3 text-lg font-medium" style={{ color: "var(--fg-muted)" }}>
                    No projects match the selected criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedIndustry("All");
                      setSelectedService("All");
                      setCurrentPage(1);
                    }}
                    className="text-sm font-semibold text-[#0BBDF4] hover:text-[#4DD4FA] transition-colors uppercase tracking-widest"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-sm" style={{ color: "var(--fg-subtle)" }}>
                Page <span style={{ color: "var(--fg)", fontWeight: 600 }}>{currentPage}</span> of{" "}
                <span style={{ color: "var(--fg)", fontWeight: 600 }}>{totalPages}</span>
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--fg)",
                    background: "var(--bg-card)",
                  }}
                >
                  <NavArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                {/* Page number dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 rounded-full text-xs font-bold transition-all duration-200"
                      style={
                        page === currentPage
                          ? { background: "#0BBDF4", color: "#000" }
                          : {
                              background: "var(--bg-card)",
                              color: "var(--fg-muted)",
                              border: "1px solid var(--border)",
                            }
                      }
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--fg)",
                    background: "var(--bg-card)",
                  }}
                >
                  Next
                  <NavArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}
