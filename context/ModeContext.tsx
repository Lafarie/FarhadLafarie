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
  const visibleRef = useRef(true); // tracks whether #featured section is in view

  const startAutoCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      // Only auto-switch when the hero/featured section is visible
      if (!visibleRef.current) return;

      setModeState((prevMode) => {
        const nextIndex = (MODE_TAB_ORDER.indexOf(prevMode) + 1) % MODE_TAB_ORDER.length;
        return MODE_TAB_ORDER[nextIndex];
      });
    }, 7000);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PortfolioMode | null;
    if (stored && SITE.modes[stored]) {
      setModeState(stored);
    }
    setHydrated(true);
    startAutoCycle();

    // Pause auto-cycle when user scrolls away from the featured section
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.3 },
    );

    const section = document.getElementById("featured");
    if (section) observer.observe(section);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      observer.disconnect();
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
