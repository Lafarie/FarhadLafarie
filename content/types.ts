export type PortfolioMode = "developer" | "content-creator" | "devops";

export type SocialKind = "linkedin" | "github" | "website" | "instagram" | "twitter";

export type ServiceIconKey = "code" | "chart" | "calendar" | "users";

export type ProjectStatus = "Completed" | "In Progress";

export type ModeConfig = {
  id: PortfolioMode;
  label: string;
  tabLabel: string;
  tagline: string;
  intro: string;
  character: {
    image: string;
    alt: string;
    props: string[];
  };
  theme: {
    base: string;
    accent: string;
    surface: string;
    backgroundUiverse?: string;
  };
  highlights: string[];
  featuredProjectIds: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  status: ProjectStatus;
  tech: string[];
  featured?: boolean;
  tags: string[];
};

export type Service = {
  id: string;
  title: string;
  description: string;
  iconKey: ServiceIconKey;
  gradient: string;
};

export type Section = {
  id: string;
  label: string;
  order: number;
};

export type SocialLink = {
  label: string;
  href: string;
  kind: SocialKind;
};

export type SiteContent = {
  meta: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    cvUrl: string;
    jobTitles: string[];
  };
  hero: {
    welcomeTitle: string;
    defaultMode: PortfolioMode;
    modeEyebrow: string;
    intro: string;
  };
  stats: {
    projects: number;
    languages: number;
    years: number;
    clients: number;
  };
  services: Service[];
  projects: Project[];
  faq: {
    emptyMessage: string;
    emptyTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    recipientEmail: string;
    placeholders: {
      email: string;
      subject: string;
      message: string;
    };
    labels: {
      email: string;
      subject: string;
      message: string;
      submit: string;
    };
  };
  stack: {
    label: string;
    title: string;
    intro: string;
  };
  social: SocialLink[];
  nav: { id: string; label: string; href: string }[];
  sections: Section[];
  modes: Record<PortfolioMode, ModeConfig>;
};
