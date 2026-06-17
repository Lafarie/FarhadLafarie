"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useVibe } from "@/context/VibeContext";

export function VibeButton() {
  const { isPlaying, toggle } = useVibe();
  const [featuredVisible, setFeaturedVisible] = useState(true);

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
    <AnimatePresence>
      {featuredVisible && (
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
            fixed z-40
            bottom-6 right-5
            md:bottom-auto md:top-[72px] md:right-5
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
      )}
    </AnimatePresence>
  );
}
