"use client";

import Image from "next/image";
import { useMode } from "@/context/ModeContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ModePersonImage() {
  const { modeConfig } = useMode();

  return (
    <div
      className={cn(
        "low-poly-character-frame relative mx-auto w-[min(90vw,22rem)] overflow-hidden",
        "aspect-[4/5] sm:w-[min(70vw,20rem)]",
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={modeConfig.id}
          initial={{ opacity: 0, scale: 0.96 }}
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
            sizes="(max-width: 768px) 90vw, 320px"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
