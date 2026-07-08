"use client";

import { motion } from "framer-motion";
import { Section, Badge } from "@/components/ui/primitives";
import Link from "next/link";
import { ArrowLeft } from "iconoir-react";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base mb-12 font-medium" style={{ color: "var(--fg-subtle)" }}>
            Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-12 text-base md:text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>1. Introduction</h2>
              <p>
                At Onyx Interactive, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>2. Information We Collect</h2>
              <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect includes:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>3. Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Create and manage your account.</li>
                <li>Email you regarding your account or order.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>4. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
                <br /><br />
                <strong>Onyx Interactive Pvt. Ltd.</strong><br />
                Office No. 8, First Floor, Abbasi Plaza<br />
                Kalapul, near Aramco Petrol Pump<br />
                Abbottabad, Pakistan<br />
                Email: info@oynxinteractive.com
              </p>
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
