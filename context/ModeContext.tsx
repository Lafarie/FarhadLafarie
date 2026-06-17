"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SITE } from "@/content/site";
import type { ModeConfig, PortfolioMode } from "@/content/types";

type ModeContextValue = {
  mode: PortfolioMode;
  modeConfig: ModeConfig;
  setMode: (mode: PortfolioMode) => void;
};

const ModeContext = createContext<ModeContextValue | null>(null);

const STORAGE_KEY = "portfolio-mode";

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>(SITE.hero.defaultMode);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PortfolioMode | null;
    if (stored && SITE.modes[stored]) {
      setModeState(stored);
    }
    setHydrated(true);
  }, []);

  const setMode = useCallback((next: PortfolioMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const modeConfig = SITE.modes[mode];

  const value = useMemo(
    () => ({ mode, modeConfig, setMode }),
    [mode, modeConfig, setMode],
  );

  return (
    <ModeContext.Provider value={value}>
      <div data-mode={hydrated ? mode : SITE.hero.defaultMode}>{children}</div>
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
