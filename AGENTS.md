# FarhadLafarie — agent guide

Personal portfolio site for **Farhad Lafarie** (Next.js App Router). Deployed on Vercel.

## Repository layout

| Path | Role |
|------|------|
| `app/` | Next.js routes (`/`, `/cv/`, `/portfolio/`), root layout, navbar |
| `components/` | UI sections (featured, projects, stack, contact, scroll, vibe) |
| `content/` | Portfolio copy/data (`site.ts`, `projects.ts`, `modes.ts`, `cv.ts`, …) |
| `context/` | Mode switcher + vibe (sketch) context |
| `public/cv/` | Generated dual-track PDF downloads |
| `styles/` | Global + portfolio CSS |
| `app/cv/` | Dual HTML CV sources and `/cv` routes |

**Package manager:** pnpm. **Framework:** Next.js 16, React 19, Tailwind 4, GSAP/Lenis.

## Dual CV tracks

| Track | HTML source | View | PDF |
|-------|-------------|------|-----|
| **Full-Stack** | `app/cv/cv-tailwind-dev.html` | `/cv/dev/` | `/cv/FarhadLafarie-FullStack.pdf` |
| **DevOps** | `app/cv/cv-tailwind.html` | `/cv/devops/` | `/cv/FarhadLafarie-DevOps.pdf` |

- `/cv/` = chooser (Full-Stack vs DevOps). Navbar **CV** button opens the same chooser modal.
- Do **not** re-duplicate CV body into React — `/cv/dev` and `/cv/devops` load the HTML sources via `CvHtmlViewer`.
- Config lives in `content/cv.ts`.
- Regenerate PDFs after HTML edits (Chrome headless print-to-PDF). Keep files under `public/cv/`.

## Portfolio projects

- Cards: `content/projects.ts` → `ProjectsSection` (mode featured + tag filter).
- Featured IDs: `content/modes.ts`.
- Major WIP highlights: **Storedeck** (next big platform), **Kapruka Agra** (AI shopping concierge).
- Do not invent metrics/links — use user input or existing content.

## Content & modes

- Modes: `devops` · `developer` · `content-creator`.
- Prefer editing `content/*` over hardcoding strings.

## Agent rules

- Prefer small, focused diffs. Do not drive-by refactor.
- Do not commit unless the user asks.
- `trailingSlash: true` — keep sitemap/URLs with trailing slashes.

## Common commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
