"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Settings } from "lucide-react";
import { useVibe } from "@/context/VibeContext";
import { VibeSettingsModal } from "@/components/ui/VibeSettingsModal";
import { cn } from "@/lib/utils";

const BAR_HEIGHTS = [5, 8, 11, 14, 18];

export function ModePersonImage() {
  const [knobRotations, setKnobRotations] = useState([25, 70, 110]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [signalBars, setSignalBars] = useState(5);
  const lastBarRef = useRef(5);
  const { isPlaying, toggle } = useVibe();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const scheduleNext = () => {
      // Random hold time between 2500ms and 5500ms
      const duration = Math.floor(Math.random() * 3000) + 2500;

      timer = setTimeout(() => {
        // Exclude current level so it NEVER repeats the same sequence in a row
        const candidates = [2, 3, 4, 5].filter((n) => n !== lastBarRef.current);
        // Weight 5 and 4 slightly higher for realistic mobile reception
        const weighted = candidates.flatMap((n) => (n >= 4 ? [n, n] : [n]));
        const next = weighted[Math.floor(Math.random() * weighted.length)];

        lastBarRef.current = next;
        setSignalBars(next);
        scheduleNext();
      }, duration);
    };

    scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  const activeBars = isPlaying ? 5 : signalBars;

  const rotateKnob = (index: number) => {
    setKnobRotations((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 45) % 360;
      return next;
    });
  };

  return (
    <div className="te-hardware-chassis relative w-full overflow-hidden select-none">
      {/* 4 Corner Industrial Torx/Hex Screws */}
      <span className="te-hex-screw top-left" aria-hidden="true" />
      <span className="te-hex-screw top-right" aria-hidden="true" />
      <span className="te-hex-screw bottom-left" aria-hidden="true" />
      <span className="te-hex-screw bottom-right" aria-hidden="true" />

      {/* Top Silkscreen Hardware Bezel */}
      <div className="flex items-center justify-between px-7 py-2 bg-zinc-200/90 border-b-2 border-zinc-900 font-mono text-[9px] font-black tracking-widest text-zinc-700 uppercase">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SYS_ID: TE-FL01
        </span>
        <span className="text-zinc-500 font-bold">STATUS: NOMINAL</span>
      </div>

      {/* Ventilation Cooling Slits */}
      <div className="flex justify-center gap-1.5 py-1 bg-zinc-300/40 border-b border-zinc-900/20" aria-hidden="true">
        <span className="w-5 h-0.5 rounded-full bg-zinc-400" />
        <span className="w-5 h-0.5 rounded-full bg-zinc-400" />
        <span className="w-5 h-0.5 rounded-full bg-zinc-400" />
        <span className="w-5 h-0.5 rounded-full bg-zinc-400" />
        <span className="w-5 h-0.5 rounded-full bg-zinc-400" />
      </div>

      {/* CRT Terminal Screen */}
      <div className="p-2.5 bg-zinc-900">
        <div
          className="te-monitor-bezel relative w-full overflow-hidden p-3.5 font-mono text-[10px] leading-relaxed text-zinc-300 bg-zinc-950 flex flex-col justify-between"
          style={{ aspectRatio: "4/5" }}
        >
          {/* Header line inside CRT */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-[8.5px] text-zinc-500">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              CONSOLE_ROOT // TTY-01
            </span>
            <span>PROD_ENV</span>
          </div>

          {/* Terminal readouts */}
          <div className="space-y-2 py-2 text-[9.5px]">
            <div>
              <span className="text-orange-400 font-bold">$ whoami</span>
              <p className="text-white font-extrabold text-[11px] tracking-wide mt-0.5">
                FARHAD LAFARIE
              </p>
              <p className="text-zinc-400 text-[8.5px]">
                Full-Stack Engineer &amp; DevOps Specialist
              </p>
            </div>

            <div className="border-t border-zinc-900 pt-1.5">
              <span className="text-cyan-400 font-bold">$ cat /etc/stack.conf</span>
              <div className="grid grid-cols-2 gap-1 text-[8px] text-zinc-400 mt-1">
                <div>[INFRA] Docker·K8s·AWS</div>
                <div>[CORE] Next.js·React 19</div>
                <div>[CI/CD] GitLab·Actions</div>
                <div>[MEDIA] 4K Video·Unity</div>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-1.5">
              <span className="text-emerald-400 font-bold">$ healthcheck --infra</span>
              <p className="text-emerald-400 font-semibold text-[8px]">
                ✔ CI/CD AUTOMATION [100%]
              </p>
              <p className="text-emerald-400 font-semibold text-[8px]">
                ✔ 14+ PROJECTS [DEPLOYED]
              </p>
            </div>
          </div>

          {/* Prompt line with cursor */}
          <div className="flex items-center gap-1 text-emerald-400 border-t border-zinc-800/80 pt-1.5 text-[9px]">
            <span className="font-bold">fl@workstation:~$</span>
            <span className="animate-pulse font-extrabold">█</span>
          </div>
        </div>
      </div>

      {/* Tactile Hardware Rotary Dial Strip */}
      <div className="te-dial-strip px-8 py-2.5">
        <div
          className="te-rotary-dial"
          onClick={() => rotateKnob(0)}
          title="Click to calibrate CLOCK"
        >
          <div
            className="te-knob-circle"
            style={{ transform: `rotate(${knobRotations[0]}deg)` }}
          />
          <span className="te-dial-label">CLOCK</span>
        </div>
        <div
          className="te-rotary-dial"
          onClick={() => rotateKnob(1)}
          title="Click to adjust GAIN"
        >
          <div
            className="te-knob-circle"
            style={{ transform: `rotate(${knobRotations[1]}deg)` }}
          />
          <span className="te-dial-label">GAIN</span>
        </div>
        <div
          className="te-rotary-dial"
          onClick={() => rotateKnob(2)}
          title="Click to toggle FPS"
        >
          <div
            className="te-knob-circle"
            style={{ transform: `rotate(${knobRotations[2]}deg)` }}
          />
          <span className="te-dial-label">RATE</span>
        </div>
      </div>

      {/* Hardware Master Transport Deck: Vibe Controls + Signal VU Meter */}
      <div className="te-transport-deck flex items-center justify-between px-7 py-2.5 border-t-2 border-zinc-900 select-none">
        {/* Left: Tactile Vibe Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            className={cn("te-vibe-btn", isPlaying ? "is-playing" : "is-paused")}
            title={isPlaying ? "Pause 3D kinetic background wave" : "Engage 3D kinetic background wave"}
          >
            {isPlaying ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Pause size={10} fill="currentColor" />
                <span>VIBE LIVE</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                <Play size={10} fill="currentColor" />
                <span>VIBE 3D</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="te-vibe-settings-btn"
            title="3D Ripple Calibration"
            aria-label="3D Ripple Calibration"
          >
            <Settings size={11} />
          </button>
        </div>

        {/* Right: Cellular Mobile Signal Strength Meter (Fixed size so it never shifts layout) */}
        <div
          className="flex items-center gap-2 cursor-pointer pl-2.5 border-l border-zinc-400/80 group shrink-0 w-[90px] h-7 select-none"
          onClick={toggle}
          title={isPlaying ? "Signal Locked to 5G Boost (Click to calm)" : "Click to boost signal"}
        >
          <div className="flex gap-[2px] h-5 w-[26px] items-end shrink-0" aria-label="Mobile signal strength">
            {BAR_HEIGHTS.map((h, i) => {
              const isLit = i + 1 <= activeBars;
              return (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className={cn(
                    "w-[3.5px] rounded-[1px] shrink-0",
                    isLit
                      ? "bg-emerald-500 opacity-100"
                      : "bg-zinc-300/80 border border-zinc-400/30 opacity-35"
                  )}
                />
              );
            })}
          </div>
          <div className="flex flex-col text-left shrink-0 w-[50px] overflow-hidden">
            <span className="te-dial-label text-zinc-900 font-extrabold leading-none text-[8.5px] truncate">
              SIGNAL
            </span>
            <span
              className={cn(
                "font-mono text-[7px] font-bold leading-none mt-0.5 truncate tabular-nums",
                activeBars >= 4
                  ? "text-emerald-600 font-extrabold"
                  : activeBars === 3
                    ? "text-amber-600 font-bold"
                    : "text-orange-600 font-bold"
              )}
            >
              {isPlaying
                ? "5G // BOOST"
                : activeBars === 5
                  ? "5G // FULL"
                  : activeBars === 4
                    ? "5G // GOOD"
                    : activeBars === 3
                      ? "4G // FAIR"
                      : "3G // LOW"}
            </span>
          </div>
        </div>
      </div>

      {/* 3D Kinetic Ripple Settings Modal */}
      <VibeSettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
