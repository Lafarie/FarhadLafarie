"use client";

import {
  Atom,
  Boxes,
  Code2,
  ExternalLink,
  Globe,
  Layers,
  Shield,
  TestTube2,
  Wind,
  Zap,
  Database,
  Terminal,
  Cloud,
  Activity,
  Cpu,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { STACK_CATEGORIES } from "@/content/showcase-stack";
import { SITE } from "@/content/site";
import type { ShowcaseStackCategory } from "@/content/showcase-stack-types";
import { cn } from "@/lib/utils";

const ACCENT: Record<
  ShowcaseStackCategory["accent"],
  { ring: string; pill: string; dot: string }
> = {
  grape: {
    ring: "from-grape/40 via-grape/10 to-transparent",
    pill: "border-grape/25 bg-grape/10 text-grape",
    dot: "bg-grape",
  },
  saffron: {
    ring: "from-saffron/40 via-saffron/10 to-transparent",
    pill: "border-saffron/25 bg-saffron/10 text-saffron",
    dot: "bg-saffron",
  },
  leaf: {
    ring: "from-leaf/40 via-leaf/10 to-transparent",
    pill: "border-leaf/25 bg-leaf/10 text-leaf",
    dot: "bg-leaf",
  },
};

function iconForStackItem(name: string): LucideIcon {
  const key = name.toLowerCase();
  if (key.includes("next")) return Layers;
  if (key.includes("react")) return Atom;
  if (key.includes("typescript") || key.includes("javascript")) return Code2;
  if (key.includes("tailwind")) return Wind;
  if (key.includes("docker") || key.includes("kubernetes")) return Boxes;
  if (key.includes("gitlab") || key.includes("actions") || key.includes("git")) return Shield;
  if (key.includes("gsap") || key.includes("framer") || key.includes("lenis") || key.includes("roughjs")) return Zap;
  if (key.includes("vitest")) return TestTube2;
  if (key.includes("vercel") || key.includes("cursor")) return Globe;
  if (key.includes("postgres") || key.includes("mysql") || key.includes("mongo") || key.includes("prisma") || key.includes("database")) return Database;
  if (key.includes("python") || key.includes("bash") || key.includes("shell") || key.includes("terminal")) return Terminal;
  if (key.includes("aws") || key.includes("ec2") || key.includes("cloud")) return Cloud;
  if (key.includes("sentry") || key.includes("grafana") || key.includes("monitor")) return Activity;
  if (key.includes("wordpress") || key.includes("php")) return Monitor;
  if (key.includes("node") || key.includes("fastapi") || key.includes("express") || key.includes("jax-rs") || key.includes("ansible") || key.includes("apache") || key.includes("java")) return Cpu;
  return Code2;
}

function StackCategoryCard({ category }: { category: ShowcaseStackCategory }) {
  const styles = ACCENT[category.accent];

  return (
    <article className="low-poly-card relative overflow-hidden p-5">
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl",
          styles.ring,
        )}
      />
      <header className="relative mb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
          {category.subtitle}
        </p>
        <h3 className="mt-1 flex items-center gap-2 text-lg font-semibold text-ink">
          <span className={cn("h-2 w-2 rounded-full", styles.dot)} />
          {category.title}
        </h3>
      </header>
      <ul className="relative space-y-2">
        {category.items.map((item) => {
          const Icon = iconForStackItem(item.name);
          const inner = (
            <>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border",
                  styles.pill,
                )}
              >
                <Icon size={14} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 text-left">
                <span className="block truncate text-sm font-semibold text-ink">
                  {item.name}
                </span>
                {item.detail ? (
                  <span className="block truncate text-[11px] text-ink-faint">
                    {item.detail}
                  </span>
                ) : null}
              </span>
              {item.href ? (
                <ExternalLink size={12} className="ml-auto shrink-0 text-ink-faint" />
              ) : null}
            </>
          );

          const className =
            "group flex w-full items-center gap-3 rounded-xl border border-line/70 bg-white/[0.02] px-3 py-2.5";

          return (
            <li key={item.name}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <div className={className}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function StackSection() {
  const [core, devops, motion, platform] = STACK_CATEGORIES;

  return (
    <section
      id="stack"
      className="snap-section flex min-h-[100dvh] flex-col justify-center border-t border-line/40 px-6 py-24"
    >
      <div className="section-reveal mx-auto w-full max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-saffron">
          [ {SITE.stack.label} ]
        </p>
        <h2 className="low-poly-heading mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {SITE.stack.title}
        </h2>
        <p className="mt-4 max-w-2xl text-ink-dim">{SITE.stack.intro}</p>

        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <StackCategoryCard category={core} />
          </div>
          <div className="lg:col-span-5">
            <StackCategoryCard category={devops} />
          </div>
          <div className="lg:col-span-4">
            <StackCategoryCard category={motion} />
          </div>
          <div className="lg:col-span-8">
            <StackCategoryCard category={platform} />
          </div>
        </div>
      </div>
    </section>
  );
}
