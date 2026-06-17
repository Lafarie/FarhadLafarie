"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/gsap";

export function SectionRevealProvider({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const scroller = document.getElementById("snap-scroll");
    if (!scroller || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 85%",
            once: true,
          },
          y: 32,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
        });
      });
    }, rootRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
