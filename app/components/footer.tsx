"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

interface SocialLink {
  href: string;
  icon: typeof faGithub;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/LAFARIE",
    icon: faGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/farhad-lafarie/",
    icon: faLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/farhad.xd/",
    icon: faInstagram,
    label: "Instagram",
  },
  {
    href: "https://x.com/FLafarie",
    icon: faXTwitter,
    label: "X (Twitter)",
  },
];

function Footer(): ReactNode {
  const [isFooterSticky, setIsFooterSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const isScrollable = window.innerHeight < document.body.scrollHeight;
      setIsFooterSticky(!isScrollable);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 py-4 px-6 flex items-center justify-between">
      <div className="text-sm">
        &copy; Farhad Lafarie. All rights reserved.
      </div>
      <div className="flex space-x-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-400"
            aria-label={link.label}
          >
            <FontAwesomeIcon icon={link.icon} size="lg" />
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
