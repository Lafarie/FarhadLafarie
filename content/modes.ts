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
      base: "#0b1214",
      accent: "#2fd6a6",
      surface: "#12201e",
      backgroundUiverse: "dry-rabbit-69",
    },
    highlights: [
      "GitLab CI/CD · Docker · Kubernetes",
      "Ticket Portal — production deploy pipeline",
      "Sheet Ninja — containerized dev tooling",
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
      base: "#0f0b14",
      accent: "#8b4dc4",
      surface: "#1a1326",
      backgroundUiverse: "loud-parrot-63",
    },
    highlights: [
      "Next.js · React · TypeScript · Tailwind",
      "Ticket Portal · Sheet Ninja · AIducator",
      "End-to-end product delivery",
    ],
    featuredProjectIds: ["ticket-portal", "sheet-ninja", "aiducator"],
  },
  "content-creator": {
    id: "content-creator",
    label: "Content Creator",
    tabLabel: "content creator",
    tagline: "Stories, visuals, and experiences that connect.",
    intro:
      "I craft engaging content and creative digital experiences — from eLearning worlds to media-focused web projects.",
    character: {
      image: "/characters/content-creator.svg",
      alt: "Content creator character with camera and editing tools",
      props: ["camera", "editing-tool"],
    },
    theme: {
      base: "#140f0b",
      accent: "#ff6b9d",
      surface: "#261a18",
      backgroundUiverse: "slippery-bird-76",
    },
    highlights: [
      "AIducator — immersive 3D learning",
      "Visual storytelling & UI polish",
      "WordPress · creative web projects",
    ],
    featuredProjectIds: ["aiducator", "wordpress-movies"],
  },
};

/** Wireframe tab order: DevOps · Dev · Content Creator */
export const MODE_TAB_ORDER: ModeConfig["id"][] = [
  "devops",
  "developer",
  "content-creator",
];
