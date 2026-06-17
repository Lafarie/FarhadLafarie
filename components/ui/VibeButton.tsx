"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Settings, X } from "lucide-react";
import { useVibe } from "@/context/VibeContext";

export function VibeButton() {
  const { isPlaying, toggle, settings, updateSettings, resetSettings } = useVibe();
  const [featuredVisible, setFeaturedVisible] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { proximityEnabled, scaleUnit, rippleRadius, maxLift, overrideColors, c1, c2, c3 } = settings;

  // Show button only while #featured section is in view
  useEffect(() => {
    const section = document.getElementById("featured");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFeaturedVisible(entry.isIntersecting),
      { threshold: 0.2 }, // hide once 80% of section has scrolled away
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {featuredVisible && (
          <div className="fixed z-40 bottom-6 right-5 md:bottom-auto md:top-[72px] md:right-5 flex items-center gap-2">
            {/* Play/Pause Vibe button */}
            <motion.button
              key="vibe-btn"
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "Pause vibe animation" : "Play vibe animation"}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`
                inline-flex items-center gap-2
                rounded-full border border-line bg-surface/90
                px-3 py-2 md:px-4 md:py-2
                text-[11px] font-bold uppercase tracking-widest text-ink-dim
                shadow-sm backdrop-blur-sm
                transition-colors duration-200
                hover:border-grape hover:text-grape
                disabled:cursor-not-allowed disabled:opacity-50
              `}
            >
              <span className="inline-flex">
                {isPlaying ? (
                  <Pause size={12} fill="currentColor" />
                ) : (
                  <Play size={12} fill="currentColor" />
                )}
              </span>
              <span>{isPlaying ? "Pause" : "Vibe"}</span>
            </motion.button>

            {/* Settings button */}
            <motion.button
              key="settings-btn"
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              aria-label="Open background settings"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`
                inline-flex items-center justify-center
                rounded-full border border-line bg-surface/90
                p-2 md:p-[10px]
                text-ink-dim shadow-sm backdrop-blur-sm
                transition-colors duration-200
                hover:border-grape hover:text-grape
              `}
            >
              <Settings size={12} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Overlay Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-base/40 backdrop-blur-md"
            />

            {/* Settings Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="low-poly-panel relative z-10 w-full max-w-md bg-surface p-6 sm:p-8 text-left shadow-lg"
            >
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-ink-dim hover:text-ink transition-colors duration-150"
                aria-label="Close settings panel"
              >
                <X size={16} />
              </button>

              {/* Title & Description */}
              <h2 className="text-xl font-bold tracking-tight text-ink">3D Kinetic Ripple</h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-dim">
                Move your mouse over the pattern to create a realistic 3D wave. Blocks lift and brighten based on their distance from your cursor.
              </p>

              <hr className="my-5 border-line/30" />

              {/* Settings Controls */}
              <div className="flex flex-col gap-5">
                {/* Proximity Toggle */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-dim">Enable Proximity Ripple</span>
                  <button
                    type="button"
                    onClick={() => updateSettings({ proximityEnabled: !proximityEnabled })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      proximityEnabled ? "bg-grape" : "bg-base-2"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out ${
                        proximityEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Scale Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                    <span>Scale (Unit)</span>
                    <span className="text-grape">{scaleUnit}PX</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={20}
                    step={1}
                    value={scaleUnit}
                    onChange={(e) => updateSettings({ scaleUnit: parseInt(e.target.value) })}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Radius Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                    <span>Ripple Radius</span>
                    <span className="text-grape">{rippleRadius}PX</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={500}
                    step={10}
                    value={rippleRadius}
                    onChange={(e) => updateSettings({ rippleRadius: parseInt(e.target.value) })}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Max Lift Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-ink-dim">
                    <span>Max Lift Height</span>
                    <span className="text-grape">{maxLift}PX</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={maxLift}
                    onChange={(e) => updateSettings({ maxLift: parseInt(e.target.value) })}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Colors Pickers */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink-dim">Colors</span>
                  <div className="flex gap-4">
                    {/* Highlight */}
                    <label className="relative flex flex-col items-center gap-1.5 cursor-pointer flex-1 py-3 px-2 border border-line rounded-xl bg-surface/50 hover:bg-surface transition-colors duration-150">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-ink-dim">Highlight</span>
                      <div
                        style={{ backgroundColor: overrideColors ? c1 : "#ffd4d4" }}
                        className="w-8 h-8 rounded-full border border-line-strong shadow-sm transition-colors duration-150"
                      />
                      <input
                        type="color"
                        value={overrideColors ? c1 : "#ffd4d4"}
                        onChange={(e) => updateSettings({ c1: e.target.value, overrideColors: true })}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>

                    {/* Shadow L */}
                    <label className="relative flex flex-col items-center gap-1.5 cursor-pointer flex-1 py-3 px-2 border border-line rounded-xl bg-surface/50 hover:bg-surface transition-colors duration-150">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-ink-dim">Shadow (L)</span>
                      <div
                        style={{ backgroundColor: overrideColors ? c2 : "#3d0a0a" }}
                        className="w-8 h-8 rounded-full border border-line-strong shadow-sm transition-colors duration-150"
                      />
                      <input
                        type="color"
                        value={overrideColors ? c2 : "#3d0a0a"}
                        onChange={(e) => updateSettings({ c2: e.target.value, overrideColors: true })}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>

                    {/* Shadow R */}
                    <label className="relative flex flex-col items-center gap-1.5 cursor-pointer flex-1 py-3 px-2 border border-line rounded-xl bg-surface/50 hover:bg-surface transition-colors duration-150">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-ink-dim">Shadow (R)</span>
                      <div
                        style={{ backgroundColor: overrideColors ? c3 : "#751a1a" }}
                        className="w-8 h-8 rounded-full border border-line-strong shadow-sm transition-colors duration-150"
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
                  className="w-full text-center py-2.5 mt-2 border border-line rounded-xl text-[10px] uppercase font-bold tracking-widest text-ink hover:bg-base-2 hover:border-grape hover:text-grape transition-all duration-200"
                >
                  Reset to Defaults
                </button>
              </div>

              <hr className="my-5 border-line/30" />

              {/* Attribution Footer */}
              <div className="text-center text-[10px] leading-relaxed text-ink-dim">
                Inspired by{" "}
                <a
                  href="https://uiverse.io/mobinkakei/loud-parrot-63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-grape hover:text-saffron transition-colors duration-150"
                >
                  mobinkakei / loud-parrot-63
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
