"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { gsap, useGSAP, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { SITE } from "@/content/site";
import { scrollToSection } from "@/lib/snap-scroll";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const shellRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>(SITE.nav[0]?.id ?? "featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = useMemo(() => SITE.nav.map((item) => item.id), []);

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileOpen(false);
    scrollToSection(id);
  };

  useEffect(() => {
    const scroller = document.getElementById("snap-scroll");
    if (!scroller) return;

    const onScroll = () => {
      const scorer = sections
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return { id, score: Number.MAX_SAFE_INTEGER };
          const rect = el.getBoundingClientRect();
          return { id, score: Math.abs(rect.top - 120) };
        })
        .sort((a, b) => a.score - b.score)[0];

      if (scorer) setActiveSection(scorer.id);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [sections]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const shell = shellRef.current;
      if (!shell) return;
      gsap.from(shell, {
        y: -18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".sketch-nav-link",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, delay: 0.1, ease: "power2.out" },
      );
    },
    { scope: shellRef },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const menu = menuRef.current;
      if (!menu) return;
      if (mobileOpen) {
        gsap.fromTo(
          menu,
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.26, ease: "power2.out" },
        );
        return;
      }
      gsap.to(menu, { autoAlpha: 0, y: -10, duration: 0.2, ease: "power2.in" });
    },
    { dependencies: [mobileOpen], scope: shellRef },
  );

  useGSAP(
    () => {
      const scroller = document.getElementById("snap-scroll");
      const nav = navRef.current;
      if (!scroller || !nav || prefersReducedMotion() || window.innerWidth < 768) return;

      gsap.set(nav, {
        maxWidth: "min(96vw, 1180px)",
        marginTop: 0,
        borderRadius: "18px 24px 16px 22px / 14px 20px 18px 16px",
        boxShadow: "0 2px 0 rgba(0, 0, 0, 0.15)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "portfolio-nav-morph",
          scroller,
          trigger: scroller,
          start: "top top",
          end: "+=220",
          scrub: 0.65,
        },
      });

      tl.to(
        nav,
        {
          maxWidth: "min(86vw, 860px)",
          marginTop: 10,
          borderRadius: "999px",
          boxShadow: "0 6px 0 rgba(0, 0, 0, 0.16)",
          ease: "none",
        },
        0,
      );

      ScrollTrigger.refresh();
    },
    { scope: shellRef },
  );

  return (
    <header ref={shellRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 print:hidden">
      <nav ref={navRef} className="low-poly-nav pointer-events-auto mx-auto w-full max-w-6xl">
        <div className="relative mx-auto flex items-center justify-between px-3 py-3 sm:px-4">
          <Link href="/" className="inline-flex items-center gap-2" style={{ color: "#1a1a1a", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.02em" }}>
            <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface">
              <Image src="/logo.png" alt="Farhad Lafarie" width={32} height={32} className="h-8 w-8 object-cover" />
            </span>
            <span className="hidden sm:inline" style={{ color: "#1a1a1a" }}>{SITE.meta.name}</span>
            <span className="sm:hidden" style={{ color: "#1a1a1a" }}>Farhad</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {SITE.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={handleNav(item.id)}
                  data-active={activeSection === item.id ? "true" : undefined}
                  style={{ color: activeSection === item.id ? "#1a1a1a" : "#555555" }}
                  className={cn(
                    "sketch-nav-link rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition",
                    activeSection === item.id ? "border border-line-strong bg-surface" : "",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={SITE.meta.cvUrl} download className="low-poly-chip text-xs font-semibold" style={{ color: "#1a1a1a" }}>
                CV
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line md:hidden"
            style={{ color: "#1a1a1a" }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="pointer-events-auto mx-auto mt-2 w-[calc(100%-1rem)] max-w-6xl rounded-2xl border border-line bg-surface/95 p-2 shadow-lg md:hidden"
        style={{ visibility: mobileOpen ? "visible" : "hidden", display: "block" }}
      >
        <div className="flex flex-col gap-1">
          {SITE.nav.map((item) => (
            <a
              key={`mobile-${item.id}`}
              href={item.href}
              onClick={handleNav(item.id)}
              style={{ color: activeSection === item.id ? "#1a1a1a" : "#555555" }}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold",
                activeSection === item.id ? "bg-base" : "",
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
