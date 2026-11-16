"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useVibe } from "@/context/VibeContext";
import { cn } from "@/lib/utils";

type Props = { spotX?: number; spotY?: number; active?: boolean };

type CubeSlot = { id: string; x: number; y: number; zIndex: number };

type CubeCache = {
  element: HTMLElement;
  centerX: number;
  centerY: number;
  isReset?: boolean;
  lastLift?: number;
};

function buildCubeGrid(width: number, height: number, scaleUnit: number): CubeSlot[] {
  const xStep = scaleUnit * 16.9;
  const yStep = scaleUnit * 6.4;
  const cols = Math.ceil(width / xStep) + 2;
  const rows = Math.ceil(height / yStep) + 3;
  const slots: CubeSlot[] = [];

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      let x = c * xStep;
      if (r % 2 !== 0) x += xStep / 2;
      slots.push({
        id: `${r}-${c}`,
        x,
        y: r * yStep,
        // depth among cubes only - capped so rows never beat page content
        zIndex: Math.min(r + 2, 8),
      });
    }
  }
  return slots;
}

// Fast distance utility using direct sqrt instead of Math.hypot
function fastHypot(dx: number, dy: number): number {
  return Math.sqrt(dx * dx + dy * dy);
}

function resetCube(el: HTMLElement) {
  el.style.transform = "";
  el.style.filter = "";
  el.style.removeProperty("--sheen-offset");
}

function cleanCubes(cubes: CubeCache[]) {
  cubes.forEach((c) => {
    resetCube(c.element);
    c.isReset = true;
    c.lastLift = 0;
  });
}

function getEffectForPoint(cube: CubeCache, x: number, y: number, radius: number, maxLift: number) {
  const dx = x - cube.centerX;
  const dy = y - cube.centerY;
  const dist = fastHypot(dx, dy);

  if (dist >= radius) return { lift: 0, ease: 0 };

  const factor = 1 - dist / radius;
  const ease = factor * factor * (3 - 2 * factor);
  return { lift: ease * maxLift, ease };
}

export function LowPolyBackground({ spotX, spotY, active }: Props = {}) {
  const { isPlaying, settings } = useVibe();
  const { proximityEnabled, scaleUnit, rippleRadius, maxLift, overrideColors, c1, c2, c3 } = settings;

  const wrapRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<CubeCache[]>([]);
  const [slots, setSlots] = useState<CubeSlot[]>([]);

  // Refs to track pointer coordinates
  const activeRef = useRef(Boolean(active));
  const spotXRef = useRef(spotX ?? -9999);
  const spotYRef = useRef(spotY ?? -9999);

  // Sync props if provided
  useEffect(() => {
    if (active !== undefined) activeRef.current = active;
    if (spotX !== undefined) spotXRef.current = spotX;
    if (spotY !== undefined) spotYRef.current = spotY;
  }, [active, spotX, spotY]);

  // Global window pointer listener so moving mouse anywhere on the page animates proximity
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      spotXRef.current = e.clientX;
      spotYRef.current = e.clientY;
      activeRef.current = true;
    };
    const onLeave = () => {
      activeRef.current = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Build staggered isometric grid on resize or scaleUnit changes
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const update = () => {
      const width = wrap.clientWidth || window.innerWidth;
      const height = wrap.clientHeight || window.innerHeight;
      setSlots(buildCubeGrid(width, height, scaleUnit));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [scaleUnit]);

  // Cache cube centres for distance lookup (re-triggered when grid rebuilds or scaleUnit shifts)
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const cubeW = scaleUnit * 20;
    const cubeH = scaleUnit * 22;
    const halfW = cubeW / 2;
    const halfH = cubeH / 2;

    cacheRef.current = Array.from(wrap.querySelectorAll<HTMLElement>("[data-cube]")).map((el) => {
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      return {
        element: el,
        centerX: left + halfW,
        centerY: top + halfH,
        isReset: true,
        lastLift: 0,
      };
    });
  }, [slots, scaleUnit]);

  // Hook 1: VIBE 3D KINETIC ANIMATION (Immediate, tactile, undulating 3D harmonic waves)
  useEffect(() => {
    if (!isPlaying) return;

    const cubes = cacheRef.current;
    if (cubes.length === 0) return;

    const effectiveLift = Math.max(maxLift, 22);
    let animationFrameId: number;
    let startTime: number | null = null;

    const tick = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = elapsed / 1000; // seconds

      const wrap = wrapRef.current;
      const width = wrap ? wrap.clientWidth : window.innerWidth;
      const height = wrap ? wrap.clientHeight : window.innerHeight;
      const centerX = width * 0.4;
      const centerY = height * 0.45;

      // Access latest hover inputs from refs
      const isHoverActive = activeRef.current;
      const hX = spotXRef.current;
      const hY = spotYRef.current;

      for (const cube of cubes) {
        // Multi-frequency harmonic kinetic surface wave
        const wave1 = Math.sin(t * 2.8 - cube.centerX * 0.0032 - cube.centerY * 0.0024);
        const wave2 = Math.cos(t * 1.9 + cube.centerX * 0.0026 - cube.centerY * 0.0035);

        // Continuous radial ripple pulsing outward from console center
        const radialDist = fastHypot(cube.centerX - centerX, cube.centerY - centerY);
        const wave3 = Math.sin(t * 3.4 - radialDist * 0.006);

        // Combine harmonic waves with base elevation
        const combined = wave1 * 0.45 + wave2 * 0.35 + wave3 * 0.4 + 0.35;
        const waveLift = Math.max(0, combined) * effectiveLift;
        const waveEase = Math.min(1, Math.max(0, combined));

        // Proximity hover ripple
        const hoverEffect =
          isHoverActive && proximityEnabled
            ? getEffectForPoint(cube, hX, hY, rippleRadius, effectiveLift)
            : { lift: 0, ease: 0 };

        const lift = Math.max(hoverEffect.lift, waveLift);
        const ease = Math.max(hoverEffect.ease, waveEase);

        if (lift <= 0.2) {
          if (!cube.isReset) {
            resetCube(cube.element);
            cube.isReset = true;
            cube.lastLift = 0;
          }
        } else {
          // Direct 60fps hardware-accelerated transform & dynamic lighting
          if (cube.isReset || Math.abs((cube.lastLift ?? 0) - lift) > 0.05) {
            cube.element.style.transform = `translate3d(0, -${lift.toFixed(1)}px, 0)`;
            cube.element.style.filter = `brightness(${(1 + ease * 0.42).toFixed(2)}) contrast(${(1 + ease * 0.15).toFixed(2)})`;
            cube.element.style.setProperty("--sheen-offset", `${(ease * 180 - 75).toFixed(1)}%`);
            cube.isReset = false;
            cube.lastLift = lift;
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
      cleanCubes(cubes);
    };
  }, [isPlaying, proximityEnabled, rippleRadius, maxLift, slots]);

  // Hook 2: Standard hover-only path (when vibe is paused)
  useEffect(() => {
    if (isPlaying) return;

    const cubes = cacheRef.current;
    if (cubes.length === 0) return;

    const isHoverActive = activeRef.current;
    if (!isHoverActive || !proximityEnabled) {
      cleanCubes(cubes);
      return;
    }

    const effectiveLift = Math.max(maxLift, 18);
    const hX = spotXRef.current;
    const hY = spotYRef.current;

    for (const cube of cubes) {
      const hoverEffect = getEffectForPoint(cube, hX, hY, rippleRadius, effectiveLift);
      if (hoverEffect.lift <= 0.2) {
        if (!cube.isReset) {
          resetCube(cube.element);
          cube.isReset = true;
          cube.lastLift = 0;
        }
      } else {
        if (cube.isReset || Math.abs((cube.lastLift ?? 0) - hoverEffect.lift) > 0.05) {
          cube.element.style.transform = `translate3d(0, -${hoverEffect.lift.toFixed(1)}px, 0)`;
          cube.element.style.filter = `brightness(${(1 + hoverEffect.ease * 0.35).toFixed(2)})`;
          cube.element.style.setProperty("--sheen-offset", `${(hoverEffect.ease * 200 - 100).toFixed(1)}%`);
          cube.isReset = false;
          cube.lastLift = hoverEffect.lift;
        }
      }
    }
  }, [isPlaying, active, proximityEnabled, spotX, spotY, rippleRadius, maxLift, slots]);

  const inlineStyles = {
    "--u": `${scaleUnit}px`,
    ...(overrideColors
      ? {
          "--c1": c1,
          "--c2": c2,
          "--c3": c3,
        }
      : {}),
  } as CSSProperties;

  return (
    <div
      ref={wrapRef}
      className={cn("mode-cube-pattern", isPlaying && "is-playing")}
      style={inlineStyles}
      aria-hidden
    >
      {slots.map((slot) => (
        <div
          key={slot.id}
          data-cube
          className="mode-cube"
          style={{ left: slot.x, top: slot.y, zIndex: slot.zIndex }}
        >
          <div className="mode-cube-inside-left" />
          <div className="mode-cube-inside-right" />
          <div className="mode-cube-face-left" />
          <div className="mode-cube-face-right" />
          <div className="mode-cube-face-top" />
        </div>
      ))}
    </div>
  );
}
