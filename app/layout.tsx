import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/app/components/navbar";
import { VibeButton } from "@/components/ui/VibeButton";
import { VibeProvider } from "@/context/VibeContext";
import Script from "next/script";
import "@/styles/globals.css";
import "@/styles/portfolio.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://farhad-lafarie.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: "Farhad Lafarie | DevOps & Full-Stack Developer Portfolio",
  description:
    "Explore the professional portfolio of Farhad Lafarie, a DevOps Engineer and Full-Stack Developer specializing in CI/CD, cloud infrastructure, containerization, and responsive web development.",
  keywords:
    "Farhad Lafarie Portfolio, DevOps Engineer, Full-Stack Developer, CI/CD, Docker, Kubernetes, React, Node.js, Cloud Infrastructure, Linux, GitLab",
  authors: [{ name: "Farhad Lafarie" }],
  creator: "Farhad Lafarie",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Farhad Lafarie | DevOps & Full-Stack Developer Portfolio",
    description:
      "Explore the professional portfolio of Farhad Lafarie, a DevOps Engineer and Full-Stack Developer specializing in CI/CD, cloud infrastructure, containerization, and responsive web development.",
    url: "https://farhad-lafarie.vercel.app",
    siteName: "Farhad Lafarie Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Farhad Lafarie Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhad Lafarie | DevOps & Full-Stack Developer Portfolio",
    description:
      "Explore the professional portfolio of Farhad Lafarie, a DevOps Engineer and Full-Stack Developer specializing in CI/CD, cloud infrastructure, containerization, and responsive web development.",
    images: ["/logo.png"],
    creator: "@farhadlafarie",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "uCDa5RDTzf_gy78wGIhOmTOdT-bneKzcIddHZ68F9mQ",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Farhad Lafarie",
    url: "https://farhad-lafarie.vercel.app",
    image: "https://farhad-lafarie.vercel.app/logo.png",
    jobTitle: ["DevOps Engineer", "Full-Stack Developer"],
    email: "farhadlafarie@gmail.com",
    telephone: "+94776350933",
    location: {
      "@type": "Place",
      address: "Dehiwala, Sri Lanka",
    },
    sameAs: [
      "https://www.linkedin.com/in/farhad-lafarie/",
      "https://github.com/Lafarie",
    ],
    description:
      "Experienced DevOps Engineer and Software Engineering undergraduate specializing in CI/CD pipelines, cloud infrastructure, and full-stack development.",
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-hidden bg-base text-ink">
        <VibeProvider>
          <Navbar />
          <VibeButton />
          {children}
        </VibeProvider>
      </body>
    </html>
  );
}
