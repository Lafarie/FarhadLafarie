"use client";

import { useMode } from "@/context/ModeContext";

const MODE_POLY: Record<string, { a: string; b: string; c: string; d: string }> = {
  devops: { a: "#f4f6f0", b: "#ebece5", c: "#dde0d8", d: "#4a4a4a" },
  developer: { a: "#f7f7f2", b: "#ecece4", c: "#e2e2d9", d: "#3f3f3f" },
  "content-creator": { a: "#f9f6ef", b: "#efebe3", c: "#e7e1d7", d: "#505050" },
};

export function LowPolyBackground() {
  const { mode } = useMode();
  const colors = MODE_POLY[mode] ?? MODE_POLY.developer;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="1440" height="900" fill={colors.a} />
        <polygon points="0,0 480,0 0,420" fill={colors.b} opacity="0.85" />
        <polygon points="480,0 960,0 720,320 240,300" fill={colors.c} opacity="0.7" />
        <polygon points="960,0 1440,0 1440,360 720,320" fill={colors.b} opacity="0.8" />
        <polygon points="0,420 240,300 720,320 380,640 0,900" fill={colors.c} opacity="0.55" />
        <polygon points="720,320 1440,360 1440,900 380,640" fill={colors.b} opacity="0.65" />
        <line x1="240" y1="300" x2="720" y2="320" stroke={colors.d} strokeWidth="1.2" opacity="0.2" />
        <line x1="720" y1="320" x2="380" y2="640" stroke={colors.d} strokeWidth="1.2" opacity="0.15" />
        <line x1="720" y1="320" x2="1120" y2="500" stroke={colors.d} strokeWidth="1.2" opacity="0.15" />
      </svg>
    </div>
  );
}
