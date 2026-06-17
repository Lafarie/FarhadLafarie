"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useVibe } from "@/context/VibeContext";

type Props = { spotX: number; spotY: number; active: boolean };

type CubeSlot = { id: string; x: number; y: number; zIndex: number };

type CubeCache = {
  element: HTMLElement;
  centerX: number;
  centerY: number;
  isReset?: boolean;
  lastLift?: number;
};

type WaveVariant =
  | "left-to-right"
  | "right-to-left"
  | "top-left-to-bottom-right"
  | "circle-out"
  | "circle-in";

const VARIANTS: WaveVariant[] = [
  "left-to-right",
  "right-to-left",
  "top-left-to-bottom-right",
  "circle-out",
  "circle-in"
];

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
        // depth among cubes only — capped so rows never beat page content
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

// Optimized wave distance calculation using precomputed frame variables
function getFastWaveDistance(
  cube: CubeCache,
  variant: WaveVariant,
  waveParam: number,
  diagDx: number,
  diagDy: number,
  screenCenterX: number,
  screenCenterY: number
): number {
  if (variant === "left-to-right" || variant === "right-to-left") {
    return Math.abs(cube.centerX - waveParam);
  }
  if (variant === "top-left-to-bottom-right") {
    const proj = cube.centerX * diagDx + cube.centerY * diagDy;
    return Math.abs(proj - waveParam);
  }
  // circle-out and circle-in
  const cubeRadius = fastHypot(cube.centerX - screenCenterX, cube.centerY - screenCenterY);
  return Math.abs(cubeRadius - waveParam);
}

export function LowPolyBackground({ spotX, spotY, active }: Props) {
  const { isPlaying, settings } = useVibe();
  const { proximityEnabled, scaleUnit, rippleRadius, maxLift, overrideColors, c1, c2, c3 } = settings;

  const wrapRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<CubeCache[]>([]);
  const [slots, setSlots] = useState<CubeSlot[]>([]);

  // Refs to track hover state to prevent mouse movements from resetting the RAF loop
  const activeRef = useRef(active);
  const spotXRef = useRef(spotX);
  const spotYRef = useRef(spotY);

  useEffect(() => {
    activeRef.current = active;
    spotXRef.current = spotX;
    spotYRef.current = spotY;
  }, [active, spotX, spotY]);

  // Build staggered isometric grid on resize or scaleUnit changes
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const update = () => {
      setSlots(buildCubeGrid(wrap.clientWidth, wrap.clientHeight, scaleUnit));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
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

  // Hook 1: Vibe play sweep loop (no hover dependency in array to prevent resets)
  useEffect(() => {
    if (!isPlaying) return;

    const cubes = cacheRef.current;
    if (cubes.length === 0) return;

    const waveRadius = rippleRadius * 1.25;
    let animationFrameId: number;
    let startTime: number | null = null;
    const sweepDuration = 16000; // Slowed 16s sweep

    let lastCycle = -1;
    const variantRef = { current: VARIANTS[0] };

    const tick = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const currentCycle = Math.floor(elapsed / sweepDuration);
      const progress = (elapsed % sweepDuration) / sweepDuration;

      const wrap = wrapRef.current;
      const width = wrap ? wrap.clientWidth : window.innerWidth;
      const height = wrap ? wrap.clientHeight : window.innerHeight;
      const variant = variantRef.current;

      // Select a new variant when a cycle completes
      if (currentCycle !== lastCycle) {
        lastCycle = currentCycle;
        const choices = VARIANTS.filter((v) => v !== variantRef.current);
        variantRef.current = choices[Math.floor(Math.random() * choices.length)];
      }

      // Precompute animation parameters once per frame instead of inside loop
      const p1 = progress;
      const p2 = (progress - 0.125 + 1.0) % 1.0;

      let waveParam1 = 0;
      let waveParam2 = 0;
      let diagDx = 0;
      let diagDy = 0;
      let screenCenterX = 0;
      let screenCenterY = 0;

      if (variant === "left-to-right") {
        const startX = -waveRadius;
        const endX = width + waveRadius;
        waveParam1 = startX + p1 * (endX - startX);
        waveParam2 = startX + p2 * (endX - startX);
      } else if (variant === "right-to-left") {
        const startX = width + waveRadius;
        const endX = -waveRadius;
        waveParam1 = startX + p1 * (endX - startX);
        waveParam2 = startX + p2 * (endX - startX);
      } else if (variant === "top-left-to-bottom-right") {
        const diag = fastHypot(width, height);
        diagDx = width / diag;
        diagDy = height / diag;
        const startProj = -waveRadius;
        const endProj = diag + waveRadius;
        waveParam1 = startProj + p1 * (endProj - startProj);
        waveParam2 = startProj + p2 * (endProj - startProj);
      } else if (variant === "circle-out" || variant === "circle-in") {
        screenCenterX = width / 2;
        screenCenterY = height / 2;
        const maxCircleRadius = fastHypot(screenCenterX, screenCenterY) + waveRadius;
        if (variant === "circle-out") {
          waveParam1 = p1 * maxCircleRadius;
          waveParam2 = p2 * maxCircleRadius;
        } else {
          waveParam1 = (1.0 - p1) * maxCircleRadius;
          waveParam2 = (1.0 - p2) * maxCircleRadius;
        }
      }

      // Access latest hover inputs from refs
      const isHoverActive = activeRef.current;
      const hX = spotXRef.current;
      const hY = spotYRef.current;

      for (const cube of cubes) {
        const hoverEffect = (isHoverActive && proximityEnabled)
          ? getEffectForPoint(cube, hX, hY, rippleRadius, maxLift)
          : { lift: 0, ease: 0 };
        
        // Optimized distance calculations
        const dist1 = getFastWaveDistance(cube, variant, waveParam1, diagDx, diagDy, screenCenterX, screenCenterY);
        const dist2 = getFastWaveDistance(cube, variant, waveParam2, diagDx, diagDy, screenCenterX, screenCenterY);

        let waveLift1 = 0;
        let waveEase1 = 0;
        if (dist1 < waveRadius) {
          const factor = 1 - dist1 / waveRadius;
          waveEase1 = factor * factor * (3 - 2 * factor);
          waveLift1 = waveEase1 * maxLift;
        }

        let waveLift2 = 0;
        let waveEase2 = 0;
        if (dist2 < waveRadius) {
          const factor = 1 - dist2 / waveRadius;
          waveEase2 = factor * factor * (3 - 2 * factor);
          waveLift2 = waveEase2 * maxLift;
        }

        const waveLift = Math.max(waveLift1, waveLift2);
        const waveEase = Math.max(waveEase1, waveEase2);

        const lift = Math.max(hoverEffect.lift, waveLift);
        const ease = Math.max(hoverEffect.ease, waveEase);

        if (lift <= 0) {
          if (!cube.isReset) {
            resetCube(cube.element);
            cube.isReset = true;
            cube.lastLift = 0;
          }
        } else {
          // DOM write throttling: only apply if state transitioned or lift value shifted noticeably
          if (cube.isReset || Math.abs((cube.lastLift ?? 0) - lift) > 0.05) {
            cube.element.style.transform = `translateY(-${lift}px) translateZ(0)`;
            cube.element.style.filter = `brightness(${1 + ease * 0.3})`;
            cube.element.style.setProperty("--sheen-offset", `${ease * 200 - 100}%`);
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

  // Hook 2: Optimized standard hover-only path (when vibe is paused)
  useEffect(() => {
    if (isPlaying) return;

    const cubes = cacheRef.current;
    if (cubes.length === 0) return;

    if (!active || !proximityEnabled) {
      cleanCubes(cubes);
      return;
    }

    for (const cube of cubes) {
      const hoverEffect = getEffectForPoint(cube, spotX, spotY, rippleRadius, maxLift);
      if (hoverEffect.lift <= 0) {
        if (!cube.isReset) {
          resetCube(cube.element);
          cube.isReset = true;
          cube.lastLift = 0;
        }
      } else {
        if (cube.isReset || Math.abs((cube.lastLift ?? 0) - hoverEffect.lift) > 0.05) {
          cube.element.style.transform = `translateY(-${hoverEffect.lift}px) translateZ(0)`;
          cube.element.style.filter = `brightness(${1 + hoverEffect.ease * 0.3})`;
          cube.element.style.setProperty("--sheen-offset", `${hoverEffect.ease * 200 - 100}%`);
          cube.isReset = false;
          cube.lastLift = hoverEffect.lift;
        }
      }
    }
  }, [isPlaying, active, proximityEnabled, spotX, spotY, rippleRadius, maxLift, slots]);

  const inlineStyles = {
    "--u": `${scaleUnit}px`,
    ...(overrideColors ? {
      "--c1": c1,
      "--c2": c2,
      "--c3": c3,
    } : {})
  } as CSSProperties;

  return (
    <div
      ref={wrapRef}
      className="mode-cube-pattern"
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
