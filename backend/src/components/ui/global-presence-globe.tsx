"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface GlobalPresenceGlobeProps {
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Onyx Interactive — Global Presence globe.
 * Theme-aware: adapts sphere & outline colors for dark/light mode.
 *  - Sphere fill:         dark: #0a0a0a  /  light: #dce8f5
 *  - Outline / graticule: dark: #FFFFFF  /  light: #000000 at low opacity
 *  - Landmass dots:       #0BBDF4 (Onyx Blue)
 *  - Office pins:         #0BBDF4 full + contrasting ring
 */
export default function GlobalPresenceGlobe({
  width = 480,
  height = 480,
  className = "",
}: GlobalPresenceGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const containerWidth = Math.min(width, window.innerWidth - 40);
    const containerHeight = Math.min(height, window.innerHeight - 100);
    const radius = Math.min(containerWidth, containerHeight) / 2.4;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);
    const path = d3.geoPath().projection(projection).context(context);

    // Office markers — Lahore, Karachi, Islamabad
    const officeMarkers: [number, number][] = [
      [74.3587, 31.5204],
      [67.0011, 24.8607],
      [73.0479, 33.6844],
    ];

    let landFeatures: any = null;
    let allDots: { lng: number; lat: number }[] = [];

    const isLand = (lng: number, lat: number): boolean => {
      if (!landFeatures) return false;
      const point: [number, number] = [lng, lat];
      return landFeatures.features.some((f: any) => {
        try {
          return (d3.geoContains as any)(f, point);
        } catch {
          return false;
        }
      });
    };

    const generateDots = () => {
      allDots = [];
      for (let lat = -90; lat <= 90; lat += 4.5) {
        for (let lng = -180; lng <= 180; lng += 4.5) {
          if (isLand(lng, lat)) {
            allDots.push({ lng, lat });
          }
        }
      }
    };

    const getIsDark = () => !document.documentElement.classList.contains("light");

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      const scaleFactor = projection.scale() / radius;

      const isDark = getIsDark();
      const sphereColor = isDark ? "#0a0a0a" : "#dce8f5";
      const outlineColor = isDark ? "#FFFFFF" : "#000000";
      const pinRingColor = isDark ? "#FFFFFF" : "#0a0a0a";

      // Globe sphere
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, projection.scale(), 0, 2 * Math.PI);
      context.fillStyle = sphereColor;
      context.fill();
      context.globalAlpha = isDark ? 0.35 : 0.25;
      context.strokeStyle = outlineColor;
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();
      context.globalAlpha = 1;

      if (landFeatures) {
        // Graticule grid
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = outlineColor;
        context.lineWidth = 0.5 * scaleFactor;
        context.globalAlpha = isDark ? 0.12 : 0.07;
        context.stroke();
        context.globalAlpha = 1;

        // Land outlines
        context.beginPath();
        landFeatures.features.forEach((f: any) => path(f));
        context.strokeStyle = outlineColor;
        context.lineWidth = 0.75 * scaleFactor;
        context.globalAlpha = isDark ? 0.4 : 0.18;
        context.stroke();
        context.globalAlpha = 1;

        // Halftone land dots in Onyx Blue
        allDots.forEach((dot) => {
          const p = projection([dot.lng, dot.lat]);
          if (p && p[0] >= 0 && p[0] <= containerWidth && p[1] >= 0 && p[1] <= containerHeight) {
            context.beginPath();
            context.arc(p[0], p[1], 1 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = "#0BBDF4";
            context.globalAlpha = isDark ? 0.55 : 0.75;
            context.fill();
            context.globalAlpha = 1;
          }
        });

        // Office pins — full blue + contrasting ring
        officeMarkers.forEach(([lng, lat]) => {
          const p = projection([lng, lat]);
          if (p) {
            context.beginPath();
            context.arc(p[0], p[1], 3.5 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = "#0BBDF4";
            context.fill();
            context.strokeStyle = pinRingColor;
            context.lineWidth = 1.5 * scaleFactor;
            context.stroke();
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const res = await fetch("/ne_110m_land.json", { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error("Failed to load land data");
        landFeatures = await res.json();
        generateDots();
        setIsLoading(false);
        render();
      } catch {
        setError("Failed to load globe data");
        setIsLoading(false);
      }
    };

    const rotation: [number, number] = [0, -10];
    let timer: any = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isAnimated = !prefersReduced;

    const startTimer = () => {
      if (isAnimated && !timer) {
        timer = d3.timer(() => {
          rotation[0] += 0.35;
          projection.rotate(rotation);
          render();
        });
      }
    };

    const stopTimer = () => {
      if (timer) {
        timer.stop();
        timer = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startTimer();
        else stopTimer();
      },
      { threshold: 0.05 }
    );

    // Re-render on theme class change
    const themeObserver = new MutationObserver(() => render());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    intersectionObserver.observe(canvas);
    loadWorldData();

    return () => {
      stopTimer();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [width, height]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl p-8 ${className}`}
        style={{ background: "var(--bg-card)" }}
      >
        <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
          Global presence map unavailable
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="w-12 h-12 rounded-full border-2 border-[#0BBDF4]/30 border-t-[#0BBDF4] animate-spin" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-2xl"
        aria-label="Interactive globe showing Onyx office locations"
        role="img"
      />
      <p className="mt-3 text-center text-xs" style={{ color: "var(--fg-subtle)" }}>
        Delivering from Lahore, Karachi &amp; Islamabad — serving clients across 4 continents.
      </p>
    </div>
  );
}
