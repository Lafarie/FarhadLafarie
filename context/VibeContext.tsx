"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type VibeSettings = {
  proximityEnabled: boolean;
  scaleUnit: number;
  rippleRadius: number;
  maxLift: number;
  overrideColors: boolean;
  c1: string; // Highlight
  c2: string; // Shadow (L)
  c3: string; // Shadow (R)
};

const DEFAULT_SETTINGS: VibeSettings = {
  proximityEnabled: true,
  scaleUnit: 10,
  rippleRadius: 200,
  maxLift: 10,
  overrideColors: false,
  c1: "#ffd4d4", // Default highlight matching our pastel red dev tab
  c2: "#3d0a0a",
  c3: "#751a1a",
};

type VibeCtx = {
  isPlaying: boolean;
  toggle: () => void;
  settings: VibeSettings;
  updateSettings: (newSettings: Partial<VibeSettings>) => void;
  resetSettings: () => void;
};

const VibeContext = createContext<VibeCtx | null>(null);

export function VibeProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [settings, setSettings] = useState<VibeSettings>(DEFAULT_SETTINGS);

  const toggle = () => setIsPlaying((v) => !v);
  const updateSettings = (newSettings: Partial<VibeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <VibeContext.Provider value={{ isPlaying, toggle, settings, updateSettings, resetSettings }}>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe(): VibeCtx {
  const ctx = useContext(VibeContext);
  if (!ctx) throw new Error("useVibe must be inside VibeProvider");
  return ctx;
}
