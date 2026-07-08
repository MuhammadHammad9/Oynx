import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Badge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { CAREERS } from "@/lib/data";
import { Check, NavArrowRight, ArrowLeft } from "iconoir-react";
import { ScrollCards } from "@/components/ui/scroll-cards";

export function generateStaticParams() {
  return CAREERS.map((role) => ({
    slug: role.slug,
  }));
}

interface RoleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RoleDetailPage({ params }: RoleDetailPageProps) {
  const { slug } = await params;
  const role = CAREERS.find((r) => r.slug === slug);

  if (!role) {
    notFound();
  }

  return (
    <>

      <main className="flex-1 flex flex-col pt-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 w-full pt-8 flex items-center gap-2 text-sm transition-colors" style={{ color: "var(--fg-muted)" }}>
          <Link href="/" className="hover:opacity-70 transition-opacity" style={{ color: "var(--fg)" }}>Home</Link>
          <NavArrowRight className="w-4 h-4" />
          <Link href="/careers" className="hover:opacity-70 transition-opacity" style={{ color: "var(--fg)" }}>Careers</Link>
          <NavArrowRight className="w-4 h-4" />
          <span className="text-[#0BBDF4] font-medium">{role.title}</span>
        </div>

        {/* Hero */}
        <Section className="pb-12">
          <div className="max-w-4xl">
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-[#0BBDF4] hover:text-[#4DD4FA] mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>
            
            <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-tight leading-tight mb-6">
              {role.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="blue">{role.department}</Badge>
              <Badge variant="neutral">{role.location}</Badge>
            </div>
          </div>
        </Section>

        {/* Hero Image / Vibe */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-12">
          <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=800&fit=crop&q=80" 
              alt="Team collaborating" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Detail Content Layout */}
        <Section className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg-card)" } as React.CSSProperties}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left 2 Columns: Description & Requirements */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>About the Role</h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                  {role.about}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>What You'll Work On</h2>
                <div className="hidden md:block">
                  <ScrollCards 
                    items={role.workOn.map((item, index) => ({
                      title: `Responsibility 0${index + 1}`,
                      description: item,
                      icon: <Check className="w-5 h-5" />
                    }))} 
                  />
                </div>
                {/* Fallback for smaller screens where ScrollCards might be too large */}
                <ul className="flex flex-col gap-4 md:hidden">
                  {role.workOn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">What We're Looking For</h2>
                <ul className="flex flex-col gap-4">
                  {role.lookingFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Stack & Sticky Apply Panel */}
            <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-6">
              <div className="border rounded-2xl p-8" style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: "var(--fg)" }}>Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {role.techStack.map((tech) => (
                    <Badge key={tech} variant="neutral">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full justify-center">
                  Apply for this role
                </Button>
              </div>

              <div className="border rounded-2xl p-6 text-xs space-y-2" style={{ borderColor: "var(--border)", background: "var(--section-alt)", color: "var(--fg-muted)" }}>
                <p><strong style={{ color: "var(--fg)" }}>Note:</strong> We are a remote-first distributed organization.</p>
                <p>Applications are reviewed on a rolling basis. Onyx is an equal opportunity employer.</p>
              </div>
              
              {/* Informational Image block in sidebar */}
              <div className="rounded-2xl overflow-hidden aspect-square border" style={{ borderColor: "var(--border)" }}>
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=600&fit=crop&q=80" 
                  alt="Office life" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </Section>
      </main>
    </>
  );
}
