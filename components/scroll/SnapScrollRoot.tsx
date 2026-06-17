"use client";

import { useEffect, useRef } from "react";
import { initSnapScroll } from "@/lib/snap-scroll";

export function SnapScrollRoot({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    return initSnapScroll(scroller);
  }, []);

  return (
    <div
      ref={scrollerRef}
      id="snap-scroll"
      className="no-scrollbar h-[100dvh] touch-pan-y overflow-hidden overscroll-y-contain"
    >
      <div className="snap-scroll-content no-scrollbar">{children}</div>
    </div>
  );
}
