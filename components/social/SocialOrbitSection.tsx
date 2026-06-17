"use client";

import { SITE } from "@/content/site";
import type { ShowcaseAuthorLink } from "@/content/showcase-stack-types";
import { SocialOrbit } from "./SocialOrbit";

const ORBIT_LINKS: ShowcaseAuthorLink[] = SITE.social
  .filter((s) => ["linkedin", "github", "website"].includes(s.kind))
  .map((s) => ({
    label: s.label,
    href: s.href,
    kind: s.kind as ShowcaseAuthorLink["kind"],
  }));

export function SocialOrbitSection() {
  const initials = SITE.meta.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <section
      id="social"
      className="snap-section flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24"
    >
      <div className="section-reveal mx-auto flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:justify-between">
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-saffron">
            Connect
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">{SITE.meta.name}</h2>
          <p className="mt-2 text-sm text-ink-dim">
            {SITE.meta.jobTitles.join(" · ")}
          </p>
          <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface text-xl font-bold text-ink">
            {initials}
          </div>
        </div>
        <SocialOrbit links={ORBIT_LINKS} />
      </div>
    </section>
  );
}
