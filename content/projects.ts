import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "ticket-portal",
    title: "Ticket Portal 2025",
    description:
      "A full-stack event ticketing platform with QR-based entry, real-time dashboards, and mobile apps for iOS and Android. Built with Next.js, Prisma, PostgreSQL, and Docker, deployed via GitLab CI/CD.",
    image:
      "https://i.ibb.co/hJ7126s9/Screenshot-12-2-2026-01334-ticket-hsenidmobile-com.jpg",
    link: "https://ticket.rush.lk",
    status: "Completed",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Docker", "React Native", "GitLab CI/CD"],
    featured: true,
    tags: ["developer", "devops", "full-stack"],
  },
  {
    id: "sheet-ninja",
    title: "Sheet Ninja 2025",
    description:
      "A developer productivity tool that converts GitLab project data into formatted Excel reports. Built with Next.js, TypeScript, Prisma, and Docker for streamlined project tracking.",
    image: "https://tobias-sell.com/wp-content/uploads/2020/10/header.jpg",
    link: "https://github.com/Lafarie/Sheet-Ninja",
    status: "Completed",
    tech: ["Next.js", "TypeScript", "Prisma", "Docker", "GitLab API"],
    featured: true,
    tags: ["developer", "devops"],
  },
  {
    id: "aiducator",
    title: "AIducator 2024",
    description:
      "A 3D eLearning platform that teaches students more efficiently. Built with Vite.js, Node.js, Express and ChatGPT API for an immersive learning experience.",
    image: "https://i.ibb.co/MSTKtD5/Screenshot-2024-07-11-at-9-22-37-AM.png",
    link: "https://aiducator.vercel.app/",
    status: "Completed",
    tech: ["Vite.js", "Node.js", "Express", "ChatGPT API"],
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
    id: "wordpress-movies",
    title: "WordPress Movies 2021",
    description:
      "A movie sharing website built using WordPress with custom themes and plugins for enhanced user experience.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmRBmntSxZh99CBluc1Y-1vEERXQc9HqBbFg&s",
    status: "Completed",
    tech: ["WordPress", "PHP", "MySQL"],
    tags: ["developer", "content"],
  },
];
