import { SITE } from "@/content/site";

export function FooterSection() {
  return (
    <footer className="border-t border-line/40 bg-surface px-6 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink-faint">
          &copy; {SITE.meta.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          {SITE.social.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-ink-dim hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
