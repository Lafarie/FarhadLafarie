"use client";

import { MODE_TAB_ORDER } from "@/content/modes";
import { useMode } from "@/context/ModeContext";
import type { PortfolioMode } from "@/content/types";
import { cn } from "@/lib/utils";

export function ModeTabs() {
  const { mode, setMode } = useMode();

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
        <span>TRACK ROUTING</span>
        <span>//</span>
        <span className="text-zinc-800 font-extrabold">CH 01 - 03</span>
      </div>

      <div role="tablist" aria-label="Hardware channel selector" className="te-channel-selector">
        {MODE_TAB_ORDER.map((id, index) => {
          const active = mode === id;
          const num = String(index + 1).padStart(2, "0");
          const tabLabel =
            id === "developer" ? "DEVELOPER" : id === "content-creator" ? "CREATOR" : "DEVOPS";

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(id as PortfolioMode)}
              className={cn("te-rocker-btn", active && "is-active")}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  active ? "bg-white shadow-xs" : "bg-zinc-600",
                )}
              />
              <span>{num}: {tabLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
