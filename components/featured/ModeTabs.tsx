"use client";

import { MODE_TAB_ORDER } from "@/content/modes";
import { useMode } from "@/context/ModeContext";
import type { PortfolioMode } from "@/content/types";
import { cn } from "@/lib/utils";

export function ModeTabs() {
  const { mode, setMode } = useMode();

  return (
    <div
      role="tablist"
      aria-label="Portfolio mode"
      className="inline-flex rounded-full border border-line bg-surface/60 p-1 backdrop-blur-sm"
    >
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
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors",
              active
                ? "bg-grape/25 text-ink shadow-sm"
                : "text-ink-faint hover:text-ink-dim",
            )}
          >
            {tabLabel}
          </button>
        );
      })}
    </div>
  );
}
