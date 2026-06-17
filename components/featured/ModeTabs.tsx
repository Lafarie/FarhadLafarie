"use client";

import { MODE_TAB_ORDER } from "@/content/modes";
import { useMode } from "@/context/ModeContext";
import type { PortfolioMode } from "@/content/types";
import { cn } from "@/lib/utils";

export function ModeTabs() {
  const { mode, setMode } = useMode();

  return (
    <div role="tablist" aria-label="Portfolio mode" className="low-poly-tab-bar">
      {MODE_TAB_ORDER.map((id) => {
        const active = mode === id;
        const tabLabel =
          id === "developer" ? "dev" : id === "content-creator" ? "content creator" : "devops";

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setMode(id as PortfolioMode)}
            className={cn("low-poly-tab", active && "is-active")}
          >
            {tabLabel}
          </button>
        );
      })}
    </div>
  );
}
