"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useVibe } from "@/context/VibeContext";

/** Scale unit — matches the kinetic-ripple demo */
const U = 6;
const X_STEP = U * 16.9;
const Y_STEP = U * 6.4;
const CUBE_W = U * 20;
const CUBE_H = U * 22;
const RIPPLE_RADIUS = 200;
const MAX_LIFT = 10;

type Props = { spotX: number; spotY: number; active: boolean };

type CubeSlot = { id: string; x: number; y: number; zIndex: number };

type CubeCache = { element: HTMLElement; centerX: number; centerY: number };

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

function buildCubeGrid(width: number, height: number): CubeSlot[] {
  const cols = Math.ceil(width / X_STEP) + 2;
  const rows = Math.ceil(height / Y_STEP) + 3;
  const slots: CubeSlot[] = [];

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      let x = c * X_STEP;
      if (r % 2 !== 0) x += X_STEP / 2;
      slots.push({
        id: `${r}-${c}`,
        x,
        y: r * Y_STEP,
        // depth among cubes only — capped so rows never beat page content
        zIndex: Math.min(r + 2, 8),
      });
    }
  }
  return slots;
}

function resetCube(el: HTMLElement) {
  el.style.transform = "";
  el.style.filter = "";
  el.style.removeProperty("--sheen-offset");
}

function getEffectForPoint(cube: CubeCache, x: number, y: number, radius: number) {
  const dx = x - cube.centerX;
  const dy = y - cube.centerY;
  const dist = Math.hypot(dx, dy);

  if (dist >= radius) return { lift: 0, ease: 0 };

  const factor = 1 - dist / radius;
  const ease = factor * factor * (3 - 2 * factor);
  return { lift: ease * MAX_LIFT, ease };
}

function getWaveDistance(
  cube: CubeCache,
  variant: WaveVariant,
  progress: number,
  width: number,
  height: number,
  waveRadius: number
): number {
  if (variant === "left-to-right") {
    const startX = -waveRadius;
    const endX = width + waveRadius;
    const waveX = startX + progress * (endX - startX);
    return Math.abs(cube.centerX - waveX);
  }

  if (variant === "right-to-left") {
    const startX = width + waveRadius;
    const endX = -waveRadius;
    const waveX = startX + progress * (endX - startX);
    return Math.abs(cube.centerX - waveX);
  }

  if (variant === "top-left-to-bottom-right") {
    const diag = Math.hypot(width, height);
    const dx = width / diag;
    const dy = height / diag;
    const proj = cube.centerX * dx + cube.centerY * dy;
    const startProj = -waveRadius;
    const endProj = diag + waveRadius;
    const waveProj = startProj + progress * (endProj - startProj);
    return Math.abs(proj - waveProj);
  }

  if (variant === "circle-out") {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.hypot(centerX, centerY) + waveRadius;
    const currentRadius = progress * maxRadius;
    const cubeRadius = Math.hypot(cube.centerX - centerX, cube.centerY - centerY);
    return Math.abs(cubeRadius - currentRadius);
  }

  if (variant === "circle-in") {
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.hypot(centerX, centerY) + waveRadius;
    const currentRadius = (1 - progress) * maxRadius;
    const cubeRadius = Math.hypot(cube.centerX - centerX, cube.centerY - centerY);
    return Math.abs(cubeRadius - currentRadius);
  }

  return Infinity;
}

export function LowPolyBackground({ spotX, spotY, active }: Props) {
  const { isPlaying } = useVibe();
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

  // Build staggered isometric grid on resize
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const update = () => {
      setSlots(buildCubeGrid(wrap.clientWidth, wrap.clientHeight));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Cache cube centres for distance lookup
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const halfW = CUBE_W / 2;
    const halfH = CUBE_H / 2;

    cacheRef.current = Array.from(wrap.querySelectorAll<HTMLElement>("[data-cube]")).map((el) => {
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      return {
        element: el,
        centerX: left + halfW,
        centerY: top + halfH,
      };
    });
  }, [slots]);

  // Hook 1: Vibe play sweep loop (no hover dependency in array to prevent resets)
  useEffect(() => {
    if (!isPlaying) return;

    const cubes = cacheRef.current;
    if (cubes.length === 0) return;

    const waveRadius = RIPPLE_RADIUS * 1.25;
    let animationFrameId: number;
    let startTime: number | null = null;
    const sweepDuration = 6000; // 6s per sweep

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

      // Select a new variant when a cycle completes
      if (currentCycle !== lastCycle) {
        lastCycle = currentCycle;
        const choices = VARIANTS.filter((v) => v !== variantRef.current);
        variantRef.current = choices[Math.floor(Math.random() * choices.length)];
      }

      // Access latest hover inputs from refs
      const isHoverActive = activeRef.current;
      const hX = spotXRef.current;
      const hY = spotYRef.current;

      for (const cube of cubes) {
        const hoverEffect = isHoverActive ? getEffectForPoint(cube, hX, hY, RIPPLE_RADIUS) : { lift: 0, ease: 0 };
        const dist = getWaveDistance(cube, variantRef.current, progress, width, height, waveRadius);

        let waveLift = 0;
        let waveEase = 0;
        if (dist < waveRadius) {
          const factor = 1 - dist / waveRadius;
          waveEase = factor * factor * (3 - 2 * factor);
          waveLift = waveEase * MAX_LIFT;
        }

        const lift = Math.max(hoverEffect.lift, waveLift);
        const ease = Math.max(hoverEffect.ease, waveEase);

        if (lift <= 0) {
          resetCube(cube.element);
        } else {
          cube.element.style.transform = `translateY(-${lift}px) translateZ(0)`;
          cube.element.style.filter = `brightness(${1 + ease * 0.3})`;
          cube.element.style.setProperty("--sheen-offset", `${ease * 200 - 100}%`);
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
      cubes.forEach((c) => resetCube(c.element));
    };
  }, [isPlaying, slots]);

  // Hook 2: Standard hover-only path (when vibe is paused)
  useEffect(() => {
    if (isPlaying) return;

    const cubes = cacheRef.current;
    if (cubes.length === 0) return;

    if (!active) {
      cubes.forEach((c) => resetCube(c.element));
      return;
    }

    for (const cube of cubes) {
      const hoverEffect = getEffectForPoint(cube, spotX, spotY, RIPPLE_RADIUS);
      if (hoverEffect.lift <= 0) {
        resetCube(cube.element);
      } else {
        cube.element.style.transform = `translateY(-${hoverEffect.lift}px) translateZ(0)`;
        cube.element.style.filter = `brightness(${1 + hoverEffect.ease * 0.3})`;
        cube.element.style.setProperty("--sheen-offset", `${hoverEffect.ease * 200 - 100}%`);
      }
    }
  }, [isPlaying, active, spotX, spotY, slots]);

  return (
    <div
      ref={wrapRef}
      className="mode-cube-pattern"
      style={{ "--u": `${U}px` } as CSSProperties}
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
