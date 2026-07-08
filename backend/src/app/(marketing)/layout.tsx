"use client";

import { Navbar } from "@/components/ui/navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-0">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, transform: "translateY(8px)" }}
          animate={{ opacity: 1, transform: "translateY(0)" }}
          transition={{
            duration: 0.18,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {children}
        </motion.div>
      </main>
      <SiteFooter />
    </>
  );
}
