"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type VibeCtx = { isPlaying: boolean; toggle: () => void };
const VibeContext = createContext<VibeCtx | null>(null);

export function VibeProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <VibeContext.Provider value={{ isPlaying, toggle: () => setIsPlaying((v) => !v) }}>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe(): VibeCtx {
  const ctx = useContext(VibeContext);
  if (!ctx) throw new Error("useVibe must be inside VibeProvider");
  return ctx;
}
