"use client";

import { ModeProvider } from "@/context/ModeContext";
import { SnapScrollRoot } from "@/components/scroll/SnapScrollRoot";
import { SectionRevealProvider } from "@/components/scroll/SectionRevealProvider";
import { FeaturedSection } from "@/components/featured/FeaturedSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SocialOrbitSection } from "@/components/social/SocialOrbitSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <ModeProvider>
      <SnapScrollRoot>
        <SectionRevealProvider>
          <main className="bg-base text-ink">
            <FeaturedSection />
            <ProjectsSection />
            <StackSection />
            <ContactSection />
            <SocialOrbitSection />
            <FooterSection />
          </main>
        </SectionRevealProvider>
      </SnapScrollRoot>
    </ModeProvider>
  );
}
