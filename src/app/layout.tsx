import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/layout/theme-provider"
import { profile } from "@/content/profile"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: "Anjali, software engineering student" }

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: profile.name,
  description:
    "Anjali is a software engineering student in Bengaluru who builds full-stack products with React, Next.js, Node.js, Java and Spring Boot on AWS.",
  keywords: [
    "Anjali", "software engineering student", "full stack developer", "software engineer intern",
    "React", "Next.js", "Node.js", "Java", "Spring Boot", "AWS", "MongoDB", "Bengaluru",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    locale: "en_IN",
    title: profile.name,
    description: profile.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.description,
    images: [ogImage],
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
  image: `${profile.url}/og-image.png`,
  jobTitle: profile.role,
  description: "Software engineering student in Bengaluru.",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "JSS Academy of Technical Education, Bengaluru" },
  knowsAbout: [
    "Software Engineering", "React", "Next.js", "Node.js", "TypeScript", "Java", "Spring Boot",
    "MongoDB", "MySQL", "Apache Kafka", "AWS", "Data Structures and Algorithms",
  ],
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode, profile.links.codechef],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body>
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
