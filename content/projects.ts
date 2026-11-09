import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "storedeck",
    title: "Storedeck 2026",
    description:
      "Merchant admin + public storefront monorepo (Next.js, Turbo, Prisma, Postgres, Redis, Keycloak). Shops are multi-tenant, pages live as config, deploy notes for AWS Mumbai.",
    image:
      "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=800&q=80",
    link: "https://github.com/Lafarie/Storedeck",
    status: "Completed",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Turbo",
      "Keycloak",
      "AWS",
    ],
    featured: true,
    tags: ["developer", "devops", "full-stack"],
  },
  {
    id: "kapruka",
    title: "Kapruka Agra 2026",
    description:
      "Chat shopping assistant for Kapruka.com using MCP tools, a streaming agent, product cards, cart, and guest checkout. Supports English, Sinhala, and Tanglish.",
    image:
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80",
    link: "https://kapruka-agra.vercel.app/",
    status: "Completed",
    tech: [
      "Next.js",
      "TypeScript",
      "MCP",
      "Claude / GPT",
      "Framer Motion",
      "Tailwind",
    ],
    featured: true,
    tags: ["developer", "full-stack", "content"],
  },
  {
    id: "ticket-portal",
    title: "Ticket Portal 2025",
    description:
      "Live-event ticketing with Docker + GitLab CI/CD, QR flow, and a React Native door scanner on the Play Store. Real events, real tickets.",
    image:
      "https://i.ibb.co/hJ7126s9/Screenshot-12-2-2026-01334-ticket-hsenidmobile-com.jpg",
    link: "https://serendisco.rush.lk/",
    status: "Completed",
    tech: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "React Native",
      "GitLab CI/CD",
      "SonarQube",
    ],
    featured: true,
    tags: ["developer", "devops", "full-stack"],
  },
  {
    id: "sheet-ninja",
    title: "Sheet Ninja 2025",
    description:
      "Two-way sync between GitLab and Google Sheets so PMs and engineers stop copy-pasting. Docker deploy, setup wizard, encrypted credentials.",
    image: "https://tobias-sell.com/wp-content/uploads/2020/10/header.jpg",
    link: "https://github.com/Lafarie/Sheet-Ninja",
    status: "Completed",
    tech: ["Next.js", "TypeScript", "Prisma", "Docker", "GitLab API", "NextAuth.js"],
    featured: true,
    tags: ["developer", "devops"],
  },
  {
    id: "appigo-retailer",
    title: "appiGo Retailer 2024",
    description:
      "Docker and GitLab build path for a live eCommerce builder: staging then production, Apache tuning when pages get slow.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    link: "https://appigo.co/stores/",
    status: "In Progress",
    tech: ["Docker", "GitLab CI/CD", "Apache", "Linux", "Bash"],
    featured: true,
    tags: ["devops"],
  },
  {
    id: "aiducator",
    title: "AIducator 2024",
    description:
      "Student-team eLearning app with ChatGPT tutoring and a 3D model viewer. Sentry on environments so crashes had stack traces for debugging.",
    image: "https://i.ibb.co/MSTKtD5/Screenshot-2024-07-11-at-9-22-37-AM.png",
    link: "https://aiducator.vercel.app/",
    status: "Completed",
    tech: ["React.js", "Node.js", "Express", "ChatGPT API", "Sentry"],
    featured: true,
    tags: ["developer", "content"],
  },
  {
    id: "uniconnect",
    title: "UniConnect 2024",
    description:
      "An ongoing project to connect students and lecturers in one place to share knowledge and help each other. Built with Flutter for cross-platform compatibility.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK21JiYnXoWX-FOTfqA7w8L3oXv1cq_9ZcVg&s",
    status: "In Progress",
    tech: ["Flutter", "Dart"],
    tags: ["developer", "mobile"],
  },
  {
    id: "whatsapp-bot",
    title: "WhatsApp Bot 2022",
    description:
      "An automated bot for WhatsApp built with Node.js for efficient message handling and automation.",
    image:
      "https://play-lh.googleusercontent.com/MWV1erZURmTaeXGj29ZLWMSo_7DB92q3IL71lDSRooqbb3qidsa4c9DJ0_jEQgOeXEQ=w416-h235-rw",
    status: "Completed",
    tech: ["Node.js", "JavaScript"],
    tags: ["developer"],
  },
  {
    id: "telegram-bot",
    title: "Telegram Bot 2022",
    description:
      "An automated bot for Telegram built with Python for smart message processing.",
    image:
      "https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2023/08/1-1.webp?ssl=1&quality=80&w=f",
    status: "Completed",
    tech: ["Python", "Telegram API"],
    tags: ["developer"],
  },
  {
    id: "wordpress-ecommerce",
    title: "WordPress eCommerce Site 2021",
    description:
      "WordPress storefront for selling products online: catalog, cart, and checkout with custom theme work and plugins.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    status: "Completed",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    tags: ["developer", "content"],
  },
];
