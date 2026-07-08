"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "iconoir-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  author: string;
  image: string;
  alt: string;
}

interface ScrollReelTestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
}

export function ScrollReelTestimonials({ testimonials, className }: ScrollReelTestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  const goNext = useCallback(() => go(1), [go]);
  const goPrev = useCallback(() => go(-1), [go]);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(goNext, 5500);
  }, [goNext]);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        stopAuto();
        goNext();
        startAuto();
      }
      if (e.key === "ArrowLeft") {
        stopAuto();
        goPrev();
        startAuto();
      }
    },
    [goNext, goPrev, stopAuto, startAuto]
  );

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  const t = testimonials[current];

  return (
    <div
      className={cn("w-full", className)}
      role="region"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-[1060px] mx-auto rounded-2xl border border-border bg-bg-card/40 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-1 md:grid-cols-12"
            aria-live="polite"
          >
            <div className="md:col-span-4 relative min-h-[260px] overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(11,189,244,0.35)] to-transparent" />
              <Image
                src={t.image}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
                quality={100}
                priority={current === 0}
              />
            </div>

            <div className="md:col-span-8 p-10 md:p-14 flex flex-col justify-between">
              <svg
                className="w-10 h-10 text-[#0BBDF4] opacity-80 mb-6"
                viewBox="0 0 40 40"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 8C7.6 8 4 11.6 4 16s3.6 8 8 8h1v8h8V16c0-4.4-3.6-8-8-8H12zm16 0c-4.4 0-8 3.6-8 8s3.6 8 8 8h1v8h8V16c0-4.4-3.6-8-8-8H28z" />
              </svg>

              <blockquote className="text-xl md:text-2xl font-medium text-fg leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              <cite className="not-italic text-sm text-[#0BBDF4] font-semibold">
                - {t.author}
              </cite>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 right-8 flex items-center gap-3">
          <div className="flex gap-2 mr-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  stopAuto();
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                  startAuto();
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === current ? "bg-[#0BBDF4] scale-125" : "bg-fg-subtle hover:bg-fg-muted"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => {
              stopAuto();
              goPrev();
              startAuto();
            }}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-fg-muted hover:text-fg hover:border-border-hover transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              stopAuto();
              goNext();
              startAuto();
            }}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-fg-muted hover:text-fg hover:border-border-hover transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
