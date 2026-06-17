"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

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

function applyRipple(cube: CubeCache, spotX: number, spotY: number) {
  const dx = spotX - cube.centerX;
  const dy = spotY - cube.centerY;
  const dist = Math.hypot(dx, dy);

  if (dist >= RIPPLE_RADIUS) {
    resetCube(cube.element);
    return;
  }

  const factor = 1 - dist / RIPPLE_RADIUS;
  const ease = factor * factor * (3 - 2 * factor);
  const lift = ease * MAX_LIFT;

  cube.element.style.transform = `translateY(-${lift}px) translateZ(0)`;
  cube.element.style.filter = `brightness(${1 + ease * 0.3})`;
  cube.element.style.setProperty("--sheen-offset", `${ease * 200 - 100}%`);
}

export function LowPolyBackground({ spotX, spotY, active }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<CubeCache[]>([]);
  const [slots, setSlots] = useState<CubeSlot[]>([]);

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

  // Proximity ripple — each real cube lifts individually
  useEffect(() => {
    const cubes = cacheRef.current;
    if (!active) {
      cubes.forEach((c) => resetCube(c.element));
      return;
    }

    for (const cube of cubes) {
      applyRipple(cube, spotX, spotY);
    }
  }, [spotX, spotY, active]);

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
