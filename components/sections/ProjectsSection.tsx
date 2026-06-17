"use client";

import { SITE } from "@/content/site";
import { useMode } from "@/context/ModeContext";
import { ExternalLink } from "lucide-react";

export function ProjectsSection() {
  const { modeConfig } = useMode();

  const featured = SITE.projects.filter((p) =>
    modeConfig.featuredProjectIds.includes(p.id),
  );
  const rest = SITE.projects.filter(
    (p) => !modeConfig.featuredProjectIds.includes(p.id),
  );

  return (
    <section
      id="projects"
      className="snap-section flex min-h-[100dvh] flex-col justify-center px-6 py-24"
    >
      <div className="section-reveal mx-auto w-full max-w-6xl">
        <h2 className="low-poly-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          My Projects
        </h2>
        <p className="mt-3 max-w-2xl text-ink-dim">
          Featured for {modeConfig.label.toLowerCase()} — plus the full archive.
        </p>

        {/* Software Projects Grid */}
        <div className="mt-10">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
            Featured
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <li key={project.id} className="low-poly-card p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-ink">
                      {project.title}
                    </h4>
                    <span className="shrink-0 text-xs text-ink-faint">{project.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-dim">
                    {project.description}
                  </p>
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

        {/* YouTube Channels & Video Highlights for Content Creator mode */}
        {modeConfig.id === "content-creator" && (
          <div className="mt-16 border-t border-line/30 pt-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
              YouTube Channels &amp; Video Edits
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* Channel 1: officialJoelEditz */}
              <div className="low-poly-card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-ink flex items-center gap-1.5">
                      <svg className="text-rose-600 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.872.555 9.388.555 9.388.555s7.516 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      @officialJoelEditz
                    </h4>
                    <span className="shrink-0 text-xs text-ink-faint font-semibold">Active</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-dim">
                    My YouTube channel specializing in funny meme edits, tech humor, and motion graphics. Combined storytelling with fast-paced video edits and engaging visual pacing.
                  </p>
                  <div className="mt-4 overflow-hidden rounded-lg border border-line aspect-video bg-black">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/Wjs4PNejlw4"
                      title="JoelEditz Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex flex-wrap gap-1">
                    {["Video Editing", "After Effects", "Premiere Pro", "Motion Graphics"].map((t) => (
                      <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint">
                        {t}
                      </span>
                    ))}
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

              {/* Channel 2: Build2Learn */}
              <div className="low-poly-card p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-ink flex items-center gap-1.5">
                      <svg className="text-rose-600 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.872.555 9.388.555 9.388.555s7.516 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      @Build2Learn
                    </h4>
                    <span className="shrink-0 text-xs text-ink-faint font-semibold">Active</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-dim">
                    My educational YouTube channel dedicated to clarifying complex software concepts, programming languages, and networking infrastructure through visually rich lessons.
                  </p>
                  <div className="mt-4 overflow-hidden rounded-lg border border-line aspect-video bg-black">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/A2-6tZnyXjM"
                      title="Build2Learn Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex flex-wrap gap-1">
                    {["eLearning", "Motion Graphics", "Video Editing", "DevOps Education"].map((t) => (
                      <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[10px] text-ink-faint">
                        {t}
                      </span>
                    ))}
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
        )}

        {/* All Remaining Projects (Archive) */}
        {rest.length > 0 ? (
          <div className="mt-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-faint">
              More projects
            </h3>
            <ul className="mt-4 space-y-3">
              {rest.map((project) => (
                <li
                  key={project.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/50 py-3"
                >
                  <span className="font-medium text-ink">{project.title}</span>
                  <span className="text-xs text-ink-faint">{project.status}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
