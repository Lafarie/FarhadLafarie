"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { gsap, useGSAP, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { SITE } from "@/content/site";
import { scrollToSection } from "@/lib/snap-scroll";
import { cn } from "@/lib/utils";
import { CvChooser } from "@/components/ui/CvChooser";

export default function Navbar() {
  const shellRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>(SITE.nav[0]?.id ?? "featured");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const sections = useMemo(() => SITE.nav.map((item) => item.id), []);

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileOpen(false);
    scrollToSection(id);
  };

  const openCv = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setCvOpen(true);
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

  useEffect(() => {
    if (!cvOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cvOpen]);

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
        ".te-key-btn, .hardware-nav-btn, .sketch-nav-link",
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
        borderRadius: "10px",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.12)",
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
          maxWidth: "min(88vw, 880px)",
          marginTop: 10,
          borderRadius: "12px",
          boxShadow: "0 12px 30px -6px rgba(0, 0, 0, 0.2)",
          ease: "none",
        },
        0,
      );

      ScrollTrigger.refresh();
    },
    { scope: shellRef },
  );

  return (
    <>
      <header ref={shellRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 print:hidden">
        <nav ref={navRef} className="te-navbar-rack pointer-events-auto mx-auto w-full max-w-6xl">
          {/* Laser-Etched Metric Scale Bar */}
          <div
            className="te-ruler-scale hidden md:flex items-center justify-between px-4 py-0.5 font-mono text-[8px] font-bold tracking-[0.16em] text-zinc-500 select-none"
            aria-hidden="true"
          >
            <span>00MM</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span className="text-zinc-900 font-extrabold">50 // TE-FL WORKBENCH</span>
            <span>60</span>
            <span>70</span>
            <span>80</span>
            <span>90</span>
            <span>100MM</span>
          </div>

          <div className="relative mx-auto flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              style={{ color: "#1a1a1a", textDecoration: "none" }}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border-2 border-zinc-900 bg-white shadow-xs">
                <Image
                  src="/logo.png"
                  alt="Farhad Lafarie"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-cover"
                />
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-black tracking-wider text-zinc-900 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                  FARHAD LAFARIE
                </span>
                <span className="font-mono text-[9px] font-semibold tracking-widest text-zinc-500 uppercase">
                  TE-FL // REV.2026
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              <ul className="flex items-center gap-1.5">
                {SITE.nav.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={handleNav(item.id)}
                      data-active={activeSection === item.id ? "true" : undefined}
                      className="te-key-btn uppercase"
                    >
                      <span className="te-led-dot inline-block h-1.5 w-1.5 rounded-full bg-zinc-300 transition-colors" />
                      {String(index + 1).padStart(2, "0")} : {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={openCv}
                    className="te-key-btn uppercase font-extrabold text-orange-600 hover:text-orange-500"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
                    04 : CV
                  </button>
                </li>
              </ul>

              <div className="hidden lg:flex items-center pl-2.5 border-l border-zinc-300 gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9.5px] font-mono tracking-wider text-zinc-700 border border-zinc-300 bg-zinc-100 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYS: LIVE
                </span>
                <span className="text-[9.5px] font-mono text-zinc-500 font-semibold hidden xl:inline">
                  48kHz / 24-BIT
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white text-zinc-900 md:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        <div
          ref={menuRef}
          className="pointer-events-auto mx-auto mt-2 w-[calc(100%-1rem)] max-w-6xl rounded-xl border-2 border-zinc-900 bg-zinc-50/98 p-3 shadow-2xl backdrop-blur-md md:hidden"
          style={{ visibility: mobileOpen ? "visible" : "hidden", display: "block" }}
        >
          <div className="flex flex-col gap-1.5 font-mono">
            {SITE.nav.map((item, index) => (
              <a
                key={`mobile-${item.id}`}
                href={item.href}
                onClick={handleNav(item.id)}
                className={cn(
                  "rounded-lg px-3 py-2 text-xs font-bold tracking-wider transition border flex items-center justify-between",
                  activeSection === item.id
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white text-zinc-700 border-zinc-200",
                )}
              >
                <span>{String(index + 1).padStart(2, "0")} : {item.label.toUpperCase()}</span>
                {activeSection === item.id ? <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> : null}
              </a>
            ))}
            <button
              type="button"
              onClick={openCv}
              className="rounded-lg px-3 py-2 text-left text-xs font-bold tracking-wider text-orange-600 bg-orange-50 border border-orange-200"
            >
              04 : CV DOSSIER (DEVOPS &amp; DEV)
            </button>
          </div>
        </div>
      </header>

      <CvChooser open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
