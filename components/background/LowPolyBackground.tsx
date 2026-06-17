"use client";

import { useMode } from "@/context/ModeContext";

const MODE_POLY: Record<string, { a: string; b: string; c: string; d: string }> = {
  devops: {
    a: "#0b1214",
    b: "#12201e",
    c: "#1a3d35",
    d: "#2fd6a6",
  },
  developer: {
    a: "#0f0b14",
    b: "#1a1326",
    c: "#2a1f42",
    d: "#8b4dc4",
  },
  "content-creator": {
    a: "#140f0b",
    b: "#261a18",
    c: "#3d2228",
    d: "#ff6b9d",
  },
};

export function LowPolyBackground() {
  const { mode } = useMode();
  const colors = MODE_POLY[mode] ?? MODE_POLY.developer;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="900" fill={colors.a} />
        <polygon points="0,0 480,0 0,400" fill={colors.b} opacity="0.9" />
        <polygon points="480,0 960,0 720,320 240,280" fill={colors.c} opacity="0.55" />
        <polygon points="960,0 1440,0 1440,360 720,320" fill={colors.b} opacity="0.7" />
        <polygon points="0,400 240,280 720,320 360,620 0,900" fill={colors.c} opacity="0.4" />
        <polygon points="720,320 1440,360 1440,900 360,620" fill={colors.b} opacity="0.5" />
        <polygon points="360,620 720,320 1080,500 720,900" fill={colors.d} opacity="0.12" />
        <polygon points="1080,500 1440,360 1440,700 1200,900" fill={colors.d} opacity="0.08" />
        <polygon points="240,280 480,0 720,320" fill={colors.d} opacity="0.06" />
        <line x1="240" y1="280" x2="720" y2="320" stroke={colors.d} strokeWidth="1" opacity="0.15" />
        <line x1="720" y1="320" x2="360" y2="620" stroke={colors.d} strokeWidth="1" opacity="0.12" />
        <line x1="720" y1="320" x2="1080" y2="500" stroke={colors.d} strokeWidth="1" opacity="0.12" />
        <line x1="360" y1="620" x2="1080" y2="500" stroke={colors.d} strokeWidth="1" opacity="0.1" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-base)_100%)] opacity-60" />
    </div>
  );
}
