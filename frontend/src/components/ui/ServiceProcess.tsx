"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/primitives";

interface Step {
  title: string;
  description: string;
  imageUrl: string;
}

export function ServiceProcess({ steps }: { steps: Step[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          className="h-full"
        >
          <GlowCard className="p-0 overflow-hidden group h-full flex flex-col hover:border-[#0BBDF4]/40 transition-colors">
            <div className="h-48 overflow-hidden relative">
              <img
                src={step.imageUrl}
                alt={step.title}
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div 
                className="absolute inset-0 opacity-80" 
                style={{ background: "linear-gradient(to top, var(--bg-card), transparent)" }}
              />
              <div className="absolute bottom-3 left-4">
                <span className="text-[#0BBDF4] font-bold text-4xl opacity-50 block leading-none">
                  0{i + 1}
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--fg)" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{step.description}</p>
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}
