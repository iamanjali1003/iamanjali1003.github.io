import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/layout/theme-provider"
import { profile } from "@/content/profile"
import { SITE_IMAGE } from "@/lib/og"

import "./globals.css"

// Inter's optical-size axis switches large text, like the name, to its display cut.
const inter = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--font-inter", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: profile.name,
  description:
    "Anjali is a software engineering student in Bengaluru and a Kubernetes contributor who builds full-stack products with React, Next.js, Node.js, Java and Spring Boot on AWS.",
  keywords: [
    "Anjali", "software engineering student", "full stack developer", "software engineer", "Kubernetes",
    "open source", "React", "Next.js", "Node.js", "Java", "Spring Boot", "AWS", "Bengaluru",
  ],
  authors: [{ name: profile.name }],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${profile.name} · Writing` }] },
  },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    locale: "en_IN",
    title: profile.name,
    description: profile.description,
    images: [SITE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.description,
    images: [SITE_IMAGE],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: `${profile.url}/`,
  image: `${profile.url}/og.png`,
  jobTitle: profile.role,
  description: "Software engineering student in Bengaluru and Kubernetes contributor.",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "JSS Academy of Technical Education, Bengaluru" },
  knowsAbout: [
    "Software Engineering", "Kubernetes", "React", "Next.js", "Node.js", "TypeScript", "Java", "Spring Boot",
    "MongoDB", "MySQL", "Apache Kafka", "AWS", "Data Structures and Algorithms",
  ],
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode, profile.links.codechef],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-foreground"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  )
}
