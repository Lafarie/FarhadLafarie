"use client";

import type { CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";
import { useMode } from "@/context/ModeContext";
import { LowPolyBackground } from "@/components/background/LowPolyBackground";
import { ModePersonImage } from "./ModePersonImage";
import { ModeTabs } from "./ModeTabs";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function FeaturedSection() {
  const { modeConfig } = useMode();
  const sectionRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const onPointerLeave = useCallback(() => {
    setSpot((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className={cn(
        "snap-section relative flex min-h-[100dvh] flex-col items-center justify-center",
        "px-4 pb-12 pt-24 sm:px-8 md:px-12",
        "mode-bg transition-colors duration-500",
      )}
      style={
        {
          "--mode-base": modeConfig.theme.base,
          "--mode-accent": modeConfig.theme.accent,
          "--mode-surface": modeConfig.theme.surface,
        } as CSSProperties
      }
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <LowPolyBackground spotX={spot.x} spotY={spot.y} active={spot.active} />

      <div className="section-reveal relative isolate z-20 flex w-full max-w-5xl flex-col items-center gap-6">

        {/* Mode Tabs */}
        <ModeTabs />

        {/* Side-by-side on lg+, stacked on mobile */}
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-0">

          {/* Character Image — full width on mobile, fixed width on desktop */}
          <div className="w-full max-w-[280px] shrink-0 sm:max-w-[300px] lg:w-[260px] lg:max-w-none xl:w-[300px]">
            <ModePersonImage />
          </div>

          {/* Divider spacing — visible only on desktop as a gap */}
          <div className="hidden lg:block lg:w-8 xl:w-10 shrink-0" />

          {/* Detail Card — fade only, no y-shift */}
          <AnimatePresence mode="wait">
            <motion.div
              key={modeConfig.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="low-poly-panel w-full flex-1 p-6 text-left sm:p-8 lg:p-8"
            >
              <h1 className="low-poly-heading text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-3xl">
                {modeConfig.tagline}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-ink-dim sm:text-base">
                {modeConfig.intro}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {modeConfig.highlights.map((line) => (
                  <li key={line} className="low-poly-chip">
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
