"use client";

import { useState } from "react";
import { Section, SectionHeading, GlowCard, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";
import Link from "next/link";
import {
  Code,
  ViewGrid,
  SmartphoneDevice,
  Server,
  Brain,
  ShieldCheck,
  Group,
  ArrowRight,
} from "iconoir-react";

const iconMap: Record<string, React.ReactNode> = {
  "product-design": <ViewGrid className="w-6 h-6" />,
  "web-development": <Code className="w-6 h-6" />,
  "mobile-development": <SmartphoneDevice className="w-6 h-6" />,
  "cloud-devops": <Server className="w-6 h-6" />,
  "ai-data": <Brain className="w-6 h-6" />,
  "quality-engineering": <ShieldCheck className="w-6 h-6" />,
  "dedicated-teams": <Group className="w-6 h-6" />,
};

export default function ServicesIndex() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredServices =
    activeFilter === "all"
      ? SERVICES
      : SERVICES.filter(
          (s) =>
            s.slug.includes(activeFilter) ||
            s.techBadges.some((b) => b.toLowerCase().includes(activeFilter))
        );

  return (
    <>

      <main className="flex-1 flex flex-col pt-16">
        <Section className="pb-12">
          <SectionHeading
            eyebrow="Our Offerings"
            title="Expertise Crafted for Dynamic Enterprise Needs"
            subtitle="We design, build, test, and deploy high-performance applications designed to scale."
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-12">
            {[
              { id: "all", label: "All Services" },
              { id: "design", label: "Design" },
              { id: "development", label: "Development" },
              { id: "cloud", label: "Cloud & DevOps" },
              { id: "ai", label: "AI & ML" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                  activeFilter === filter.id
                    ? "bg-[#0BBDF4] text-black border-[#0BBDF4] font-semibold"
                    : "border-border text-fg-muted hover:border-border-hover hover:text-fg"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Grid of 7 Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <GlowCard key={service.slug} className="p-8 flex flex-col justify-between h-full min-h-[320px]">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center mb-6">
                    {iconMap[service.slug] || <Code className="w-6 h-6" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-fg-muted text-sm leading-relaxed mb-6">
                    {service.oneLineDescription}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.techBadges.slice(0, 3).map((badge) => (
                      <Badge key={badge} variant="neutral">
                        {badge}
                      </Badge>
                    ))}
                    {service.techBadges.length > 3 && (
                      <Badge variant="blue">+{service.techBadges.length - 3}</Badge>
                    )}
                  </div>
                  <Link href={`/services/${service.slug}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0BBDF4] hover:text-[#4DD4FA] transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </GlowCard>
            ))}
          </div>
        </Section>

        {/* CTA Band */}
        <Section className="border-t border-border bg-bg-subtle/50 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure which service you need?</h2>
          <p className="text-fg-muted mb-8 max-w-xl mx-auto">
            Get in touch with our solutions architects to design a bespoke delivery team for your requirements.
          </p>
          <Link href="/contact" className="inline-block">
            <Button size="lg" className="px-8">
              Talk to our team
            </Button>
          </Link>
        </Section>
      </main>
    </>
  );
}
