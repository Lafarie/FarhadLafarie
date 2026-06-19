import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Automatically gets the current date format (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split("T")[0];

  return [
    {
      url: "https://farhad-lafarie.vercel.app",
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://farhad-lafarie.vercel.app/portfolio",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://farhad-lafarie.vercel.app/cv",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
