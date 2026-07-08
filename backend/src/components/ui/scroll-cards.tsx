"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface ScrollCardItem {
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
}

interface ScrollCardsProps {
  items: ScrollCardItem[];
  className?: string;
}

export function ScrollCards({ items, className = "" }: ScrollCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={`relative pb-[10vh] ${className}`}>
      {items.map((item, index) => {
        const targetScale = 1 - (items.length - index) * 0.05;
        // Map the scroll progress of the entire container to each individual card
        // Calculate the range for each card to start scaling down
        const startProgress = index / items.length;
        const endProgress = (index + 1) / items.length;
        
        // Disable rules of hooks for conditional transforms. useTransform works fine inside maps if stable.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(
          scrollYProgress,
          [startProgress, endProgress],
          [1, targetScale]
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(
          scrollYProgress,
          [startProgress, endProgress],
          [1, 0.96]
        );

        return (
          <div
            key={index}
            className="h-screen sticky top-0 flex items-center justify-center pt-24"
          >
            <motion.div
              style={{
                scale,
                opacity,
                top: `calc(10vh + ${index * 20}px)`,
                backgroundColor: "var(--scroll-card-bg, var(--bg-card))",
                borderColor: "var(--border)",
                boxShadow: "0 18px 50px rgba(15, 23, 42, 0.10)",
              }}
              className="relative w-full max-w-4xl rounded-2xl border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden origin-top"
            >
              {/* Text Content */}
              <div className="flex-1 flex flex-col gap-4">
                {item.icon && (
                  <div className="w-12 h-12 rounded-xl bg-[#0BBDF4]/10 text-[#0BBDF4] flex items-center justify-center mb-2">
                    {item.icon}
                  </div>
                )}
                <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--fg)" }}>
                  {item.title}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {item.description}
                </p>
              </div>

              {/* Image Content (if any) */}
              {item.image && (
                <div className="flex-1 w-full md:w-1/2 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[var(--border)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
