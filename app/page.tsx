"use client";

import dynamic from "next/dynamic";
import { ModeProvider } from "@/context/ModeContext";
import { SnapScrollRoot } from "@/components/scroll/SnapScrollRoot";
import { SectionRevealProvider } from "@/components/scroll/SectionRevealProvider";
import { FeaturedSection } from "@/components/featured/FeaturedSection";

// Below-the-fold sections are dynamically loaded to optimize initial bundle size, FCP, LCP, and TBT
const ProjectsSection = dynamic(() =>
  import("@/components/sections/ProjectsSection").then((m) => m.ProjectsSection)
);
const StackSection = dynamic(() =>
  import("@/components/sections/StackSection").then((m) => m.StackSection)
);
const ContactSection = dynamic(() =>
  import("@/components/sections/ContactSection").then((m) => m.ContactSection)
);
const SocialOrbitSection = dynamic(() =>
  import("@/components/social/SocialOrbitSection").then((m) => m.SocialOrbitSection)
);
const FooterSection = dynamic(() =>
  import("@/components/sections/FooterSection").then((m) => m.FooterSection)
);

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
