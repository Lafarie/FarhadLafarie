"use client";

import Link from "next/link";
import { SITE } from "@/content/site";
import { scrollToSection } from "@/lib/snap-scroll";

export default function Navbar() {
  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-line/60 bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-ink">
          {SITE.meta.name}
        </Link>
        <ul className="flex items-center gap-6">
          {SITE.nav.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={handleNav(item.id)}
                className="text-sm text-ink-dim transition hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={SITE.meta.cvUrl}
              download
              className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-dim hover:border-grape hover:text-ink"
            >
              CV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
