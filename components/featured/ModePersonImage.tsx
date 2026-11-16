"use client";

import { useState } from "react";

export function ModePersonImage() {
  const [knobRotations, setKnobRotations] = useState([25, 70, 110]);

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
      <div className="te-dial-strip">
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

        {/* Live Mini LED Audio Level Meter */}
        <div className="flex flex-col items-center gap-1 pl-1 border-l border-zinc-400">
          <div className="flex gap-0.5 h-4 items-end" aria-label="Signal level meter">
            <span className="w-1.5 h-2 bg-emerald-500 rounded-2xs" />
            <span className="w-1.5 h-3 bg-emerald-500 rounded-2xs" />
            <span className="w-1.5 h-4 bg-emerald-500 rounded-2xs" />
            <span className="w-1.5 h-3.5 bg-yellow-400 rounded-2xs animate-pulse" />
            <span className="w-1.5 h-2 bg-orange-500 rounded-2xs" />
            <span className="w-1.5 h-1 bg-red-500 rounded-2xs" />
          </div>
          <span className="te-dial-label">SIGNAL</span>
        </div>
      </div>
    </div>
  );
}
