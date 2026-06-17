"use client";

import Image from "next/image";
import { useMode } from "@/context/ModeContext";
import { motion, AnimatePresence } from "framer-motion";

export function ModePersonImage() {
  const { modeConfig } = useMode();

  return (
    <div
      className="low-poly-character-frame relative w-full overflow-hidden"
      style={{ aspectRatio: "4/5" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={modeConfig.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={modeConfig.character.image}
            alt={modeConfig.character.alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 300px"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
