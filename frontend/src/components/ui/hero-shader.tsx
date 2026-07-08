"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { useTheme } from "@/components/ui/theme-provider"

interface ShaderBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export function ShaderBackground({ children, className }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [isWebGLSupported, setIsWebGLSupported] = useState(false)
  const prefersReduced = useRef(false)

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (gl) {
        setIsWebGLSupported(true)
      }
    } catch {
      // do nothing
    }

    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    }

    // Pause shader when out of viewport to save GPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.01 }
    )
    if (container) observer.observe(container)

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
      observer.disconnect()
    }
  }, [])

  // Speed: reduce when not interacting; freeze if prefers-reduced-motion
  const speed = prefersReduced.current ? 0 : isActive ? 0.5 : 0.25

  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      ref={containerRef}
      className={className || "min-h-[650px] w-full relative overflow-hidden bg-black dark:bg-black"}
      style={{ backgroundColor: isDark ? "#000000" : "#f0f9ff" }}
    >
      {/* Background Shader — only rendered when in viewport and WebGL is supported */}
      {isInView && isWebGLSupported && (
        <MeshGradient
          className="absolute inset-0 w-full h-full shader-canvas opacity-70 dark:opacity-100"
          colors={
            isDark
              ? ["#000000", "#0BBDF4", "#020d13", "#4DD4FA", "#062837"]
              : ["#f0f9ff", "#0BBDF4", "#e0f2fe", "#4DD4FA", "#bae6fd"]
          }
          speed={speed}
        />
      )}

      {children}
    </div>
  )
}
