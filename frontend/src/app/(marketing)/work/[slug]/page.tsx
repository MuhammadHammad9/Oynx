import { Metadata } from "next";
import { CaseStudyClient } from "./client-page";
import { notFound } from "next/navigation";

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
  seoDescription: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    image: string;
  };
}

const DETAIL_DATA: Record<string, CaseStudyData> = {
  "fintech-onboarding": {
    client: "Fintech Startup",
    industry: "Fintech",
    service: "Product Design",
    metric: "3× faster",
    metricLabel: "User Onboarding Duration",
    title: "Re-engineering onboarding flow for a high-growth fintech platform",
    challenge:
      "The client suffered from high drop-off rates (66%) during their customer onboarding process. Multiple validation forms, unexpected authentication challenges, and poor validation feedback left prospective users frustrated and abandoning the product before ever experiencing its value.",
    approach:
      "We redesigned the onboarding wizard into a single, cohesive, mobile-first stepper. By introducing micro-feedback messages, pre-validating input fields on focus lost, and integrating biometric passkeys, we reduced average onboarding completion time from 9 minutes to under 3 minutes. Every step was A/B tested and validated with real user session recordings.",
    stats: [
      { number: "89%", label: "Conversion Success Rate" },
      { number: "3 min", label: "Average Completion Time" },
      { number: "4.8/5", label: "User Satisfaction Rating" },
    ],
    tech: ["Figma", "Design Tokens", "React Native", "Zod", "WebAuthn API"],
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "Discover how we re-engineered the onboarding flow for a fintech startup, improving customer success rates to 89% using React Native and biometric passkeys.",
    testimonial: {
      quote: "The redesigned onboarding flow completely changed our growth trajectory. Drop-offs vanished practically overnight, and the user feedback has been stellar.",
      author: "Sarah Jenkins",
      role: "VP of Product",
      image: "/assets/team/syed_raza_ali_gillani.png"
    }
  },
  "uae-retail-rerelease": {
    client: "UAE Retail Group",
    industry: "Retail & E-commerce",
    service: "Mobile Development",
    metric: "47% lift",
    metricLabel: "Repeat Purchase Rate",
    title: "Revamping regional mobile apps for a multi-billion dollar group",
    challenge:
      "The client's legacy retail app was slow, lacked offline functionality, and struggled to sync checkout details correctly, causing a direct drop in user retention and cart values. Their development cycles were long, testing coverage was minimal, and each release introduced regressions.",
    approach:
      "We completely rebuilt the mobile application using React Native and Expo. We introduced an offline-first state machine supporting local SQLite caching, fast delta sync cycles, and tailored push-notification automation based on item category interactions. CI/CD via Expo EAS Build ensured consistent, fast releases across iOS and Android.",
    stats: [
      { number: "47%", label: "Lift in Repeat Purchases" },
      { number: "60%", label: "Increase in Cart Completion" },
      { number: "0ms", label: "Perceived Offline Latency" },
    ],
    tech: ["React Native", "Expo EAS", "SQLite", "Zustand", "Cloudflare Workers"],
    heroImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "A case study on revamping a legacy retail app for a UAE Retail Group using React Native, achieving a 47% lift in repeat purchases.",
    testimonial: {
      quote: "The new app architecture is flawlessly fast. Our customers love the seamless offline experience, and our engineering team loves how easy it is to maintain.",
      author: "Mohammed Al-Fayed",
      role: "CTO, UAE Retail Group",
      image: "/assets/team/muhammad_fahad.png"
    }
  },
  "logistics-saas-infra": {
    client: "Logistics SaaS Company",
    industry: "Logistics",
    service: "Cloud & DevOps",
    metric: "99.97%",
    metricLabel: "Uptime and SLA Delivered",
    title: "Scaling cloud infrastructure for mission-critical shipment trackers",
    challenge:
      "The customer's tracking endpoints suffered from server crashes during regional peak delivery seasons, costing thousands in SLA violation fines. Manual deployment processes meant hotfixes required hours of downtime and senior engineer intervention.",
    approach:
      "We transformed their monolithic deployment into auto-scaling microservices on AWS ECS. Built modular Terraform configurations and canary deployments that automatically rollback if latency spikes above defined thresholds. GitHub Actions pipelines were implemented with full test gates and Slack alerting.",
    stats: [
      { number: "99.97%", label: "SLA Uptime Secured" },
      { number: "45%", label: "Cloud Spend Reduction" },
      { number: "0", label: "Manual Deploy Interventions" },
    ],
    tech: ["AWS Fargate", "Terraform", "Docker", "GitHub Actions", "Redis Cluster"],
    heroImage: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "Explore our cloud infrastructure scaling case study for a Logistics SaaS. Migrating to AWS ECS secured 99.97% uptime and reduced cloud spend by 45%.",
    testimonial: {
      quote: "Moving to an automated, terraform-managed infrastructure removed all of our deployment anxiety. Peak season scaling is now a non-issue.",
      author: "David Chen",
      role: "Head of Infrastructure",
      image: "/assets/team/samiullah_khan.png"
    }
  },
  "healthcare-telemedicine": {
    client: "Nova Care Systems",
    industry: "Healthcare",
    service: "Web Development",
    metric: "140ms",
    metricLabel: "Telehealth Video Connection Delay",
    title: "Building a latency-critical video consultation platform",
    challenge:
      "Healthcare providers needed a HIPAA-compliant video consultation platform with sub-200ms connection times and encrypted patient data handling across multiple tenants. The existing solution used a third-party tool that couldn't meet custom compliance requirements or deliver adequate performance.",
    approach:
      "Developed WebRTC custom signaling endpoints combined with Next.js App Router server actions. Enforced strict HIPAA compliance, multi-tenant isolation, and encrypted patient file uploads via signed URLs on Cloudflare R2. All video sessions are ephemeral with zero server-side recording unless explicitly opted in.",
    stats: [
      { number: "140ms", label: "Avg Connection Delay" },
      { number: "99.9%", label: "Session Reliability" },
      { number: "100%", label: "HIPAA Compliance Score" },
    ],
    tech: ["Next.js", "WebRTC", "Cloudflare R2", "PostgreSQL", "Drizzle ORM"],
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869043e560?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "Learn how we built a secure, HIPAA-compliant telehealth video consultation platform with sub-140ms latency using Next.js and WebRTC.",
    testimonial: {
      quote: "The low latency is incredible. Our doctors no longer complain about lag, and the encryption guarantees put our compliance officers at ease.",
      author: "Dr. Emily Rostova",
      role: "Chief Medical Officer",
      image: "/assets/team/hammad_ellahi.png"
    }
  },
  "ai-financial-reconciliation": {
    client: "Apex Financial",
    industry: "Fintech",
    service: "AI & Data",
    metric: "18k hrs",
    metricLabel: "Manual Audit Effort Saved Annually",
    title: "Deploying automated financial auditing using machine learning models",
    challenge:
      "Finance teams were spending thousands of manual hours per quarter cross-referencing transaction records for audit compliance. Error rates from manual checks were increasing as volumes scaled, creating growing regulatory risk.",
    approach:
      "Built high-throughput ETL data pipelines using PyTorch and pgvector databases. Enabled semantic audit cross-referencing that flags outliers with a low false-positive rate. A reviewer dashboard allows finance leads to inspect flagged transactions with full reasoning traces from the model.",
    stats: [
      { number: "18k hrs", label: "Manual Effort Saved" },
      { number: "0.3%", label: "False Positive Rate" },
      { number: "6×", label: "Audit Speed Increase" },
    ],
    tech: ["Python", "PyTorch", "pgvector", "Inngest", "PostgreSQL"],
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "Case study detailing the deployment of PyTorch-based ML models and pgvector databases to automate financial auditing for Apex Financial.",
    testimonial: {
      quote: "This AI solution essentially acts as a tireless, ultra-accurate analyst on our team. It caught discrepancies we didn't even know existed.",
      author: "Marcus Vance",
      role: "VP of Data & Analytics",
      image: "/assets/team/talha_mujhaid.png"
    }
  },
  "govtech-dashboard": {
    client: "Federal Services Authority",
    industry: "Government & Public Sector",
    service: "Web Development",
    metric: "2.4M",
    metricLabel: "Citizens Served Through Platform",
    title: "Building a unified citizen services portal for a federal authority",
    challenge:
      "Citizens were navigating 14 separate government websites to complete services like visa renewals, trade licenses, and civil records updates. System fragmentation caused confusion, redundant data entry, and high call-center volumes for support.",
    approach:
      "Designed and launched a centralized citizen portal with role-based service routing, Arabic and English bilingual support, and PKI digital signing. Built on Next.js with a fully accessible (WCAG 2.1 AA) interface, integrated with internal government APIs using OAuth 2.0 and a secure API gateway on AWS.",
    stats: [
      { number: "2.4M", label: "Citizens Served" },
      { number: "14→1", label: "Portals Consolidated" },
      { number: "62%", label: "Drop in Support Calls" },
    ],
    tech: ["Next.js", "AWS API Gateway", "OAuth 2.0", "PKI Signing", "PostgreSQL"],
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "How we built a unified digital citizen services portal consolidating 14 government systems into one platform serving 2.4 million citizens.",
    testimonial: {
      quote: "The consolidation effort transformed how citizens interact with government. What took days now takes minutes, and public satisfaction scores have never been higher.",
      author: "Ahmad Al-Mansouri",
      role: "Director of Digital Transformation",
      image: "/assets/team/umair_jadoon.png"
    }
  },
  "edtech-adaptive-learning": {
    client: "EduPath Academy",
    industry: "EdTech",
    service: "AI & Data",
    metric: "38%",
    metricLabel: "Improvement in Student Retention",
    title: "Deploying adaptive learning algorithms for an online education platform",
    challenge:
      "The LMS was delivering a one-size-fits-all curriculum that failed to account for individual learner pace, knowledge gaps, or engagement patterns. Drop-off rates exceeded 55% across STEM modules within the first 3 weeks.",
    approach:
      "Integrated reinforcement learning-based lesson sequencing that continuously adapts content difficulty and pacing per learner. Built knowledge graph models representing prerequisite dependencies. Instructor dashboards expose at-risk learner signals in real time, enabling targeted intervention before drop-off occurs.",
    stats: [
      { number: "38%", label: "Retention Improvement" },
      { number: "500K+", label: "Active Learners" },
      { number: "2.1×", label: "Module Completion Rate" },
    ],
    tech: ["Python", "TensorFlow", "Neo4j", "Next.js", "Kafka"],
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "How we deployed adaptive AI learning algorithms to improve student retention by 38% across 500,000 learners on the EduPath Academy platform.",
    testimonial: {
      quote: "The adaptive engine feels like a private tutor for every student. Completion rates went from embarrassing to industry-leading within a single semester.",
      author: "Dr. Priya Ramesh",
      role: "Head of Pedagogy & Technology",
      image: "/assets/team/syed_raza_ali_gillani.png"
    }
  },
  "real-estate-proptech": {
    client: "Gulf Properties Group",
    industry: "Real Estate & PropTech",
    service: "Product Design",
    metric: "4.1×",
    metricLabel: "Lead-to-Viewing Conversion Rate",
    title: "Redesigning a PropTech platform to accelerate real estate transactions",
    challenge:
      "The existing property portal had an outdated UX with static listing pages, no virtual tour capability, and a clunky offer management flow that required agents to handle negotiations over email. Buyer drop-off between browsing and booking a viewing was 87%.",
    approach:
      "Introduced AI-powered property recommendations based on behavioral signals, integrated 3D virtual tour embedding via Matterport API, and built a structured offer management flow with real-time negotiation status tracking. Overhauled the design language with a premium aesthetic that matched the luxury property market's expectations.",
    stats: [
      { number: "4.1×", label: "Lead-to-Viewing Conversion" },
      { number: "3.2×", label: "Time on Site Increase" },
      { number: "28%", label: "Reduction in Agent Admin Time" },
    ],
    tech: ["Figma", "Next.js", "Matterport API", "Elasticsearch", "Redis"],
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "How we redesigned a Gulf PropTech platform with AI recommendations and 3D virtual tours to achieve a 4.1× increase in lead-to-viewing conversions.",
    testimonial: {
      quote: "The platform feels as premium as the properties we sell. Our agents are more productive and our buyers are converting faster than we've ever seen.",
      author: "Rania Al-Khoury",
      role: "Chief Commercial Officer",
      image: "/assets/team/hammad_ellahi.png"
    }
  },
  "supply-chain-visibility": {
    client: "GlobalTrade Systems",
    industry: "Logistics",
    service: "Cloud & DevOps",
    metric: "91%",
    metricLabel: "Shipment Visibility Accuracy",
    title: "End-to-end supply chain visibility platform on event-driven architecture",
    challenge:
      "A fragmented, email-based tracking system meant enterprise clients had no reliable real-time view of their shipments. ETAs were manually updated in spreadsheets, anomaly detection was non-existent, and carrier integration required custom middleware per partner.",
    approach:
      "Replaced the legacy system with a real-time event-driven pipeline using Apache Kafka and Postgres CDC. Built a live operations dashboard serving 300+ enterprise clients with real-time ETAs, delay probability scores, and automated anomaly alerts. Carrier integrations are now plug-and-play via a unified webhook gateway.",
    stats: [
      { number: "91%", label: "Shipment Visibility Accuracy" },
      { number: "300+", label: "Enterprise Clients" },
      { number: "40ms", label: "Average Event Processing Latency" },
    ],
    tech: ["Apache Kafka", "PostgreSQL CDC", "Next.js", "Grafana", "Kubernetes"],
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "How we built a real-time supply chain visibility platform using event-driven architecture, achieving 91% shipment accuracy for 300+ enterprise clients.",
    testimonial: {
      quote: "We went from managing shipments with spreadsheets to having a control tower with real-time visibility across every carrier and route.",
      author: "James Whitfield",
      role: "VP of Operations",
      image: "/assets/team/muhammad_fahad.png"
    }
  },
  "insurtech-claims": {
    client: "Axis Shield Insurance",
    industry: "Insurance & InsurTech",
    service: "AI & Data",
    metric: "72%",
    metricLabel: "Reduction in Claims Processing Time",
    title: "Automating insurance claims triage using computer vision and NLP",
    challenge:
      "Claims adjusters were manually reviewing thousands of uploaded documents, photos, and forms each day. Triage took 3–5 business days on average, leading to customer dissatisfaction and high operational costs. Fraud signals were often missed due to adjuster fatigue.",
    approach:
      "Built a multi-modal AI pipeline combining computer vision (for damage classification from photos) and NLP (for document extraction and intent classification). Claims are now auto-routed to the correct underwriter with pre-filled structured summaries. A fraud signal scoring model flags suspicious submissions for priority human review.",
    stats: [
      { number: "72%", label: "Reduction in Processing Time" },
      { number: "94%", label: "Triage Accuracy" },
      { number: "3.1×", label: "Adjuster Throughput Increase" },
    ],
    tech: ["Python", "PyTorch", "OpenCV", "FastAPI", "Snowflake"],
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
    contentImages: [
      "/assets/team/samiullah_khan.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    ],
    seoDescription: "How we automated insurance claims triage for Axis Shield using computer vision and NLP, achieving a 72% reduction in processing time.",
    testimonial: {
      quote: "Our adjusters now focus on complex edge cases instead of routine paperwork. The AI doesn't replace them — it makes them dramatically more effective.",
      author: "Linda Osei",
      role: "Chief Claims Officer",
      image: "/assets/team/talha_mujhaid.png"
    }
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = DETAIL_DATA[slug];

  if (!data) {
    return {
      title: "Case Study Not Found - Oynx Interactive",
    };
  }

  return {
    title: data.title,
    description: data.seoDescription,
    openGraph: {
      title: data.title,
      description: data.seoDescription,
      images: [{ url: data.heroImage }],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = DETAIL_DATA[slug];

  if (!data) {
    notFound();
  }

  return <CaseStudyClient data={data} />;
}

export function generateStaticParams() {
  return Object.keys(DETAIL_DATA).map((slug) => ({ slug }));
}
