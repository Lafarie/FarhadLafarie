"use client";

import type { CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";
import { useMode } from "@/context/ModeContext";
import { LowPolyBackground } from "@/components/background/LowPolyBackground";
import { ModePersonImage } from "./ModePersonImage";
import { CvChooser } from "@/components/ui/CvChooser";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function FeaturedSection() {
  const { modeConfig } = useMode();
  const sectionRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });
  const [cvOpen, setCvOpen] = useState(false);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const onPointerLeave = useCallback(() => {
    setSpot((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <>
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

        <div className="section-reveal relative isolate z-20 flex w-full max-w-6xl flex-col items-center">
          {/* Side-by-side on lg+, stacked on mobile */}
          <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-8">
            {/* Left Column: Teenage Engineering Hardware System Console */}
            <div className="w-full max-w-[320px] shrink-0 sm:max-w-[340px] lg:w-[320px] lg:max-w-none xl:w-[360px]">
              <ModePersonImage />
            </div>

            {/* Right Column: Architect's Field Dossier & Clipboard */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="field-dossier-clipboard w-full flex-1 p-6 text-left sm:p-8 lg:p-10 flex flex-col justify-between"
            >
              <div>
                {/* Technical Title Block & Rubber Stamp Seal */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-900 pb-3 mb-5 font-mono text-[9.5px] font-black text-zinc-600 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    <span>FARHAD LAFARIE // FULL-STACK &amp; DEVOPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rubber-stamp-seal">AVAILABLE 2026</span>
                    <span className="hidden sm:inline text-zinc-400 font-bold">
                      DOC: FL-SYS26
                    </span>
                  </div>
                </div>

                {/* Bold Confident Statement */}
                <h1 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl font-sans leading-tight">
                  Architecting cloud infrastructure. Building modern web platforms. Crafting visual stories.
                </h1>

                {/* Hardware Telemetry Parameter Readout Grid */}
                <div className="my-5 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[10px] bg-zinc-100/90 p-3 rounded-lg border-2 border-zinc-900 shadow-2xs">
                  <div>
                    <span className="block text-zinc-500 font-bold">PRIMARY FOCUS</span>
                    <span className="font-extrabold text-zinc-900">DEVOPS &amp; FULL-STACK</span>
                  </div>
                  <div>
                    <span className="block text-zinc-500 font-bold">BASE LOCATION</span>
                    <span className="font-extrabold text-zinc-900">06°55&apos;N 79°51&apos;E</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="block text-zinc-500 font-bold">STATUS</span>
                    <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      OPEN FOR HIRE
                    </span>
                  </div>
                </div>

                {/* High-Contrast Description Copy */}
                <p className="text-sm leading-relaxed text-zinc-700 font-medium sm:text-base font-sans">
                  Experienced software engineering undergraduate specializing in CI/CD automation, cloud-native deployments, and responsive full-stack applications. Merging engineering precision with digital media and visual storytelling.
                </p>

                {/* 3D Embossed Dymo Tape Labels */}
                <div className="mt-5">
                  <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2.5">
                    CORE STACK &amp; SPECIALTIES
                  </span>
                  <ul className="flex flex-wrap gap-2">
                    {[
                      "Next.js 16 & React 19",
                      "Docker & Kubernetes",
                      "TypeScript & Node",
                      "GitLab CI/CD",
                      "PostgreSQL & Redis",
                      "4K Video & Storytelling",
                      "Unity Game Dev",
                    ].map((line) => (
                      <li key={line} className="dymo-embossed-tape">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-5 border-t border-zinc-200 flex flex-wrap items-center gap-3 font-mono">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-zinc-800 transition transform active:scale-98"
                >
                  EXPLORE PROJECTS ↘
                </a>
                <button
                  type="button"
                  onClick={() => setCvOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-orange-600 transition transform active:scale-98"
                >
                  VIEW DUAL CV 📄
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-zinc-900 border-2 border-zinc-900 text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-zinc-100 transition transform active:scale-98"
                >
                  TRANSMIT MESSAGE ✉
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CV Chooser Modal */}
      <CvChooser open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
