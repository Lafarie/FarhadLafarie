"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { SITE } from "@/content/site";
import { MODE_TAB_ORDER } from "@/content/modes";
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

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setModeState((prevMode) => {
        const nextIndex = (MODE_TAB_ORDER.indexOf(prevMode) + 1) % MODE_TAB_ORDER.length;
        return MODE_TAB_ORDER[nextIndex];
      });
    }, 7000); // cycle every 7 seconds
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PortfolioMode | null;
    if (stored && SITE.modes[stored]) {
      setModeState(stored);
    }
    setHydrated(true);

    startAutoCycle();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoCycle]);

  const setMode = useCallback((next: PortfolioMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    startAutoCycle();
  }, [startAutoCycle]);

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
