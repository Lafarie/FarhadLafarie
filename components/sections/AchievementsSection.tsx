"use client";

import { useMemo, useState } from "react";
import {
  Trophy,
  Award,
  Sparkles,
  Code2,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  ExternalLink,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { ACHIEVEMENTS, type Achievement, type AchievementCategory } from "@/content/achievements";
import { cn } from "@/lib/utils";

const CATEGORY_TABS: { id: AchievementCategory; label: string; count: number }[] = [
  { id: "all", label: "ALL", count: ACHIEVEMENTS.length },
  {
    id: "award",
    label: "AWARDS & HONORS",
    count: ACHIEVEMENTS.filter((a) => a.category === "award").length,
  },
  {
    id: "hackathon",
    label: "HACKATHONS",
    count: ACHIEVEMENTS.filter((a) => a.category === "hackathon").length,
  },
  {
    id: "certification",
    label: "CERTIFICATIONS",
    count: ACHIEVEMENTS.filter((a) => a.category === "certification").length,
  },
  {
    id: "community",
    label: "COMMUNITY",
    count: ACHIEVEMENTS.filter((a) => a.category === "community").length,
  },
];

function getCategoryIcon(achievement: Achievement): LucideIcon {
  if (achievement.category === "award") {
    if (achievement.id.includes("nasa")) return Trophy;
    if (achievement.id.includes("kapruka")) return Sparkles;
    return Award;
  }
  if (achievement.category === "hackathon") {
    return Code2;
  }
  if (achievement.category === "certification") {
    if (achievement.id.includes("azure")) return ShieldCheck;
    return CheckCircle2;
  }
  return HeartHandshake;
}

function getCategoryStyles(category: Achievement["category"]) {
  switch (category) {
    case "award":
      return {
        badgeBorder: "border-amber-400/30 bg-amber-400/10 text-amber-600 dark:text-amber-400",
        ring: "from-amber-400/30 via-amber-400/5 to-transparent",
        dot: "bg-amber-500",
        iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
      };
    case "hackathon":
      return {
        badgeBorder: "border-purple-400/30 bg-purple-400/10 text-purple-600 dark:text-purple-400",
        ring: "from-purple-400/30 via-purple-400/5 to-transparent",
        dot: "bg-purple-500",
        iconBg: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
      };
    case "certification":
      return {
        badgeBorder: "border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-400",
        ring: "from-emerald-400/30 via-emerald-400/5 to-transparent",
        dot: "bg-emerald-500",
        iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
      };
    case "community":
    default:
      return {
        badgeBorder: "border-sky-400/30 bg-sky-400/10 text-sky-600 dark:text-sky-400",
        ring: "from-sky-400/30 via-sky-400/5 to-transparent",
        dot: "bg-sky-500",
        iconBg: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
      };
  }
}

export function AchievementsSection() {
  const [activeTab, setActiveTab] = useState<AchievementCategory>("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") return ACHIEVEMENTS;
    return ACHIEVEMENTS.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <section
      id="achievements"
      className="snap-section flex min-h-[100dvh] flex-col justify-start border-t border-line/40 px-6 pb-28 pt-28"
    >
      <div className="section-reveal mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-saffron">
            [ 03 // VERIFIED CREDENTIALS &amp; HONORS ]
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="low-poly-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Awards &amp; Certifications
              </h2>
              <p className="mt-2 max-w-2xl text-ink-dim text-sm sm:text-base">
                A documented record of competitive hackathons, global recognitions,
                professional cloud certifications, and community service initiatives.
              </p>
            </div>

            {/* Hardware Telemetry Counters */}
            <div className="hidden lg:grid grid-cols-4 gap-2 font-mono text-[10px] bg-surface/80 p-2.5 rounded-lg border border-line/60 shrink-0">
              <div className="px-2 border-r border-line/50">
                <span className="block text-ink-faint font-semibold">AWARDS</span>
                <span className="font-extrabold text-amber-500 text-xs">
                  {String(ACHIEVEMENTS.filter((a) => a.category === "award").length).padStart(2, "0")}
                </span>
              </div>
              <div className="px-2 border-r border-line/50">
                <span className="block text-ink-faint font-semibold">HACKS</span>
                <span className="font-extrabold text-purple-500 text-xs">
                  {String(ACHIEVEMENTS.filter((a) => a.category === "hackathon").length).padStart(2, "0")}
                </span>
              </div>
              <div className="px-2 border-r border-line/50">
                <span className="block text-ink-faint font-semibold">CERTS</span>
                <span className="font-extrabold text-emerald-500 text-xs">
                  {String(ACHIEVEMENTS.filter((a) => a.category === "certification").length).padStart(2, "0")}
                </span>
              </div>
              <div className="px-2">
                <span className="block text-ink-faint font-semibold">VOLUNTEER</span>
                <span className="font-extrabold text-sky-500 text-xs">
                  {String(ACHIEVEMENTS.filter((a) => a.category === "community").length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200",
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900 dark:bg-white dark:text-zinc-900"
                    : "border border-line bg-surface/70 text-ink-dim hover:bg-surface hover:text-ink",
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.2 font-mono text-[10px] font-extrabold",
                    isActive
                      ? "bg-orange-500 text-white"
                      : "bg-surface-elevated text-ink-faint",
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Achievements Compact Box List */}
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filtered.map((item) => {
            const Icon = getCategoryIcon(item);
            const style = getCategoryStyles(item.category);

            return (
              <li
                key={item.id}
                className="low-poly-card group relative flex items-center justify-between gap-3 overflow-hidden px-3.5 py-2.5 sm:px-4 sm:py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                {/* Subtle radial ambient glow on hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-30 blur-xl transition-opacity group-hover:opacity-60",
                    style.ring,
                  )}
                />

                <div className="flex min-w-0 flex-1 items-center gap-3">
                  {/* Category Icon */}
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line/60 shadow-2xs transition-transform group-hover:scale-105",
                      style.iconBg,
                    )}
                  >
                    <Icon size={15} strokeWidth={2.2} />
                  </span>

                  {/* Title & Organization / Key Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-sans text-xs font-bold text-ink sm:text-sm">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-orange-500 transition-colors"
                          >
                            <span className="truncate">{item.title}</span>
                            <ExternalLink size={11} className="shrink-0 opacity-60" />
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                    </div>
                    <p className="truncate font-mono text-[10px] text-ink-faint sm:text-[11px]">
                      <span>{item.organization}</span>
                      {item.tags.length > 0 && (
                        <>
                          <span className="mx-1.5 opacity-30">/</span>
                          <span className="text-ink-dim">{item.tags.slice(0, 2).join(" · ")}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right: Badge Pill + Year */}
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-wider",
                      style.badgeBorder,
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", style.dot)} />
                    <span className="hidden sm:inline">{item.badge}</span>
                    <span className="sm:hidden">{item.badge.split(" ")[0]}</span>
                  </span>
                  <span className="font-mono text-[11px] font-bold text-ink-faint sm:text-xs">
                    {item.year}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
