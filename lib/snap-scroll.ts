import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToSection(id: string, headerOffset = 0) {
  const scroller = document.getElementById("snap-scroll");
  const target = document.getElementById(id);
  if (!scroller || !target) return;

  const scrollerTop = scroller.getBoundingClientRect().top;
  const targetTop = target.getBoundingClientRect().top;
  const top = targetTop - scrollerTop + scroller.scrollTop - headerOffset;

  const instance = getLenis();
  if (instance) {
    instance.scrollTo(top, {
      duration: 0.85,
      easing: (t) => 1 - (1 - t) ** 3,
    });
    return;
  }

  scroller.scrollTo({ top, behavior: "smooth" });
}

function bindScrollerProxy(scroller: HTMLElement) {
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value?: number) {
      if (value !== undefined) scroller.scrollTop = value;
      return scroller.scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: scroller.clientWidth,
        height: scroller.clientHeight,
      };
    },
  });
}

export function initSnapScroll(scroller: HTMLElement): () => void {
  const content = scroller.querySelector<HTMLElement>(".snap-scroll-content");
  if (!content) return () => {};

  const sections = gsap.utils.toArray<HTMLElement>(".snap-section", content);

  if (prefersReducedMotion()) {
    scroller.classList.remove("overflow-hidden");
    scroller.classList.add("overflow-y-auto", "snap-y", "snap-mandatory");
    sections.forEach((section) => section.classList.add("snap-start"));
    bindScrollerProxy(scroller);
    ScrollTrigger.refresh();
    return () => ScrollTrigger.scrollerProxy(scroller);
  }

  lenis = new Lenis({
    wrapper: scroller,
    content,
    lerp: 0.14,
    smoothWheel: true,
    syncTouch: true,
    syncTouchLerp: 0.12,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value?: number) {
      if (value !== undefined && lenis) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis?.animatedScroll ?? scroller.scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: scroller.clientWidth,
        height: scroller.clientHeight,
      };
    },
    pinType: "transform",
  });

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      scroller,
      start: "top top",
      end: "bottom top",
      snap: {
        snapTo: 1,
        duration: { min: 0.25, max: 0.55 },
        delay: 0.05,
        ease: "power2.out",
      },
    });
  });

  const onTick = (time: number) => {
    lenis?.raf(time * 1000);
  };

  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  const onRefresh = () => lenis?.resize();
  ScrollTrigger.addEventListener("refresh", onRefresh);
  ScrollTrigger.refresh();

  return () => {
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    gsap.ticker.remove(onTick);
    ScrollTrigger.getAll().forEach((st) => st.kill());
    ScrollTrigger.scrollerProxy(scroller);
    lenis?.destroy();
    lenis = null;
  };
}
