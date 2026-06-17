"use client";

import type { CSSProperties } from "react";
import { SITE } from "@/content/site";
import { useMode } from "@/context/ModeContext";
import { LowPolyBackground } from "@/components/background/LowPolyBackground";
import { ModePersonImage } from "./ModePersonImage";
import { ModeTabs } from "./ModeTabs";
import { cn } from "@/lib/utils";

export function FeaturedSection() {
  const { modeConfig } = useMode();

  return (
    <section
      id="featured"
      className={cn(
        "snap-section relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-12 pt-24",
        "mode-bg transition-colors duration-500",
      )}
      style={
        {
          "--mode-base": modeConfig.theme.base,
          "--mode-accent": modeConfig.theme.accent,
          "--mode-surface": modeConfig.theme.surface,
        } as CSSProperties
      }
    >
      <LowPolyBackground />

      <div className="section-reveal relative z-10 flex w-full max-w-lg flex-col items-center gap-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink-faint">
          {SITE.hero.modeEyebrow}
        </p>

        <ModeTabs />

        <ModePersonImage />

        <div className="low-poly-panel max-w-md p-6 text-center">
          <h1 className="low-poly-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {modeConfig.tagline}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-ink-dim">{modeConfig.intro}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {modeConfig.highlights.map((line) => (
              <li key={line} className="low-poly-chip">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
