"use client";

import React, { createContext, useContext, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * PRD §10.2 — Text Gradient Scroll
 * Approved for: /about mission statement + /insights/[slug] opening thesis only.
 * Renders full text as real DOM nodes at all times — screen-reader and
 * prefers-reduced-motion friendly.
 */

type TextOpacityEnum = "none" | "soft" | "medium";
type ViewTypeEnum = "word" | "letter";

interface TextGradientScrollProps {
  text: string;
  type?: ViewTypeEnum;
  className?: string;
  textOpacity?: TextOpacityEnum;
}

const opacityMap: Record<TextOpacityEnum, number> = {
  none: 0,
  soft: 0.2,
  medium: 0.4,
};

// Context to share scroll progress
const ScrollContext = createContext<{ scrollYProgress: MotionValue<number> } | null>(null);

function WordReveal({
  word,
  index,
  total,
  textOpacity,
}: {
  word: string;
  index: number;
  total: number;
  textOpacity: number;
}) {
  const ctx = useContext(ScrollContext)!;
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(ctx.scrollYProgress, [start, end], [textOpacity, 1]);

  return (
    <motion.span
      className="inline-block mr-[0.25em] will-change-[opacity]"
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

function LetterReveal({
  letter,
  index,
  total,
  textOpacity,
}: {
  letter: string;
  index: number;
  total: number;
  textOpacity: number;
}) {
  const ctx = useContext(ScrollContext)!;
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(ctx.scrollYProgress, [start, end], [textOpacity, 1]);

  return (
    <motion.span
      className="inline-block will-change-[opacity]"
      style={{ opacity }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
}

export function TextGradientScroll({
  text,
  type = "word",
  className,
  textOpacity = "soft",
}: TextGradientScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.3"],
  });

  const baseOpacity = opacityMap[textOpacity];

  const items = type === "word" ? text.split(" ") : text.split("");

  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={containerRef} className={cn("leading-relaxed", className)}>
        {type === "word"
          ? items.map((word, i) => (
              <WordReveal
                key={i}
                word={word}
                index={i}
                total={items.length}
                textOpacity={baseOpacity}
              />
            ))
          : items.map((letter, i) => (
              <LetterReveal
                key={i}
                letter={letter}
                index={i}
                total={items.length}
                textOpacity={baseOpacity}
              />
            ))}
      </div>
    </ScrollContext.Provider>
  );
}
