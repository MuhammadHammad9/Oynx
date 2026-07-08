"use client";

import { motion } from "framer-motion";
import { Section, Badge } from "@/components/ui/primitives";
import Link from "next/link";
import { ArrowLeft } from "iconoir-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 md:pt-32" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <Section>
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-semibold mb-8 hover:text-[#0BBDF4] transition-colors" style={{ color: "var(--fg-muted)" }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Badge variant="blue" className="mb-6">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
            Terms of Service
          </h1>
          <p className="text-sm md:text-base mb-12 font-medium" style={{ color: "var(--fg-subtle)" }}>
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-12 text-base md:text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Onyx Interactive ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>3. User Representations</h2>
              <p>
                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>4. Governing Law</h2>
              <p>
                These Terms shall be governed by and defined following the laws of Pakistan. Onyx Interactive and yourself irrevocably consent that the courts of Pakistan shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
