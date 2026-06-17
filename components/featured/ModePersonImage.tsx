"use client";

import Image from "next/image";
import { useMode } from "@/context/ModeContext";
import { cn } from "@/lib/utils";

export function ModePersonImage() {
  const { modeConfig } = useMode();

  return (
    <div
      className={cn(
        "low-poly-character-frame relative mx-auto w-[min(90vw,22rem)] overflow-hidden",
        "aspect-[4/5] sm:w-[min(70vw,20rem)]",
      )}
    >
      <Image
        key={modeConfig.id}
        src={modeConfig.character.image}
        alt={modeConfig.character.alt}
        fill
        className="object-cover transition-opacity duration-500"
        priority
        sizes="(max-width: 768px) 90vw, 320px"
      />
    </div>
  );
}
