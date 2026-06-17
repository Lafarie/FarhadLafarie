import { MODES } from "./modes";
import { PROJECTS } from "./projects";
import { SECTIONS } from "./sections";
import type { SiteContent } from "./types";

export const SITE: SiteContent = {
  meta: {
    name: "Farhad Lafarie",
    title: "Farhad Lafarie - DevOps Engineer & Full-Stack Developer",
    email: "farhadlafarie@gmail.com",
    phone: "+94776350933",
    location: "Dehiwala, Sri Lanka",
    cvUrl: "/FarhadLafarieCV.pdf",
    jobTitles: ["DevOps Engineer", "Full-Stack Developer"],
  },
  hero: {
    welcomeTitle: "Welcome to My Portfolio",
    defaultMode: "devops",
    modeEyebrow: "mode",
    intro:
      "I'm a passionate developer with a focus on creating engaging and efficient user experiences. With a background in Software Engineering and a keen eye for design, I specialize in developing responsive, high-performing websites and applications using the latest web technologies.",
  },
  stats: {
    projects: 10,
    languages: 15,
    years: 3,
    clients: 5,
  },
  services: [
    {
      id: "full-stack",
      title: "Full-Stack Web Development",
      description: "Creating end-to-end web solutions with modern technologies.",
      iconKey: "code",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description:
        "Building cross-platform mobile applications with Flutter and React Native.",
      iconKey: "chart",
      gradient: "from-green-500 to-teal-600",
    },
    {
      id: "management",
      title: "Website Management & Services",
      description: "Ongoing maintenance, updates, and performance optimization.",
      iconKey: "calendar",
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: "ui-ux",
      title: "UI/UX Development",
      description: "Creating beautiful, intuitive, and responsive user interfaces.",
      iconKey: "users",
      gradient: "from-pink-500 to-rose-600",
    },
  ],
  projects: PROJECTS,
  faq: {
    emptyTitle: "Nobody has asked a question yet",
    emptyMessage:
      "Be the first to ask a question through the contact form below!",
  },
  contact: {
    title: "Contact Me",
    subtitle:
      "Got a technical issue? Want to talk about your future projects? Need details about my services? Let me know!",
    recipientEmail: "farhadlafarie@gmail.com",
    placeholders: {
      email: "name@email.com",
      subject: "Let me know how I can help you",
      message: "Share your thoughts or questions...",
    },
    labels: {
      email: "Your email",
      subject: "Subject",
      message: "Your message",
      submit: "Send Message",
    },
  },
  stack: {
    label: "Stack",
    title: "Tools behind this site & my projects",
    intro:
      "Frameworks, motion libraries, and platform tooling I use to design, build, and ship.",
  },
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/farhad-lafarie/",
      kind: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/Lafarie",
      kind: "github",
    },
    {
      label: "Website",
      href: "https://farhad-lafarie.vercel.app/",
      kind: "website",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/farhad.xd/",
      kind: "instagram",
    },
    {
      label: "X (Twitter)",
      href: "https://x.com/FLafarie",
      kind: "twitter",
    },
  ],
  nav: [
    { id: "featured", label: "Home", href: "#featured" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  sections: SECTIONS,
  modes: MODES,
};

export type { SiteContent, PortfolioMode, ModeConfig, Project } from "./types";
export { PROJECTS } from "./projects";
export { MODES, MODE_TAB_ORDER } from "./modes";
export { SECTIONS } from "./sections";
