import type { ModeConfig } from "./types";

export const MODES: Record<ModeConfig["id"], ModeConfig> = {
  devops: {
    id: "devops",
    label: "DevOps",
    tabLabel: "devops",
    tagline: "Pipelines, containers, and cloud — shipped with care.",
    intro:
      "I design CI/CD workflows, containerized deployments, and reliable infrastructure so products reach production safely.",
    character: {
      image: "/characters/devops.svg",
      alt: "DevOps character with helmet and infrastructure tools",
      props: ["helmet", "pipeline"],
    },
    theme: {
      base: "#f4f6f0",
      accent: "#3a3a3a",
      surface: "#fbfdf8",
      backgroundUiverse: "dry-rabbit-69",
    },
    highlights: [
      "GitLab CI/CD · Docker · Kubernetes",
      "Cloud Infrastructure & Deployments",
      "Automation & Shell Scripting",
    ],
    featuredProjectIds: ["ticket-portal", "sheet-ninja"],
  },
  developer: {
    id: "developer",
    label: "Developer",
    tabLabel: "dev",
    tagline: "Full-stack apps with clean code and sharp UX.",
    intro:
      "From React frontends to Node APIs, I build responsive, high-performing web applications with modern tooling.",
    character: {
      image: "/characters/developer.svg",
      alt: "Developer character with laptop",
      props: ["laptop"],
    },
    theme: {
      base: "#f7f7f2",
      accent: "#3f3f3f",
      surface: "#fdfdf8",
      backgroundUiverse: "loud-parrot-63",
    },
    highlights: [
      "Next.js · React · TypeScript · Tailwind",
      "Full-Stack Web & Mobile Development",
      "Responsive UI & API Integrations",
    ],
    featuredProjectIds: ["ticket-portal", "sheet-ninja", "aiducator"],
  },
  "content-creator": {
    id: "content-creator",
    label: "Content Creator",
    tabLabel: "content creator",
    tagline: "Stories, visuals, and experiences that connect.",
    intro:
      "I craft engaging media, edit video content, and build digital learning experiences. I run @officialJoelEditz for funny meme edits and @Build2Learn for educational edits, merging technical topics with visual storytelling.",
    character: {
      image: "/characters/content-creator.svg",
      alt: "Content creator character with camera and editing tools",
      props: ["camera", "editing-tool"],
    },
    theme: {
      base: "#f9f6ef",
      accent: "#474747",
      surface: "#fffdf8",
      backgroundUiverse: "slippery-bird-76",
    },
    highlights: [
      "@officialJoelEditz — funny meme edits",
      "@Build2Learn — educational tech edits",
      "eLearning & Technical Visual Design",
      "Video Editing & Digital Storytelling",
    ],
    featuredProjectIds: ["ticket-portal", "sheet-ninja"],
  },
};

/** Wireframe tab order: DevOps · Dev · Content Creator */
export const MODE_TAB_ORDER: ModeConfig["id"][] = [
  "devops",
  "developer",
  "content-creator",
];
