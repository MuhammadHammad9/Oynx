export interface Service {
  slug: string;
  name: string;
  oneLineDescription: string;
  outcomeSubhead: string;
  techBadges: string[];
  whatsIncluded: string[];
  businessSummary: string;
  technicalApproach: string;
  keyBenefits?: {
    metric: string;
    title: string;
    description: string;
  }[];
  deliveryApproaches?: {
    number: string;
    title: string;
    description: string;
    tags?: string[];
  }[];
  processSteps: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
}

export interface CareerRole {
  slug: string;
  title: string;
  department: string;
  location: string;
  about: string;
  workOn: string[];
  lookingFor: string[];
  techStack: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  summary: string;
  content: string;
}

export const SERVICES: Service[] = [
  {
    slug: "product-design",
    name: "Product Design & UX",
    oneLineDescription: "Create intuitive user journeys and gorgeous, conversion-driven visual experiences.",
    outcomeSubhead: "Elevate your brand with award-winning UX/UI and user-validated designs.",
    techBadges: ["Figma", "Prototyping", "User Research", "Wireframing", "Design Systems", "Accessibility"],
    whatsIncluded: [
      "User research & persona validation",
      "Competitive analysis & heuristic review",
      "Interactive high-fidelity wireframing",
      "Comprehensive token-based design systems",
      "Clickable prototypes for stakeholder sign-off",
      "Usability testing & iterative feedback loops",
      "Developer handoff with annotated Figma specs",
      "Brand identity alignment & visual style guides",
    ],
    businessSummary:
      "We design products that users love and businesses profit from. By deeply aligning your business objectives with real user desires, we create frictionless digital experiences that boost engagement, reduce churn, and drive measurable revenue growth. Every design decision is grounded in research — not assumptions.",
    technicalApproach:
      "We build standardized design-to-code pipelines utilizing Figma design tokens and component libraries, ensuring developer-friendly handoffs with seamless integration into Tailwind CSS and any modern frontend framework. Accessibility (WCAG 2.2 AA) is baked into every component from day one, not bolted on as an afterthought.",
    keyBenefits: [
      {
        metric: "73%",
        title: "Conversion Uplift",
        description:
          "UX-optimized flows reduce friction and guide users to take action faster, directly increasing revenue-generating interactions.",
      },
      {
        metric: "60%",
        title: "Less Dev Rework",
        description:
          "Solid design systems and annotated Figma handoffs prevent costly last-minute redesigns during the engineering phase.",
      },
      {
        metric: "45%",
        title: "Higher User Satisfaction",
        description:
          "User-validated interfaces consistently score higher on NPS surveys, driving retention and organic referrals.",
      },
      {
        metric: "2×",
        title: "Faster Time-to-Market",
        description:
          "Reusable, token-based component libraries accelerate every subsequent feature sprint and new product iteration.",
      },
    ],
    deliveryApproaches: [
      {
        number: "01",
        title: "Stakeholder Discovery Workshops",
        description:
          "We run structured sessions with your key stakeholders to map business goals, user pain points, KPIs, and technical constraints — ensuring every design decision serves strategy from day one.",
        tags: ["Strategy", "Alignment", "Kickoff"],
      },
      {
        number: "02",
        title: "Competitive & Heuristic Analysis",
        description:
          "A systematic teardown of competitors' interfaces using Nielsen's 10 usability heuristics to benchmark strengths, identify critical gaps, and pinpoint clear differentiation opportunities.",
        tags: ["Research", "Benchmarking", "Heuristics"],
      },
      {
        number: "03",
        title: "User Persona Development",
        description:
          "Research-backed personas built from interviews, surveys, and behavioral analytics that ground every design decision in real user needs, motivations, and frustrations — not guesswork.",
        tags: ["User Research", "Personas", "Empathy Maps"],
      },
      {
        number: "04",
        title: "Information Architecture & Flow Mapping",
        description:
          "Before any visual work begins, we structure the navigation hierarchy and map every critical user journey end-to-end to eliminate dead ends, confusion, and drop-off points.",
        tags: ["IA", "Sitemaps", "User Flows"],
      },
      {
        number: "05",
        title: "Iterative Wireframing & Lo-Fi Prototyping",
        description:
          "Rapid low-fidelity wireframes get into stakeholder hands early, enabling quick pivots without expensive visual rework. Feedback loops are short, deliberate, and fully documented.",
        tags: ["Wireframes", "Rapid Iteration", "Stakeholder Review"],
      },
      {
        number: "06",
        title: "High-Fidelity UI & Design System Creation",
        description:
          "Pixel-perfect screens built on a scalable token-based design system in Figma — with documented components, state variations, responsive breakpoints, and spacing grids for seamless dev handoff.",
        tags: ["Figma", "Design Tokens", "Component Library"],
      },
      {
        number: "07",
        title: "Usability Testing & Iterative Validation",
        description:
          "Real user testing via moderated sessions, unmoderated remote tools, and heatmap analysis validates every assumption. Findings feed directly back into a structured refinement cycle.",
        tags: ["Usability Testing", "Hotjar", "User Interviews"],
      },
    ],
    processSteps: [
      {
        title: "Discovery & Stakeholder Alignment",
        description:
          "Deep-dive sessions to map business objectives, define success metrics, and align all stakeholders on a shared product vision before any design work begins.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      },
      {
        title: "User Research & Competitive Analysis",
        description:
          "Interviews, surveys, and behavioral data inform persona development. Competitor teardowns identify key differentiators and design opportunities.",
        imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop",
      },
      {
        title: "Information Architecture & User Flows",
        description:
          "Structuring the navigation, content hierarchy, and user flows to create intuitive, frictionless pathways through the product.",
        imageUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&h=600&fit=crop",
      },
      {
        title: "Wireframing & Lo-Fi Prototyping",
        description:
          "Rapid wireframes and clickable lo-fi prototypes validate structural decisions before any visual investment is made — keeping iterations cheap and fast.",
        imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
      },
      {
        title: "High-Fidelity UI Design & Design System",
        description:
          "Bringing the architecture to life with stunning, brand-aligned visuals and a comprehensive token-based design system for long-term scalability.",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      },
      {
        title: "Usability Testing & Developer Handoff",
        description:
          "Real-user testing validates the final designs. Annotated Figma specs and exported design tokens ensure a seamless, zero-ambiguity engineering handoff.",
        imageUrl: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    slug: "web-development",
    name: "Web Application Development",
    oneLineDescription: "High-performance, scalable web apps built with cutting-edge frameworks.",
    outcomeSubhead: "Build lightning-fast, production-ready applications engineered for scale.",
    techBadges: ["Next.js", "React", "TypeScript", "Tailwind CSS v4", "Node.js", "PostgreSQL"],
    whatsIncluded: [
      "Next.js App Router with React Server Components",
      "End-to-end TypeScript type safety",
      "Tailwind CSS v4 design system integration",
      "TanStack Query & state management architecture",
      "Drizzle ORM & PostgreSQL schema design",
      "Secure auth flows (Better Auth / Clerk)",
      "REST or tRPC API development with Zod validation",
      "CI/CD pipeline & zero-downtime deployments",
    ],
    businessSummary:
      "From complex SaaS platforms to bespoke admin portals and client-facing dashboards, we develop robust web applications engineered for security, usability, and long-term scale. Every codebase we deliver is production-hardened, fully type-safe, and built to hand off cleanly to your in-house team.",
    technicalApproach:
      "We implement strict React Server Components patterns, optimizing server-side data fetching, automatic code splitting, and Turbopack builds for near-instant developer feedback loops. Database layers use Drizzle ORM for end-to-end type safety from schema definition to UI query hooks.",
    keyBenefits: [
      {
        metric: "99.9%",
        title: "Uptime SLA",
        description:
          "Fault-tolerant Next.js deployments with automatic failover, health checks, and graceful degradation keep your app running around the clock.",
      },
      {
        metric: "3×",
        title: "Faster Load Times",
        description:
          "Edge-cached React Server Components deliver sub-300ms time-to-first-byte globally, significantly boosting Core Web Vitals and SEO rankings.",
      },
      {
        metric: "Zero",
        title: "Deployment Downtime",
        description:
          "Blue-green deployment strategies via Vercel, Railway, or AWS ECS ensure every release reaches production completely silently.",
      },
      {
        metric: "100%",
        title: "Type-Safe Codebase",
        description:
          "End-to-end TypeScript from DB schema (Drizzle) to UI components eliminates an entire class of runtime errors before they can affect users.",
      },
    ],
    deliveryApproaches: [
      {
        number: "01",
        title: "Technical Architecture & Stack Selection",
        description:
          "We select the optimal database, ORM, framework, and hosting stack based on your scale requirements, team expertise, and long-term maintainability — with a documented Architecture Decision Record.",
        tags: ["Architecture", "Next.js", "ADR"],
      },
      {
        number: "02",
        title: "Database Schema Design & ORM Migrations",
        description:
          "Carefully crafted relational schemas using Drizzle ORM with version-controlled migrations, proper indexing strategies, and multi-tenant data isolation where required by your product.",
        tags: ["Drizzle ORM", "Schema Design", "PostgreSQL"],
      },
      {
        number: "03",
        title: "Authentication & Authorization Systems",
        description:
          "Implementing secure, battle-tested auth flows using Better Auth or Clerk, complete with role-based access control (RBAC) matrices, session management, and optional MFA support.",
        tags: ["Better Auth", "RBAC", "MFA"],
      },
      {
        number: "04",
        title: "API Design & Backend Development",
        description:
          "RESTful or tRPC endpoint development following OpenAPI specifications, with automatic input validation via Zod, rate limiting, audit logging, and comprehensive structured error handling.",
        tags: ["REST", "tRPC", "Zod", "Rate Limiting"],
      },
      {
        number: "05",
        title: "Frontend Component Architecture",
        description:
          "Scalable React component trees using Server Components for data-fetching, TanStack Query for client state, and Tailwind CSS v4 for a consistent, maintainable design language.",
        tags: ["RSC", "TanStack Query", "Tailwind v4"],
      },
      {
        number: "06",
        title: "Performance Optimization & Caching Strategy",
        description:
          "Strategic implementation of ISR, CDN edge caching, database query optimization, and lazy loading to deliver consistently fast experiences at any traffic volume or geography.",
        tags: ["ISR", "CDN Edge", "Core Web Vitals"],
      },
      {
        number: "07",
        title: "Security Hardening & Compliance",
        description:
          "Automated static analysis via ESLint security plugins, dependency auditing with Snyk, secret scanning, strict CSP headers, and SQL injection protection via parameterized queries.",
        tags: ["OWASP", "CSP Headers", "Snyk"],
      },
      {
        number: "08",
        title: "CI/CD Pipeline & Zero-Downtime Deployments",
        description:
          "GitHub Actions workflows running type-checks, unit tests, and E2E browser tests before every merge. Blue-green deployments guarantee zero production interruptions on every release.",
        tags: ["GitHub Actions", "Blue-Green Deploy", "Playwright"],
      },
    ],
    processSteps: [
      {
        title: "Architecture & Stack Decision",
        description:
          "Choosing the right database, ORM, framework, and hosting model tailored to your scale, budget, and team constraints — documented in a clear Architecture Decision Record.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      },
      {
        title: "Database & API Contract Design",
        description:
          "Schema design, ORM migration setup, and API contract definition — establishing a solid, type-safe data foundation before any UI development begins.",
        imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
      },
      {
        title: "Authentication & Security Foundations",
        description:
          "Implementing bulletproof auth flows, RBAC, session management, and all foundational security hardening from the very start of the project.",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      },
      {
        title: "Agile Feature Development",
        description:
          "Iterative sprints delivering functional, tested features with regular demos and structured feedback — incorporating changes rapidly into the next cycle.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      },
      {
        title: "Performance Optimization",
        description:
          "Profiling, caching, code-splitting, and CDN configuration to ensure the application exceeds Core Web Vitals thresholds across all target geographies.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      },
      {
        title: "Testing, CI/CD & Production Launch",
        description:
          "Rigorous automated test suites, zero-downtime deployment pipelines, and comprehensive launch-day checklists ensure production readiness with zero regressions.",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    slug: "mobile-development",
    name: "Mobile App Development",
    oneLineDescription: "Native iOS and Android experiences built using robust cross-platform tools.",
    outcomeSubhead: "Deploy beautiful, high-performance mobile apps to App Store and Google Play.",
    techBadges: ["React Native", "Expo", "iOS", "Android", "EAS Build", "Swift / Kotlin"],
    whatsIncluded: [
      "Cross-platform Expo managed or bare workflow setup",
      "App Store & Google Play publishing end-to-end",
      "Offline-first data sync & local DB support",
      "Push notification integration (Expo / Firebase)",
      "Native module & hardware API integration",
      "Performance profiling & 60fps optimization",
      "Beta distribution via TestFlight & Firebase",
      "App Store Optimization (ASO) metadata",
    ],
    businessSummary:
      "We build native-feeling, fluid mobile applications designed to keep your audience engaged and connected on the go. From consumer apps that need to delight millions of users to enterprise tools that need offline reliability, we architect mobile solutions that feel premium on every device — from flagship iPhones to mid-range Android handsets.",
    technicalApproach:
      "Using Expo's modern EAS Build pipelines combined with React Native performance optimization for high-fidelity, 60fps render trees. We use Flashlist for virtualized list rendering, WatermelonDB or MMKV for local persistence, and Expo Router for type-safe file-based navigation. Every app is profiled on real hardware before release.",
    keyBenefits: [
      {
        metric: "98%",
        title: "Crash-Free Sessions",
        description:
          "Optimized React Native render trees, comprehensive device testing, and Sentry crash monitoring deliver consistently stable experiences across iOS and Android.",
      },
      {
        metric: "1 Codebase",
        title: "Dual Platform Coverage",
        description:
          "Shared logic across iOS and Android dramatically reduces development costs while maintaining native look, feel, and platform-specific UX patterns.",
      },
      {
        metric: "30%",
        title: "Lower Build Infrastructure Costs",
        description:
          "EAS managed build pipelines eliminate the overhead of dedicated macOS build servers, manual signing configurations, and complex certificate management.",
      },
      {
        metric: ">95%",
        title: "App Store Approval Rate",
        description:
          "Deep knowledge of Apple and Google review guidelines prevents rejections and ensures your app launches on schedule without expensive resubmissions.",
      },
    ],
    deliveryApproaches: [
      {
        number: "01",
        title: "Platform Strategy & Feature Scoping",
        description:
          "Defining which features ship in V1 vs. later releases, aligning platform-specific hardware capabilities with your business goals, and making informed native vs. cross-platform trade-off decisions.",
        tags: ["Strategy", "Roadmap", "Feature Flags"],
      },
      {
        number: "02",
        title: "React Native & Expo Architecture Setup",
        description:
          "Bootstrapping with Expo's managed or bare workflow, configuring EAS Build for CI, and establishing the navigation stack, folder structure, and state management patterns.",
        tags: ["Expo", "EAS Build", "Architecture"],
      },
      {
        number: "03",
        title: "Navigation, State & Deep Linking",
        description:
          "Implementing Expo Router (file-based) with properly typed navigation stacks, universal deep linking support, and efficient global state management via Zustand or Redux Toolkit.",
        tags: ["Expo Router", "Zustand", "Deep Links"],
      },
      {
        number: "04",
        title: "Native Module & Hardware Integration",
        description:
          "Integrating device-native capabilities — camera, biometrics, GPS, NFC, push notifications, and Bluetooth — using Expo's native SDK or custom bare-workflow native modules.",
        tags: ["Camera", "Push Notifications", "Biometrics"],
      },
      {
        number: "05",
        title: "Offline-First Data Sync Architecture",
        description:
          "Designing optimistic UI updates, local SQLite persistence via WatermelonDB or MMKV, and conflict-resolution logic so your app works flawlessly without internet connectivity.",
        tags: ["WatermelonDB", "MMKV", "Offline Sync"],
      },
      {
        number: "06",
        title: "Performance Profiling & Optimization",
        description:
          "Using Flashlist for long list virtualization, React.memo for render prevention, Hermes JS engine tuning, and real-device profiling to guarantee 60fps on mid-range Android hardware.",
        tags: ["Flashlist", "Hermes", "60fps"],
      },
      {
        number: "07",
        title: "Beta Testing via TestFlight & Firebase",
        description:
          "Internal and external beta distribution, crash reporting via Sentry, and analytics via Amplitude or PostHog to gather real-world performance data before the public launch.",
        tags: ["TestFlight", "Sentry", "Firebase"],
      },
      {
        number: "08",
        title: "App Store Submission & ASO",
        description:
          "Handling code signing, screenshot generation, App Privacy details, and App Store Optimization metadata to maximize discoverability and first-submission approval probability.",
        tags: ["App Store Connect", "Google Play", "ASO"],
      },
    ],
    processSteps: [
      {
        title: "Mobile UX Planning & Platform Strategy",
        description:
          "Translating product features into mobile-first experiences, respecting iOS Human Interface Guidelines and Android Material Design from the very start.",
        imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=600&fit=crop",
      },
      {
        title: "Architecture & Project Bootstrap",
        description:
          "Setting up Expo with EAS Build CI, configuring navigation, state management, and establishing the TypeScript architecture foundation.",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      },
      {
        title: "Core Feature Development",
        description:
          "Building the primary feature set with cross-platform React Native code, native module integrations, and proper offline-first support.",
        imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=600&fit=crop",
      },
      {
        title: "Hardware Integration & Native APIs",
        description:
          "Integrating camera, push notifications, biometrics, GPS, and other device capabilities using Expo's SDK or custom native modules.",
        imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=600&fit=crop",
      },
      {
        title: "Performance Profiling & Beta Testing",
        description:
          "Using Flashlist, Hermes engine tuning, and real-device profiling tools to hit 60fps. Distributing to beta testers via TestFlight and Firebase.",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      },
      {
        title: "Store Submission & Post-Launch",
        description:
          "Handling the full Apple and Google review pipeline, ASO metadata, and setting up automated crash alerting and analytics for the live app.",
        imageUrl: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    oneLineDescription: "Reliable, high-availability cloud architecture with automated deployments.",
    outcomeSubhead: "Achieve 99.99% uptime with infrastructure-as-code and GitOps automation.",
    techBadges: ["AWS", "Docker", "Terraform", "GitHub Actions", "Kubernetes", "Datadog"],
    whatsIncluded: [
      "Infrastructure as Code via Terraform / CDK",
      "Zero-downtime CI/CD deployment automation",
      "Docker containerization & Kubernetes orchestration",
      "Database clustering, replication & backups",
      "Secrets management & IAM hardening",
      "Observability stack (metrics, logs, traces)",
      "Disaster recovery & business continuity planning",
      "FinOps cost optimization & monthly spend reviews",
    ],
    businessSummary:
      "We architect, automate, and continuously optimize cloud environments designed to handle massive spikes in demand without compromising on speed, security, or cost. Whether you're migrating a legacy monolith to microservices, scaling a high-growth SaaS product, or needing a zero-downtime CI/CD overhaul, our DevOps engineers operate at the infrastructure layer so your product engineers can stay in flow.",
    technicalApproach:
      "Deploying multi-region ECS or Kubernetes setups behind Cloudflare CDNs, with absolute secrets isolation via AWS Secrets Manager or HashiCorp Vault, active health checks, and automated rollback triggers. All infrastructure is defined as versioned Terraform code with full GitOps practices — no snowflake servers, ever.",
    keyBenefits: [
      {
        metric: "99.99%",
        title: "Uptime Guarantee",
        description:
          "Multi-region active-active or active-passive failover configurations ensure your application survives availability zone and region-level failures without user impact.",
      },
      {
        metric: "30–40%",
        title: "Cloud Cost Reduction",
        description:
          "FinOps audits, right-sizing recommendations, reserved instance planning, and Spot/Preemptible VM strategies dramatically cut monthly AWS or GCP bills.",
      },
      {
        metric: "10×",
        title: "Faster Deployments",
        description:
          "Fully automated CI/CD pipelines with parallel test execution collapse deployment cycles from hours of manual work down to under 8 minutes.",
      },
      {
        metric: "Zero",
        title: "Security Breach Track Record",
        description:
          "Secrets manager integration, least-privilege IAM policies, automated vulnerability scanning, and network segmentation maintain a zero-breach security posture.",
      },
    ],
    deliveryApproaches: [
      {
        number: "01",
        title: "Infrastructure Audit & Cloud Assessment",
        description:
          "A comprehensive review of your existing cloud footprint — identifying over-provisioned resources, security vulnerabilities, unused services, and architectural anti-patterns before designing the target state.",
        tags: ["Audit", "Cost Analysis", "Security Review"],
      },
      {
        number: "02",
        title: "Infrastructure as Code with Terraform",
        description:
          "Every cloud resource — VPCs, subnets, security groups, ECS clusters, RDS instances, and IAM roles — is defined in version-controlled, modular Terraform, enabling reproducible, drift-free environments.",
        tags: ["Terraform", "CDK", "GitOps"],
      },
      {
        number: "03",
        title: "Containerization & Kubernetes Orchestration",
        description:
          "Dockerizing applications with minimal attack-surface images, writing Kubernetes manifests or Helm charts, and configuring Horizontal Pod Autoscaling for seamless traffic spike resilience.",
        tags: ["Docker", "Kubernetes", "Helm", "ECS"],
      },
      {
        number: "04",
        title: "CI/CD Pipeline Architecture",
        description:
          "Multi-stage GitHub Actions or GitLab CI pipelines running security scanning, automated tests, Docker image builds, and blue-green deployments — with automatic rollback on health check failures.",
        tags: ["GitHub Actions", "GitLab CI", "Blue-Green"],
      },
      {
        number: "05",
        title: "Secret Management & IAM Hardening",
        description:
          "Implementing AWS Secrets Manager or HashiCorp Vault for zero-plaintext-secret policies, combined with least-privilege IAM roles and automated quarterly permission audits.",
        tags: ["Secrets Manager", "IAM", "Vault", "Zero-Trust"],
      },
      {
        number: "06",
        title: "Observability: Metrics, Logs & Traces",
        description:
          "Setting up Datadog, Prometheus/Grafana, or AWS CloudWatch with custom SLI/SLO dashboards, distributed tracing, log aggregation, and on-call alerting for full-stack production visibility.",
        tags: ["Datadog", "Prometheus", "Grafana", "CloudWatch"],
      },
      {
        number: "07",
        title: "Disaster Recovery & Business Continuity",
        description:
          "Designing RTO/RPO-compliant backup strategies, cross-region database replication, automated failover testing, and documented incident response runbooks for every critical service.",
        tags: ["Backup", "Cross-Region Replication", "RTO/RPO"],
      },
      {
        number: "08",
        title: "FinOps & Continuous Cost Optimization",
        description:
          "Monthly cloud spend reviews, reserved instance purchase recommendations, auto-scaling policy tuning, and Spot Fleet configurations to keep infrastructure costs predictable and minimal.",
        tags: ["FinOps", "Reserved Instances", "Auto-Scaling"],
      },
    ],
    processSteps: [
      {
        title: "Cloud Audit & Architecture Blueprint",
        description:
          "Reviewing existing infrastructure, identifying bottlenecks and security risks, and designing a robust, cost-optimized target-state architecture diagram.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      },
      {
        title: "Infrastructure as Code Implementation",
        description:
          "Writing modular Terraform or CDK code that defines every cloud resource in version control, enabling reproducible, drift-free environments across dev, staging, and production.",
        imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop",
      },
      {
        title: "Containerization & Orchestration",
        description:
          "Dockerizing services, writing Kubernetes manifests or Helm charts, and configuring autoscaling policies to handle traffic spikes gracefully with no manual intervention.",
        imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop",
      },
      {
        title: "CI/CD Pipeline Automation",
        description:
          "Multi-stage pipelines with automated security scanning, test execution, Docker builds, and blue-green deployment strategies that guarantee zero production downtime.",
        imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop",
      },
      {
        title: "Security Hardening & Secret Management",
        description:
          "Implementing zero-trust networking, IAM least-privilege policies, Secrets Manager integration, and automated vulnerability scanning across all deployed services.",
        imageUrl: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&h=600&fit=crop",
      },
      {
        title: "Observability, Alerting & Runbooks",
        description:
          "Full production visibility with Datadog or Prometheus dashboards, SLO-based PagerDuty alerting, and documented incident response runbooks for every failure scenario.",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    slug: "ai-data",
    name: "AI & Data Engineering",
    oneLineDescription: "Leverage machine learning, LLMs, and data pipelines to unlock real value.",
    outcomeSubhead: "Deploy intelligent features and real-time analytical dashboards that scale.",
    techBadges: ["Python", "PyTorch", "OpenAI API", "PostgreSQL", "Pandas", "FastAPI", "pgvector"],
    whatsIncluded: [
      "Custom LLM fine-tuning & prompt engineering",
      "ETL / ELT data pipeline orchestration (Airflow, dbt)",
      "RAG (Retrieval Augmented Generation) system design",
      "Vector store integration (pgvector / Pinecone)",
      "Real-time analytics dashboards & data visualization",
      "Model serving APIs via FastAPI (async, scalable)",
      "AI guardrails, safety filters & output validation",
      "MLOps: drift detection, retraining & monitoring",
    ],
    businessSummary:
      "Turn raw datasets into actionable insights or automate tedious operational workflows using advanced artificial intelligence. We help companies move from scattered spreadsheets and manual processes to intelligent, automated systems — whether that's an internal LLM-powered assistant, a customer-facing recommendation engine, a real-time analytics platform, or a fully automated document processing pipeline.",
    technicalApproach:
      "Integrating pgvector databases for semantic vector search, utilizing FastAPI async endpoints for high-throughput model serving, and deploying safe model guards via NeMo Guardrails or custom rule engines. All pipelines are orchestrated with Apache Airflow or Prefect, with full observability via LangSmith or Helicone for LLM input/output logging and quality monitoring.",
    keyBenefits: [
      {
        metric: "10×",
        title: "Faster Insight Extraction",
        description:
          "Automated ETL pipelines and real-time analytics dashboards replace hours of manual spreadsheet work with instant, queryable business intelligence.",
      },
      {
        metric: ">90%",
        title: "RAG Answer Accuracy",
        description:
          "Well-tuned retrieval pipelines with hybrid BM25 + dense search and carefully engineered prompts consistently deliver highly accurate, source-grounded LLM responses.",
      },
      {
        metric: "<100ms",
        title: "Model Inference Latency",
        description:
          "Optimized model serving with response caching, request batching, and hardware-accelerated inference ensures your AI features feel instant, not sluggish.",
      },
      {
        metric: "70%",
        title: "Workflow Automation Rate",
        description:
          "Intelligently replacing manual document processing, classification, and data entry tasks with AI agents dramatically reduces operational overhead and human error.",
      },
    ],
    deliveryApproaches: [
      {
        number: "01",
        title: "Data Discovery & Quality Assessment",
        description:
          "Auditing all available data sources — databases, third-party APIs, file dumps, and event streams — for completeness, consistency, and quality before designing any pipeline or model architecture.",
        tags: ["Data Audit", "Quality Scoring", "Source Mapping"],
      },
      {
        number: "02",
        title: "ETL Pipeline Architecture & Orchestration",
        description:
          "Designing robust, idempotent ETL/ELT pipelines using Apache Airflow, dbt, or Prefect that ingest, clean, transform, and load data into structured data warehouses or lakes with full lineage tracking.",
        tags: ["Airflow", "dbt", "Prefect", "Snowflake"],
      },
      {
        number: "03",
        title: "Feature Engineering & Semantic Data Modeling",
        description:
          "Transforming raw data into high-signal ML features using domain expertise and statistical analysis, then structuring semantic data models that power reliable ML training and BI dashboards.",
        tags: ["Feature Engineering", "dbt Models", "BigQuery"],
      },
      {
        number: "04",
        title: "Model Selection, Fine-Tuning & RAG Design",
        description:
          "Evaluating open-source and proprietary foundation models (GPT-4o, Claude 3.5, Llama 3), applying parameter-efficient fine-tuning (LoRA/QLoRA) where needed, and building domain-specific RAG retrieval pipelines.",
        tags: ["LoRA", "Fine-Tuning", "RAG", "LangChain"],
      },
      {
        number: "05",
        title: "Vector Store & Semantic Search Integration",
        description:
          "Implementing pgvector or Pinecone for high-dimensional embedding storage, designing optimal chunking strategies, metadata filtering, and hybrid BM25 + dense retrieval for maximum relevance.",
        tags: ["pgvector", "Pinecone", "Embeddings", "Hybrid Search"],
      },
      {
        number: "06",
        title: "FastAPI Model Serving & API Gateway",
        description:
          "Wrapping trained or fine-tuned models in FastAPI async endpoints with Pydantic validation, Kubernetes HPA autoscaling, Redis response caching, and auto-generated OpenAPI documentation.",
        tags: ["FastAPI", "Kubernetes HPA", "Redis Cache", "OpenAPI"],
      },
      {
        number: "07",
        title: "Guardrails, Safety & Output Validation",
        description:
          "Implementing LLM guardrails using NVIDIA NeMo Guardrails or custom rule engines to prevent hallucination, toxic outputs, PII data leakage, and off-topic responses in production environments.",
        tags: ["NeMo Guardrails", "PII Detection", "Output Validation"],
      },
      {
        number: "08",
        title: "MLOps: Monitoring, Drift Detection & Retraining",
        description:
          "Logging every model input and output with LangSmith or Helicone, tracking quality metrics over time, detecting data/concept drift automatically, and scheduling retraining pipelines on a cadence.",
        tags: ["LangSmith", "Drift Detection", "MLOps", "Retraining"],
      },
    ],
    processSteps: [
      {
        title: "Data Discovery & Quality Audit",
        description:
          "Cataloguing all available data sources, profiling data completeness and quality, and identifying gaps that must be resolved before any pipeline or model work begins.",
        imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop",
      },
      {
        title: "ETL Pipeline Architecture",
        description:
          "Building robust, idempotent data ingestion pipelines that clean, normalize, and load data into structured warehouses or lakes with full lineage and monitoring.",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      },
      {
        title: "Feature Engineering & Data Modeling",
        description:
          "Crafting high-signal ML features and building semantic data models that power reliable predictions, recommendation systems, and BI dashboards.",
        imageUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=600&fit=crop",
      },
      {
        title: "Model Selection, Fine-Tuning & RAG Setup",
        description:
          "Evaluating foundation models, applying LoRA fine-tuning, building vector stores, and designing domain-specific RAG retrieval pipelines over pgvector or Pinecone.",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
      },
      {
        title: "API Serving, Guardrails & Safety",
        description:
          "Deploying models via FastAPI async endpoints with Pydantic validation, rate limiting, PII detection, and NeMo Guardrails for production-safe AI interactions.",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      },
      {
        title: "MLOps: Monitoring & Continuous Improvement",
        description:
          "Continuous quality monitoring with LangSmith, automated drift detection, and scheduled retraining pipelines to keep models accurate and trustworthy over time.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    slug: "quality-engineering",
    name: "Quality Engineering & QA",
    oneLineDescription: "Strict automated testing to keep your releases stable and secure.",
    outcomeSubhead: "Deploy to production with confidence on every single release.",
    techBadges: ["Playwright", "Jest", "Vitest", "k6", "axe-core", "Lighthouse", "Snyk"],
    whatsIncluded: [
      "End-to-end browser automation (Playwright / Cypress)",
      "Unit & integration test architecture (Vitest / Jest)",
      "API contract testing & OpenAPI validation",
      "Performance & load testing with k6",
      "WCAG 2.2 AA accessibility auditing (axe-core)",
      "Security scanning (OWASP ZAP, Snyk)",
      "CI/CD test gate integration (GitHub Actions)",
      "Regression suites & release checklist automation",
    ],
    businessSummary:
      "Eliminate bugs, visual regressions, and security vulnerabilities before they ever impact your users. We design and implement multi-layer quality engineering programs that transform your deployment pipeline from a nerve-wracking manual process into a confident, automated release machine — running hundreds of checks in minutes before every merge.",
    technicalApproach:
      "Automated Playwright E2E tests running headlessly in your CI pipeline, covering core user journeys and multi-tenant isolation scenarios. Vitest unit tests enforce >80% code coverage via branch protection rules. k6 load tests validate infrastructure behavior under peak traffic. OWASP ZAP and Snyk scans catch security vulnerabilities before they reach production.",
    keyBenefits: [
      {
        metric: "95%",
        title: "Bugs Caught Pre-Production",
        description:
          "Multi-layer test coverage from unit to E2E eliminates the vast majority of defects before they ever reach real users or critical production systems.",
      },
      {
        metric: "80%+",
        title: "Test Coverage Maintained",
        description:
          "Automated coverage gates in CI enforce minimum thresholds, ensuring the test suite grows proportionally with every new feature added to the codebase.",
      },
      {
        metric: "Zero",
        title: "Critical Production Regressions",
        description:
          "Automated regression suites running on every pull request act as a safety net, blocking breaking changes before they can ever be merged to main.",
      },
      {
        metric: "60%",
        title: "Shorter QA Cycles",
        description:
          "Parallelized Playwright test execution in CI dramatically reduces manual QA workloads, enabling faster and more confident release cadences.",
      },
    ],
    deliveryApproaches: [
      {
        number: "01",
        title: "Test Strategy & Risk-Based Planning",
        description:
          "Mapping critical user paths, high-risk code areas, compliance requirements, and edge cases to design a layered test strategy that maximizes coverage where business impact is highest.",
        tags: ["Test Strategy", "Risk Analysis", "Coverage Planning"],
      },
      {
        number: "02",
        title: "Unit & Integration Test Architecture",
        description:
          "Writing fast, isolated unit tests with Vitest and Jest, and robust integration tests that validate interactions between components, services, database layers, and external APIs.",
        tags: ["Vitest", "Jest", "Integration Tests"],
      },
      {
        number: "03",
        title: "End-to-End Browser Automation",
        description:
          "Building resilient Playwright E2E suites covering every critical user journey — auth flows, checkout, onboarding, dashboards — across Chromium, Firefox, and WebKit in parallel CI runs.",
        tags: ["Playwright", "Cross-Browser", "E2E Automation"],
      },
      {
        number: "04",
        title: "API Contract Testing & Validation",
        description:
          "Validating every API endpoint against its OpenAPI specification using structured contract tests, ensuring API consumers never receive unexpected responses, schema changes, or missing fields.",
        tags: ["API Testing", "OpenAPI", "Contract Tests"],
      },
      {
        number: "05",
        title: "Performance, Load & Stress Testing",
        description:
          "Using k6 to simulate peak-traffic scenarios and Lighthouse CI to track Core Web Vitals budgets, identifying memory leaks and infrastructure bottlenecks before they affect real users.",
        tags: ["k6", "Lighthouse CI", "Load Testing", "Core Web Vitals"],
      },
      {
        number: "06",
        title: "Accessibility Auditing (WCAG 2.2)",
        description:
          "Automated axe-core scans combined with structured manual keyboard navigation audits ensure every interface meets WCAG 2.2 AA standards, including full screen reader compatibility testing.",
        tags: ["axe-core", "WCAG 2.2", "a11y", "Screen Readers"],
      },
      {
        number: "07",
        title: "Security & Vulnerability Scanning",
        description:
          "Automated OWASP ZAP dynamic scans, SQL injection and XSS fuzzing, Snyk dependency auditing, and manual security review of authentication flows and sensitive data handling.",
        tags: ["OWASP ZAP", "Snyk", "Pen Testing", "Dependency Audit"],
      },
      {
        number: "08",
        title: "CI Integration & Release Gate Management",
        description:
          "All test suites run automatically in GitHub Actions on every pull request, with branch protection rules that block any merge when tests fail, coverage drops, or security issues are detected.",
        tags: ["GitHub Actions", "Branch Protection", "Release Gates"],
      },
    ],
    processSteps: [
      {
        title: "Test Strategy & Coverage Planning",
        description:
          "Mapping critical paths, edge cases, and compliance requirements to design a risk-based, layered test strategy that ensures full coverage of high-impact areas.",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      },
      {
        title: "Unit & Integration Test Architecture",
        description:
          "Establishing a scalable, maintainable testing architecture with Vitest and Jest for fast, reliable unit and service integration test suites.",
        imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
      },
      {
        title: "E2E Automation with Playwright",
        description:
          "Writing resilient end-to-end browser tests covering all critical user journeys across Chromium, Firefox, and WebKit running in parallel CI pipelines.",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      },
      {
        title: "Performance & Accessibility Auditing",
        description:
          "Lighthouse CI and k6 ensure every release meets Core Web Vitals performance budgets. axe-core enforces WCAG 2.2 AA compliance on every component.",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      },
      {
        title: "Security & Vulnerability Scanning",
        description:
          "OWASP ZAP scans, Snyk dependency audits, and structured penetration testing identify and resolve security risks well before any deployment.",
        imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=600&fit=crop",
      },
      {
        title: "CI Integration & Release Gate Enforcement",
        description:
          "Plugging all test suites into GitHub Actions with branch protection rules that block faulty, untested, or insecure code from ever reaching production.",
        imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
      },
    ],
  },
  {
    slug: "dedicated-teams",
    name: "Dedicated Teams & Staff Aug",
    oneLineDescription: "Embed elite software engineers directly into your product roadmap.",
    outcomeSubhead: "Instantly scale your engineering capacity with pre-vetted senior talent.",
    techBadges: ["Agile Scrum", "Kanban", "Team Integration", "Dedicated Engineers", "Senior Devs", "Remote-First"],
    whatsIncluded: [
      "Fully integrated Scrum or Kanban squads",
      "Direct Slack, Jira & GitHub communication channels",
      "Accelerated 5-day onboarding framework",
      "Technical leadership & delivery oversight",
      "Bi-weekly performance reviews & KPI tracking",
      "Architecture Decision Records & documentation",
      "Flexible engagement scaling (up or down anytime)",
      "Knowledge transfer & exit documentation",
    ],
    businessSummary:
      "Accelerate your delivery milestones by integrating our vetted, high-performing software engineers directly into your existing product team. Whether you need to scale a startup's engineering velocity, backfill a senior departure, or add specialized expertise for a critical sprint, we provide deeply embedded engineers who operate as genuine extensions of your team — not external vendors.",
    technicalApproach:
      "Aligning to your existing Git flow, sprint cadence, code review culture, and engineering standards from day one. Engineers maintain consistent documentation via Architecture Decision Records and inline code documentation, ensuring no knowledge is ever siloed. Bi-weekly delivery check-ins with Onyx's technical leads keep quality and velocity on track.",
    keyBenefits: [
      {
        metric: "<5 Days",
        title: "Time to First Commit",
        description:
          "Our accelerated onboarding framework integrates engineers into your Slack, Jira, and Git workflows so they contribute meaningful, reviewed code within their first week.",
      },
      {
        metric: "98%",
        title: "Engineer Retention Rate",
        description:
          "Our engineers are engaged, well-supported, and properly incentivized to remain embedded in your team for the full duration of the engagement — no mid-project dropouts.",
      },
      {
        metric: "8+ Yrs",
        title: "Average Engineer Experience",
        description:
          "Every engineer placed through Onyx has a minimum of 8 years of professional experience in their domain, with verifiable portfolios and rigorous technical assessments.",
      },
      {
        metric: "4×",
        title: "Faster Feature Delivery",
        description:
          "Pre-vetted senior engineers embedded in your team deliver meaningful, production-ready features from sprint one — no ramp-up guesswork or junior-level overhead.",
      },
    ],
    deliveryApproaches: [
      {
        number: "01",
        title: "Skills Gap & Technical Needs Assessment",
        description:
          "A structured discovery session to understand your team composition, technology stack, current velocity blockers, and the specific expertise gaps you need filled within a defined timeline.",
        tags: ["Needs Assessment", "Gap Analysis", "Technical Discovery"],
      },
      {
        number: "02",
        title: "Candidate Shortlisting within 48 Hours",
        description:
          "We maintain a continuously pre-vetted pool of senior engineers across frontend, backend, mobile, DevOps, and AI — presenting the top 2-3 matched profiles within 48 hours of receiving your brief.",
        tags: ["Talent Pool", "48hr Turnaround", "Vetted Engineers"],
      },
      {
        number: "03",
        title: "Technical Interview & Culture Fit Screening",
        description:
          "A structured two-stage process including a live architecture discussion or coding session and a culture-fit conversation directly with your team lead — ensuring alignment before any commitment.",
        tags: ["Live Coding", "Architecture Interview", "Culture Fit"],
      },
      {
        number: "04",
        title: "Accelerated 5-Day Onboarding Framework",
        description:
          "A structured first week covering your codebase, architecture, Git workflow, testing standards, and team communication norms — so engineers hit the ground running from the second week.",
        tags: ["Onboarding", "Codebase Walkthrough", "Git Flow"],
      },
      {
        number: "05",
        title: "Full Agile Workflow & Sprint Integration",
        description:
          "Seamless integration into your existing Scrum or Kanban workflow — joining daily standups, sprint planning, retrospectives, and demos — with zero disruption to your team's established rhythm.",
        tags: ["Scrum", "Kanban", "Sprint Planning", "Standups"],
      },
      {
        number: "06",
        title: "Bi-Weekly Performance Reviews & KPI Tracking",
        description:
          "Structured performance check-ins between Onyx's delivery lead and your engineering manager keep velocity, code quality, and team satisfaction consistently on track throughout the engagement.",
        tags: ["Performance Reviews", "KPIs", "Delivery Lead"],
      },
      {
        number: "07",
        title: "Knowledge Transfer & Documentation Standards",
        description:
          "Engineers document all architectural decisions via ADRs, maintain inline code documentation, and produce handoff summaries — ensuring zero knowledge loss if the engagement scope changes.",
        tags: ["ADRs", "Documentation", "Knowledge Transfer"],
      },
      {
        number: "08",
        title: "Flexible Long-Term Scaling",
        description:
          "Easily scale the team up with additional specialists during crunch sprints, ramp down after milestones, add new domains, or transition to a fixed-scope project model — entirely on your terms.",
        tags: ["Flexible Scaling", "Engagement Models", "Long-Term"],
      },
    ],
    processSteps: [
      {
        title: "Needs Assessment & Requirements Mapping",
        description:
          "Understanding your team culture, tech stack, velocity targets, and the specific skill gaps you need filled — quickly and without ambiguity.",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop",
      },
      {
        title: "Candidate Shortlisting (48 Hours)",
        description:
          "Matching requirements against our pre-vetted talent pool and presenting the top 2-3 senior engineer profiles within 48 hours of brief receipt.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      },
      {
        title: "Technical Interview & Selection",
        description:
          "Structured two-stage interviews with live architecture discussions and culture-fit sessions, ensuring the right engineer joins your team.",
        imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
      },
      {
        title: "Accelerated 5-Day Onboarding",
        description:
          "A structured onboarding covering codebase, architecture, Git workflows, and team norms — so engineers are productive from their second week.",
        imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
      },
      {
        title: "Embedded Sprint Delivery",
        description:
          "Full integration into your Scrum or Kanban workflow — shipping meaningful, production-ready features from the very first sprint.",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      },
      {
        title: "Continuous Reviews & Long-Term Scaling",
        description:
          "Bi-weekly performance reviews, ongoing knowledge transfer documentation, and flexible engagement scaling as your product and team evolve.",
        imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      },
    ],
  },
];

export const CAREERS: CareerRole[] = [
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    about: "We are seeking a Senior Frontend Engineer who is passionate about creating fluid user interfaces, beautiful animations, and highly performant Next.js applications.",
    workOn: [
      "Build out next-generation React components using Tailwind CSS v4 and Framer Motion.",
      "Optimize core web vitals and overall page-load performance.",
      "Work closely with our product design team to build and maintain our custom design systems.",
      "Establish engineering best practices and mentor junior developers."
    ],
    lookingFor: [
      "5+ years of professional frontend experience with React and TypeScript.",
      "Deep understanding of Next.js App Router, SSR, and ISR optimization.",
      "Exceptional eye for detail and animations (familiarity with easing curves, layout transitions).",
      "Experience with WCAG 2.2 accessibility standard compliance."
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Playwright"]
  },
  {
    slug: "full-stack-engineer",
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    about: "Join us in developing our multi-tenant Client Portal and backend APIs, utilizing PostgreSQL, Drizzle ORM, and modern authorization flows.",
    workOn: [
      "Develop and optimize Drizzle database migrations and PostgreSQL queries.",
      "Build secure authorization flows utilizing Better Auth.",
      "Collaborate on UI components and server actions in our Next.js project.",
      "Implement audit logging and multi-tenant security verification checks."
    ],
    lookingFor: [
      "4+ years of professional experience building Node/TypeScript backends.",
      "Proficient with SQL databases, especially PostgreSQL.",
      "Experience setting up secure tenant-scoped logic and RBAC matrix.",
      "Knowledge of modern developer environments and CI/CD pipelines."
    ],
    techStack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Better Auth", "Zod", "TypeScript"]
  }
];

export const INSIGHTS: BlogPost[] = [
  {
    slug: "future-of-tailwind-v4",
    category: "Development",
    title: "The Future of Tailwind CSS: Deep Dive into Version 4",
    readTime: "5 min",
    date: "June 18, 2026",
    author: {
      name: "Bilal Onyx",
      role: "Lead Frontend Architect",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
    },
    summary: "An in-depth look at Tailwind CSS v4's CSS-first configuration, improved compiler speed, and container queries.",
    content: "Tailwind CSS v4 introduces a revolutionary CSS-first configuration system that replaces javascript-based configuration files. This results in significantly faster compilation speeds, seamless Turbopack integration, and natively built-in container query support. In this article, we cover how to leverage theme extensions, custom animation hooks, and CSS variables to build premium interfaces."
  },
  {
    slug: "designing-with-motion",
    category: "Design",
    title: "Designing with Motion: Crafting Fluid Web Interfaces",
    readTime: "7 min",
    date: "June 12, 2026",
    author: {
      name: "Sophia Chen",
      role: "Head of Product Design",
      avatarUrl: "/assets/team/syed_raza_ali_gillani.png"
    },
    summary: "Explore the philosophy behind modern motion design, focusing on micro-animations and accessibility.",
    content: "Motion design shouldn't be a decorative afterthought; it's a core communication channel. Learn how to design interface elements that feel physically natural by using spring-based physical animations, avoiding excessive motion for keyboard focus, and strictly adhering to prefers-reduced-motion media query values."
  }
];
