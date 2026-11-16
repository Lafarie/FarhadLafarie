export type AchievementCategory =
  | "all"
  | "award"
  | "hackathon"
  | "certification"
  | "community";

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  year: string;
  badge: string;
  category: "award" | "hackathon" | "certification" | "community";
  description: string;
  tags: string[];
  link?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  // Awards & Winning Recognition
  {
    id: "nasa-space-apps",
    title: "NASA Space Apps Challenge",
    organization: "NASA (National Aeronautics and Space Administration)",
    year: "2024",
    badge: "GLOBAL NOMINEE",
    category: "award",
    description:
      "Nominated globally in NASA's flagship international hackathon, developing collaborative solutions for space exploration and earth science challenges.",
    tags: ["Space Science", "Global Hackathon", "Data Modeling"],
  },
  {
    id: "levelstair-game-jam",
    title: "LevelStair Monthly 24-Hour Game Jam",
    organization: "LevelStair Game Developers",
    year: "2024",
    badge: "ACHIEVEMENT AWARD",
    category: "award",
    description:
      "Honored with an Achievement Award on Sri Lanka's verified game development portal for rapid concept-to-deployment game engineering within a strict 24-hour sprint.",
    tags: ["Game Development", "Unity / WebGL", "24-Hour Sprint"],
  },
  // Competitive Hackathons & AI Challenges
  {
    id: "kapruka-agent-challenge",
    title: "Kapruka Agent Challenge",
    organization: "Kapruka.com",
    year: "2026",
    badge: "CHALLENGE PARTICIPANT",
    category: "hackathon",
    description:
      "Participated in the national AI agent competition, engineering Kapruka Agra — an autonomous conversational shopping concierge with Model Context Protocol (MCP), Claude API, and dynamic catalog routing.",
    tags: ["Autonomous Agents", "MCP", "Claude API", "AI Challenge"],
  },
  {
    id: "hutch-ignitex",
    title: "HUTCH IgnitX",
    organization: "HUTCH Sri Lanka",
    year: "2026",
    badge: "HACKATHON PARTICIPANT",
    category: "hackathon",
    description:
      "Participated in HUTCH's nationwide innovation challenge and hackathon, engineering digital prototypes and solutions for customer experience automation.",
    tags: ["Telecom", "Digital Innovation", "Rapid Prototyping"],
    link: "https://hutch.lk/ignitex/",
  },

  // Competitive Hackathons & Problem Solving
  {
    id: "codesprint-7",
    title: "CodeSprint 7.0",
    organization: "Inter-University Algorithmic Hackathon",
    year: "2024",
    badge: "HACKATHON PARTICIPANT",
    category: "hackathon",
    description:
      "Competed in Sri Lanka's annual premier inter-university algorithmic and software engineering competition.",
    tags: ["Competitive Engineering", "Algorithms", "Rapid Prototyping"],
  },
  {
    id: "tech-triathlon",
    title: "Tech Triathlon",
    organization: "Rootcode Labs",
    year: "2024",
    badge: "ROOTCODE PARTICIPANT",
    category: "hackathon",
    description:
      "Participated in a multi-tier engineering competition solving complex architectural, algorithmic, and full-stack software challenges.",
    tags: ["Full-Stack", "System Design", "Problem Solving"],
  },
  {
    id: "westminster-problem-solving",
    title: "Problem Solving International Hackathon",
    organization: "University of Westminster",
    year: "2024",
    badge: "WESTMINSTER HACKATHON",
    category: "hackathon",
    description:
      "Tackled algorithmic and analytical software engineering problems in an international university-level hackathon.",
    tags: ["Algorithms", "Problem Solving", "Data Structures"],
  },

  // Professional Industry Certifications
  {
    id: "azure-ai-900",
    title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    organization: "Microsoft",
    year: "2025",
    badge: "VERIFIED CERTIFICATION",
    category: "certification",
    description:
      "Validated foundational knowledge of machine learning, computer vision, natural language processing, and generative AI workloads on Microsoft Azure.",
    tags: ["Cloud AI", "Azure", "Machine Learning"],
  },
  {
    id: "ai-2d-game-dev",
    title: "AI-Assisted 2D Game Development Program",
    organization: "Certified Completion",
    year: "2025",
    badge: "CERTIFIED PROGRAM",
    category: "certification",
    description:
      "Comprehensive training in procedural 2D game mechanics, AI-assisted asset workflows, and Unity runtime architecture.",
    tags: ["Unity", "Game Architecture", "AI Workflows"],
  },
  {
    id: "devops-iac",
    title: "DevOps Foundations: Infrastructure as Code (IaC)",
    organization: "LinkedIn Learning",
    year: "2026",
    badge: "IaC & AUTOMATION",
    category: "certification",
    description:
      "Mastered declarative cloud provisioning, Ansible automation playbooks, and Git-driven infrastructure configuration.",
    tags: ["DevOps", "Infrastructure as Code", "Ansible"],
  },
  {
    id: "learning-kubernetes",
    title: "Learning Kubernetes",
    organization: "LinkedIn Learning",
    year: "2026",
    badge: "CONTAINER ORCHESTRATION",
    category: "certification",
    description:
      "Hands-on orchestration covering Kubernetes Pods, Deployments, ReplicaSets, Services, ConfigMaps, and cluster networking.",
    tags: ["Kubernetes", "Containers", "Cloud Native"],
  },
  {
    id: "react-cert",
    title: "React Certification",
    organization: "LinkedIn Learning",
    year: "2024",
    badge: "FRONTEND ARCHITECTURE",
    category: "certification",
    description:
      "Demonstrated proficiency in modern React architecture, custom hooks, component lifecycles, and high-performance state management.",
    tags: ["React", "JavaScript", "Frontend Architecture"],
  },

  // Community & Volunteering
  {
    id: "rotary-sunshine-games",
    title: "Rotary Club Sunshine Games",
    organization: "Rotary International",
    year: "2025",
    badge: "VOLUNTEER OPERATIONS",
    category: "community",
    description:
      "Volunteered in event logistics, field operations, and activity facilitation for youth and participants with special needs.",
    tags: ["Volunteer", "Community Impact", "Event Operations"],
  },
  {
    id: "skillup-programme",
    title: "SkillUp Professional Development Programme",
    organization: "Leo Club of IIT",
    year: "2023",
    badge: "PROFESSIONAL DEVELOPMENT",
    category: "community",
    description:
      "Completed structured training in corporate communication, leadership, and technical team collaboration.",
    tags: ["Leadership", "Professional Skills", "Collaboration"],
  },
];
