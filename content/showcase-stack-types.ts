export type ShowcaseStackItem = {
  name: string;
  detail?: string;
  href?: string;
};

export type ShowcaseStackCategory = {
  id: string;
  title: string;
  subtitle: string;
  accent: "grape" | "saffron" | "leaf";
  items: ShowcaseStackItem[];
};

export type ShowcaseAuthorLink = {
  label: string;
  href: string;
  kind: "linkedin" | "github" | "website";
};
