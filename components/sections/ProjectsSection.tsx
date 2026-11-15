"use client";

import { SITE } from "@/content/site";
import type { PortfolioMode, Project } from "@/content/types";
import { useMode } from "@/context/ModeContext";
import { ExternalLink, Gamepad2 } from "lucide-react";

function matchesMode(project: Project, mode: PortfolioMode): boolean {
  if (mode === "devops") return project.tags.includes("devops");
  if (mode === "developer") {
    return project.tags.some((t) =>
      ["developer", "full-stack", "mobile"].includes(t),
    );
  }
  return project.tags.some((t) => ["content", "developer"].includes(t));
}

export function ProjectsSection() {
  const { mode, modeConfig } = useMode();

  const featured = modeConfig.featuredProjectIds
    .map((id) => SITE.projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const featuredIds = new Set(featured.map((p) => p.id));
  const games = SITE.projects.filter((p) => p.tags.includes("game-dev"));
  const gameIds = new Set(games.map((p) => p.id));
  const rest = SITE.projects.filter(
    (p) => !featuredIds.has(p.id) && !gameIds.has(p.id) && matchesMode(p, mode),
  );

  return (
    <section
      id="projects"
      className="snap-section flex min-h-[100dvh] flex-col justify-start px-6 pb-28 pt-28"
    >
      <div className="section-reveal mx-auto w-full max-w-6xl">
        <h2 className="low-poly-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          My Projects
        </h2>
        <p className="mt-3 max-w-2xl text-ink-dim">
          Featured work (same on every screen): Storedeck, Kapruka Agra, and Ticket
          Portal. Switch mode to change the list below.
        </p>

        {/* Featured: fixed trio */}
        <div className="mt-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
            Featured
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <li
                key={project.id}
                className="low-poly-card flex flex-col justify-between p-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-ink">{project.title}</h4>
                    <span className="shrink-0 text-xs text-ink-faint">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-dim">{project.description}</p>
                </div>

                <div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm text-grape hover:text-saffron"
                    >
                      View <ExternalLink size={12} />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* More projects with links - before YouTube so desktop can see it */}
        {rest.length > 0 ? (
          <div className="mt-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
              More for {modeConfig.label.toLowerCase()}
            </h3>
            <ul className="mt-4 space-y-1">
              {rest.map((project) => (
                <li
                  key={project.id}
                  className="border-b border-line/50 py-3 last:border-b-0"
                >
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-wrap items-baseline justify-between gap-2"
                    >
                      <span className="inline-flex items-center gap-1.5 font-medium text-ink group-hover:text-grape">
                        {project.title}
                        <ExternalLink
                          size={12}
                          className="shrink-0 text-ink-faint group-hover:text-grape"
                        />
                      </span>
                      <span className="text-xs text-ink-faint">{project.status}</span>
                    </a>
                  ) : (
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-medium text-ink">{project.title}</span>
                      <span className="text-xs text-ink-faint">{project.status}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Games Built & Game Development Section */}
        {games.length > 0 ? (
          <div className="mt-16 border-t border-line/30 pt-12">
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-saffron" size={20} />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
                Games Built &amp; Game Dev
              </h3>
            </div>
            <p className="mt-1 text-xs text-ink-dim">
              Playable browser builds, custom physics mechanics, multiplayer networking, and game dev community portals.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="low-poly-card flex flex-col justify-between overflow-hidden p-5"
                >
                  <div>
                    {game.image ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-black/40">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="mt-4 flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-ink">{game.title}</h4>
                      <span className="shrink-0 rounded-full border border-line/60 bg-surface px-2 py-0.5 text-[10px] font-semibold text-ink-faint">
                        {game.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ink-dim">
                      {game.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-wrap gap-1">
                      {game.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {game.link ? (
                      <a
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-grape hover:text-saffron"
                      >
                        {game.id === "levelstair-punisher"
                          ? "View Dev Profile"
                          : "Play in Browser"}{" "}
                        <ExternalLink size={12} />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* YouTube at the bottom of this section */}
        <div className="mt-16 border-t border-line/30 pt-12">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
            YouTube Channels &amp; Video Edits
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="low-poly-card flex flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="flex items-center gap-1.5 font-semibold text-ink">
                    <svg
                      className="shrink-0 text-rose-600"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.872.555 9.388.555 9.388.555s7.516 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    @officialJoelEditz
                  </h4>
                  <span className="shrink-0 text-xs font-semibold text-ink-faint">
                    Active
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-dim">
                  YouTube channel for funny meme edits, tech humor, and motion
                  graphics.
                </p>
                <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-line bg-black">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/Wjs4PNejlw4"
                    title="JoelEditz Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="flex flex-wrap gap-1">
                  {["Video Editing", "After Effects", "Premiere Pro", "Motion Graphics"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
                <a
                  href="https://www.youtube.com/@officialJoelEditz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-grape hover:text-saffron"
                >
                  View Channel <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="low-poly-card flex flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="flex items-center gap-1.5 font-semibold text-ink">
                    <svg
                      className="shrink-0 text-rose-600"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.872.555 9.388.555 9.388.555s7.516 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    @Build2Learn
                  </h4>
                  <span className="shrink-0 text-xs font-semibold text-ink-faint">
                    Active
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-dim">
                  Educational channel on software concepts, languages, and networking.
                </p>
                <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-line bg-black">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/A2-6tZnyXjM"
                    title="Build2Learn Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="flex flex-wrap gap-1">
                  {["eLearning", "Motion Graphics", "Video Editing", "DevOps Education"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
                <a
                  href="https://www.youtube.com/@Build2Learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-grape hover:text-saffron"
                >
                  View Channel <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
