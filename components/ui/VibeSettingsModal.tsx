"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useVibe } from "@/context/VibeContext";

interface VibeSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function VibeSettingsModal({ open, onClose }: VibeSettingsModalProps) {
  const { settings, updateSettings, resetSettings } = useVibe();
  const { proximityEnabled, scaleUnit, rippleRadius, maxLift, overrideColors, c1, c2, c3 } = settings;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-base/40 backdrop-blur-md"
          />

          {/* Settings Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="low-poly-panel relative z-10 w-full max-w-md bg-surface p-6 sm:p-8 text-left shadow-lg font-mono"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-ink-dim hover:text-ink transition-colors duration-150"
              aria-label="Close settings panel"
            >
              <X size={16} />
            </button>

            {/* Title & Description */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <h2 className="text-base font-extrabold tracking-tight text-ink uppercase">
                3D Kinetic Ripple // Config
              </h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-dim font-sans">
              Interact with the background low-poly cube field. Adjust physics parameters, scale, wave radius, and surface tints.
            </p>

            <hr className="my-4 border-line/30" />

            {/* Settings Controls */}
            <div className="flex flex-col gap-4 text-xs">
              {/* Proximity Toggle */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-dim">
                  Proximity Ripple
                </span>
                <button
                  type="button"
                  onClick={() => updateSettings({ proximityEnabled: !proximityEnabled })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    proximityEnabled ? "bg-orange-500" : "bg-zinc-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      proximityEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Scale Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                  <span>Scale (Unit)</span>
                  <span className="text-orange-500 font-extrabold">{scaleUnit}PX</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={20}
                  step={1}
                  value={scaleUnit}
                  onChange={(e) => updateSettings({ scaleUnit: parseInt(e.target.value) })}
                  className="w-full cursor-pointer accent-orange-500"
                />
              </div>

              {/* Radius Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                  <span>Ripple Radius</span>
                  <span className="text-orange-500 font-extrabold">{rippleRadius}PX</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={rippleRadius}
                  onChange={(e) => updateSettings({ rippleRadius: parseInt(e.target.value) })}
                  className="w-full cursor-pointer accent-orange-500"
                />
              </div>

              {/* Max Lift Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                  <span>Max Lift Height</span>
                  <span className="text-orange-500 font-extrabold">{maxLift}PX</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={maxLift}
                  onChange={(e) => updateSettings({ maxLift: parseInt(e.target.value) })}
                  className="w-full cursor-pointer accent-orange-500"
                />
              </div>

              {/* Colors Pickers */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink-dim">Custom Tints</span>
                <div className="flex gap-3">
                  {/* Highlight */}
                  <label className="relative flex flex-col items-center gap-1.5 cursor-pointer flex-1 py-2 px-1 border border-line rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                    <span className="text-[8.5px] uppercase font-bold text-ink-dim">Top Face</span>
                    <div
                      style={{ backgroundColor: overrideColors ? c1 : "#ffd4d4" }}
                      className="w-6 h-6 rounded-full border border-zinc-800 shadow-xs"
                    />
                    <input
                      type="color"
                      value={overrideColors ? c1 : "#ffd4d4"}
                      onChange={(e) => updateSettings({ c1: e.target.value, overrideColors: true })}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>

                  {/* Shadow L */}
                  <label className="relative flex flex-col items-center gap-1.5 cursor-pointer flex-1 py-2 px-1 border border-line rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                    <span className="text-[8.5px] uppercase font-bold text-ink-dim">Left Face</span>
                    <div
                      style={{ backgroundColor: overrideColors ? c2 : "#3d0a0a" }}
                      className="w-6 h-6 rounded-full border border-zinc-800 shadow-xs"
                    />
                    <input
                      type="color"
                      value={overrideColors ? c2 : "#3d0a0a"}
                      onChange={(e) => updateSettings({ c2: e.target.value, overrideColors: true })}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>

                  {/* Shadow R */}
                  <label className="relative flex flex-col items-center gap-1.5 cursor-pointer flex-1 py-2 px-1 border border-line rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                    <span className="text-[8.5px] uppercase font-bold text-ink-dim">Right Face</span>
                    <div
                      style={{ backgroundColor: overrideColors ? c3 : "#751a1a" }}
                      className="w-6 h-6 rounded-full border border-zinc-800 shadow-xs"
                    />
                    <input
                      type="color"
                      value={overrideColors ? c3 : "#751a1a"}
                      onChange={(e) => updateSettings({ c3: e.target.value, overrideColors: true })}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Reset Button */}
              <button
                type="button"
                onClick={resetSettings}
                className="w-full text-center py-2 mt-1 border-2 border-zinc-900 rounded-lg text-[10px] uppercase font-extrabold tracking-widest text-zinc-800 hover:bg-zinc-100 transition-colors"
              >
                Reset Calibration
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
