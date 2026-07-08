import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";
import { Check, ArrowRight, NavArrowRight } from "iconoir-react";
import { ServiceProcess } from "@/components/ui/ServiceProcess";

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <main className="flex-1 flex flex-col pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 w-full pt-8 flex items-center gap-2 text-sm" style={{ color: "var(--fg-subtle)" }}>
          <Link href="/" className="hover:text-[var(--fg)] transition-colors">Home</Link>
          <NavArrowRight className="w-4 h-4" />
          <Link href="/services" className="hover:text-[var(--fg)] transition-colors">Services</Link>
          <NavArrowRight className="w-4 h-4" />
          <span className="text-[#0BBDF4] font-medium">{service.name}</span>
        </div>

        {/* Hero */}
        <Section className="pb-12">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-tight leading-tight mb-6" style={{ color: "var(--fg)" }}>
              {service.name}
            </h1>
            <p className="text-xl md:text-2xl text-[#0BBDF4] font-semibold mb-8">
              {service.outcomeSubhead}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.techBadges.map((badge) => (
                <Badge key={badge} variant="blue">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </Section>

        {/* Core Layout Grid */}
        <Section className="border-t border-[var(--border)]" style={{ backgroundColor: "var(--section-alt)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left 2 Columns: Outcomes & Technical Disclosure */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>Business Outcomes</h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                  {service.businessSummary}
                </p>
              </div>

              {/* Two-Speed Content Block (Collapsible Disclosure) */}
              <div className="border border-[var(--border)] rounded-2xl overflow-hidden transition-colors" style={{ backgroundColor: "var(--bg-card)" }}>
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer select-none font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ color: "var(--fg)" }}>
                    <span>Technical Approach & Standards</span>
                    <span className="text-[#0BBDF4] group-open:rotate-180 transition-transform duration-200">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 border-t border-[var(--border)] text-sm leading-relaxed space-y-4" style={{ backgroundColor: "var(--bg-subtle)", color: "var(--fg-muted)" }}>
                    <p>{service.technicalApproach}</p>
                    <p>
                      All solutions undergo strict automated static analysis, security validation checks, and edge network optimization configurations prior to packaging.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            {/* Right Column: Checklist */}
            <div className="border border-[var(--border)] rounded-2xl p-8" style={{ backgroundColor: "var(--bg-card)" }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: "var(--fg)" }}>What's Included</h3>
              <ul className="flex flex-col gap-4">
                {service.whatsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Section>

        {/* Key Benefits */}
        {service.keyBenefits && service.keyBenefits.length > 0 && (
          <Section className="border-t border-[var(--border)]">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="blue" className="mb-4">Why It Matters</Badge>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--fg)" }}>Key Benefits</h2>
              <p style={{ color: "var(--fg-muted)" }}>Measurable outcomes and advantages of our approach.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.keyBenefits.map((benefit, i) => (
                <div key={i} className="border border-[var(--border)] rounded-2xl p-6 transition-colors hover:border-[var(--border-hover)]" style={{ backgroundColor: "var(--bg-card)" }}>
                  <div className="text-4xl font-black text-[#0BBDF4] mb-4">{benefit.metric}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>{benefit.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Delivery Approaches */}
        {service.deliveryApproaches && service.deliveryApproaches.length > 0 && (
          <Section className="border-t border-[var(--border)]" style={{ backgroundColor: "var(--section-alt)" }}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="blue" className="mb-4">Our Methodology</Badge>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--fg)" }}>How We Deliver {service.name}</h2>
              <p style={{ color: "var(--fg-muted)" }}>A structured, predictable, and transparent approach to execution.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.deliveryApproaches.map((approach, i) => (
                <div key={i} className="flex gap-6 items-start border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--border-hover)] transition-colors" style={{ backgroundColor: "var(--bg-card)" }}>
                  <div className="text-5xl font-black text-[#0BBDF4]/20 leading-none select-none">
                    {approach.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "var(--fg)" }}>{approach.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>{approach.description}</p>
                    {approach.tags && (
                      <div className="flex flex-wrap gap-2">
                        {approach.tags.map(tag => (
                          <span key={tag} className="text-xs font-medium px-2 py-1 rounded-md" style={{ backgroundColor: "var(--bg-subtle)", color: "var(--fg-subtle)", border: "1px solid var(--border)" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Process Section */}
        {service.processSteps && service.processSteps.length > 0 && (
          <Section className="border-t border-[var(--border)]">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="blue" className="mb-4">Process Visualized</Badge>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--fg)" }}>The Execution Lifecycle</h2>
              <p style={{ color: "var(--fg-muted)" }}>A standardized, transparent approach that eliminates guesswork and ensures consistent quality.</p>
            </div>
            <ServiceProcess steps={service.processSteps} />
          </Section>
        )}

        {/* Engagement Models */}
        <Section className="border-t border-[var(--border)]" style={{ backgroundColor: "var(--section-alt)" }}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--fg)" }}>Flexible Engagement Models</h2>
            <p style={{ color: "var(--fg-muted)" }}>Choose the delivery approach that fits your operational roadmap.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--border)] rounded-2xl p-8 hover:border-[#0BBDF4]/40 transition-colors" style={{ backgroundColor: "var(--bg-card)" }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>Fixed Scope</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                Perfect for well-defined deliverables and MVPs. We deliver to a specific timeline and budget.
              </p>
              <Badge variant="neutral">Milestone-based</Badge>
            </div>
            <div className="border border-[var(--border)] rounded-2xl p-8 hover:border-[#0BBDF4]/40 transition-colors" style={{ backgroundColor: "var(--bg-card)" }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>Dedicated Team</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                A fully integrated sprint squad focusing entirely on your long-term product roadmap.
              </p>
              <Badge variant="blue">Highly Recommended</Badge>
            </div>
            <div className="border border-[var(--border)] rounded-2xl p-8 hover:border-[#0BBDF4]/40 transition-colors" style={{ backgroundColor: "var(--bg-card)" }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>Staff Augmentation</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                Scale up your speed by embedding senior backend or frontend engineering experts.
              </p>
              <Badge variant="neutral">Hourly / Monthly</Badge>
            </div>
          </div>
        </Section>

        {/* Related Services */}
        <Section className="border-t border-[var(--border)]">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--fg)" }}>Explore Other Services</h2>
            <p style={{ color: "var(--fg-muted)" }}>Cross-domain excellence to cover all aspects of your product stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rs) => (
              <Link key={rs.slug} href={`/services/${rs.slug}`} className="block group border border-[var(--border)] rounded-xl p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-all" style={{ backgroundColor: "var(--bg-card)" }}>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#0BBDF4] transition-colors" style={{ color: "var(--fg)" }}>{rs.name}</h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--fg-subtle)" }}>{rs.oneLineDescription}</p>
                <span className="text-xs font-semibold text-[#0BBDF4] inline-flex items-center gap-1.5">
                  View Service
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* CTA Band */}
        <Section className="border-t border-[var(--border)] text-center py-20" style={{ backgroundColor: "var(--section-alt)" }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--fg)" }}>Start Building with Onyx</h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "var(--fg-muted)" }}>
            Ready to design or scale your project? Let's discuss your roadmap and timeline.
          </p>
          <Button size="lg" className="px-8">
            Get in touch
          </Button>
        </Section>
      </main>
    </>
  );
}
