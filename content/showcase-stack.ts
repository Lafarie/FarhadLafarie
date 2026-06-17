import type { ShowcaseStackCategory } from "./showcase-stack-types";

export const STACK_CATEGORIES: ShowcaseStackCategory[] = [
  {
    id: "core",
    title: "App shell",
    subtitle: "UI, routing, styling",
    accent: "grape",
    items: [
      { name: "Next.js 16", detail: "App Router · RSC", href: "https://nextjs.org" },
      { name: "React 19", href: "https://react.dev" },
      { name: "TypeScript 5", href: "https://www.typescriptlang.org" },
      { name: "Tailwind CSS v4", href: "https://tailwindcss.com" },
      { name: "Lucide React", href: "https://lucide.dev" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & infra",
    subtitle: "CI/CD · containers",
    accent: "leaf",
    items: [
      { name: "Docker", href: "https://www.docker.com" },
      { name: "GitLab CI/CD", href: "https://docs.gitlab.com/ee/ci/" },
      { name: "Kubernetes", href: "https://kubernetes.io" },
      { name: "Linux", href: "https://www.linux.org" },
    ],
  },
  {
    id: "motion",
    title: "Motion",
    subtitle: "Scroll · animation",
    accent: "saffron",
    items: [
      { name: "GSAP", detail: "ScrollTrigger · snap", href: "https://gsap.com" },
      { name: "Lenis", detail: "Smooth scroll", href: "https://lenis.darkroom.engineering" },
      { name: "Framer Motion", href: "https://www.framer.com/motion" },
    ],
  },
  {
    id: "platform",
    title: "Deploy & tools",
    subtitle: "Ship-ready plumbing",
    accent: "grape",
    items: [
      { name: "Vercel", href: "https://vercel.com" },
      { name: "Cursor", href: "https://cursor.com" },
    ],
  },
];
