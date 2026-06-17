"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import type { ShowcaseAuthorLink } from "@/content/showcase-stack-types";
import { prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function AuthorLinkIcon({ kind }: { kind: ShowcaseAuthorLink["kind"] }) {
  if (kind === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] fill-current">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  }
  return <Globe size={18} />;
}

function SocialLinkButton({ link }: { link: ShowcaseAuthorLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-base/90 px-4 py-2.5 text-sm font-semibold text-ink",
        link.kind === "linkedin" && "hover:text-[#0A66C2]",
      )}
    >
      <AuthorLinkIcon kind={link.kind} />
      {link.label}
    </a>
  );
}

function SocialOrbitPlanet({ link }: { link: ShowcaseAuthorLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      title={link.label}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-base/75 shadow-lg",
        link.kind === "linkedin" && "text-[#0A66C2]",
        link.kind === "website" && "text-saffron",
      )}
    >
      <AuthorLinkIcon kind={link.kind} />
    </a>
  );
}

const ORBIT_ELLIPSE_RATIO = 0.18;

function ellipseKeyframeCss(radius: number): string {
  const a = radius;
  const b = radius * ORBIT_ELLIPSE_RATIO;
  const steps = 16;
  const frames: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const pct = ((i / steps) * 100).toFixed(2);
    const rad = (i / steps) * 2 * Math.PI;
    frames.push(
      `${pct}% { transform: translate(-50%, -50%) translate(${(a * Math.cos(rad)).toFixed(2)}px, ${(b * Math.sin(rad)).toFixed(2)}px); }`,
    );
  }
  return `@keyframes showcase-ellipse-${radius} {\n${frames.join("\n")}\n}`;
}

const SOCIAL_ORBITS = [
  { kind: "linkedin" as const, tilt: 0, radius: 106, duration: 22, delay: 0, pathTone: "grape" as const },
  { kind: "github" as const, tilt: 60, radius: 84, duration: 14, delay: -5, pathTone: "primary" as const },
  { kind: "website" as const, tilt: -58, radius: 62, duration: 10, delay: -2, pathTone: "saffron" as const },
];

function OrbitPath({
  radius,
  tone,
}: {
  radius: number;
  tone: "grape" | "saffron" | "primary";
}) {
  const ry = radius * ORBIT_ELLIPSE_RATIO;
  const stroke =
    tone === "grape"
      ? "rgba(139, 77, 196, 0.35)"
      : tone === "saffron"
        ? "rgba(255, 190, 11, 0.28)"
        : "rgba(107, 45, 145, 0.35)";
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 overflow-visible"
      width={radius * 2}
      height={ry * 2}
      viewBox={`${-radius} ${-ry} ${radius * 2} ${ry * 2}`}
      style={{ transform: "translate(-50%, -50%)" }}
      aria-hidden
    >
      <ellipse cx={0} cy={0} rx={radius} ry={ry} fill="none" stroke={stroke} strokeWidth={1} strokeDasharray="5 4" />
    </svg>
  );
}

export function SocialOrbit({ links }: { links: ShowcaseAuthorLink[] }) {
  const reducedMotion = prefersReducedMotion();
  const [paused, setPaused] = useState(false);

  const orbitLinks = SOCIAL_ORBITS.map((orbit) => {
    const link = links.find((entry) => entry.kind === orbit.kind);
    return link ? { ...orbit, link } : null;
  }).filter(Boolean) as Array<(typeof SOCIAL_ORBITS)[number] & { link: ShowcaseAuthorLink }>;

  if (orbitLinks.length === 0 || reducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <SocialLinkButton key={link.href} link={link} />
        ))}
      </div>
    );
  }

  const radii = [...new Set(SOCIAL_ORBITS.map((o) => o.radius))];
  const css = radii.map((r) => ellipseKeyframeCss(r)).join("\n");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={cn(
          "showcase-solar group relative mx-auto h-[280px] w-[300px] cursor-pointer",
          paused && "is-paused",
        )}
        role="button"
        tabIndex={0}
        aria-label={paused ? "Social links paused" : "Social links orbiting"}
        onClick={() => setPaused((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPaused((v) => !v);
          }
        }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="showcase-sun-corona absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,190,11,0.22)_0%,rgba(139,77,196,0.08)_45%,transparent_70%)] blur-md" />
          <div className="showcase-sun-core absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-saffron/50 bg-gradient-to-br from-saffron via-gold-light to-grape">
            <span className="relative h-3.5 w-3.5 rounded-full bg-white/95" />
          </div>
        </div>
        {orbitLinks.map((orbit) => (
          <div
            key={orbit.link.href}
            className="pointer-events-none absolute inset-0"
            style={{ transform: `rotate(${orbit.tilt}deg)` }}
          >
            <OrbitPath radius={orbit.radius} tone={orbit.pathTone} />
            <div
              className="showcase-orbit-planet pointer-events-auto absolute left-1/2 top-1/2 z-10"
              style={{
                animation: `showcase-ellipse-${orbit.radius} ${orbit.duration}s linear infinite`,
                animationDelay: `${orbit.delay}s`,
              }}
            >
              <div style={{ transform: `rotate(${-orbit.tilt}deg)` }}>
                <SocialOrbitPlanet link={orbit.link} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
