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
    <nav className="low-poly-nav fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-ink">
          {SITE.meta.name}
        </Link>
        <ul className="flex items-center gap-6">
          {SITE.nav.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={handleNav(item.id)}
                className="text-sm font-medium text-ink-dim transition hover:text-saffron"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href={SITE.meta.cvUrl} download className="low-poly-chip text-xs font-semibold">
              CV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
