"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
} from "lucide-react";
import { Twitter, Linkedin, Github } from "iconoir-react";
import { TextHoverEffect } from "@/components/ui/hover-footer";
import { motion } from "framer-motion";
import LineWaves from "@/components/ui/line-waves";

export function SiteFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterTouched, setNewsletterTouched] = useState(false);
  const newsletterError = useMemo(() => {
    if (!newsletterEmail.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) return "Enter a valid email.";
    return "";
  }, [newsletterEmail]);
  const canSubscribe = !newsletterError;

  // Footer link data based on original FOOTER_NAV
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Product Design & UX", href: "/services/product-design" },
        { label: "Web Development", href: "/services/web-development" },
        { label: "Mobile Development", href: "/services/mobile-development" },
        { label: "Cloud & DevOps", href: "/services/cloud-devops" },
        { label: "AI & Data", href: "/services/ai-data" },
      ],
    },
    {
      title: "Resources & Legal",
      links: [
        { label: "Case Studies", href: "/work" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#0BBDF4] shrink-0 mt-0.5" />,
      text: "info@oynxinteractive.com",
      href: "mailto:info@oynxinteractive.com",
    },
    {
      icon: <MapPin size={18} className="text-[#0BBDF4] shrink-0 mt-0.5" />,
      text: "Office No. 8, First Floor, Abbasi Plaza, Kalapul, near Aramco Petrol Pump, Abbottabad, Pakistan",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "https://twitter.com" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com" },
  ];

  return (
    <footer className="relative transition-colors duration-300 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-subtle)",
        borderTop: "1px solid var(--border)",
      }}>
      
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <LineWaves
          speed={0.2}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1.0}
          rotation={-18}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.5}
          brightness={0.3}
          color1="#0EA5E9"
          color2="#38BDF8"
          color3="#0C4A6E"
          enableMouseInteraction={true}
          mouseInfluence={1}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4 lg:gap-8 pb-4">
          {/* Brand section */}
          <div className="flex flex-col space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Onyx Interactive"
                width={40}
                height={40}
                className="rounded-xl border shrink-0 p-1.5"
                priority={false}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "var(--border)",
                }}
              />
              <span className="text-2xl font-bold" style={{ color: "var(--fg)" }}>
                Oynx Interactive
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Oynx Interactive is a premium software studio delivering world-class web apps, mobile products, and enterprise software.
            </p>
            
            <div className="pt-4">
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--fg)" }}>
                Get our engineering insights — no spam.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterTouched(true);
                }}
                className="flex flex-col gap-2 max-w-md"
                noValidate
              >
                <div className="flex gap-2">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    placeholder="you@company.com"
                    aria-label="Email address for newsletter"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    onBlur={() => setNewsletterTouched(true)}
                    className="flex-1 px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BBDF4]/50 transition"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--fg)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!canSubscribe}
                    className="px-5 py-2.5 text-sm font-semibold bg-[#0BBDF4] text-black rounded-lg hover:bg-[#4DD4FA] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterTouched && newsletterError && (
                  <p className="text-xs text-red-400">{newsletterError}</p>
                )}
              </form>
            </div>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-6" style={{ color: "var(--fg)" }}>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative block">
                    <Link
                      href={link.href}
                      className="relative inline-flex transition-colors duration-200 group hover:text-[#0BBDF4]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#0BBDF4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4 lg:gap-8 pb-4">
          {/* Contact section */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6" style={{ color: "var(--fg)" }}>
              Contact Us
            </h4>
            <ul className="space-y-4 mb-6">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm" style={{ color: "var(--fg-muted)" }}>
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#0BBDF4] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-[#0BBDF4] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="rounded-xl overflow-hidden w-full max-w-sm h-40 relative border" style={{ borderColor: "var(--border)" }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11114.697458400982!2d73.24529020372269!3d34.21673463681455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de310046b09eb3%3A0xde2bcb131122760b!2sOynx%20Interactive%20Pvt%20Ltd!5e0!3m2!1sen!2s!4v1783412324663!5m2!1sen!2s" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        
        {/* Text hover effect integrated elegantly without breaking layout */}
        <div className="relative w-full h-[5rem] md:h-[8rem] lg:h-[12rem] mt-2 mb-0">
          <TextHoverEffect text="OYNX." className="z-10 absolute inset-0" />
        </div>

        <hr className="my-6" style={{ borderColor: "var(--border)" }} />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-center md:text-left" style={{ color: "var(--fg-subtle)" }}>
            &copy; {new Date().getFullYear()} Oynx Interactive Pvt. Ltd. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex space-x-6" style={{ color: "var(--fg-subtle)" }}>
            {socialLinks.map(({ icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#0BBDF4] transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
