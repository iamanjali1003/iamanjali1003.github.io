import type { Entry, Post } from "./types"

// Newest first. A new post adds an entry here and its body in
// src/content/posts/<slug>.tsx, registered in src/app/blog/[slug]/page.tsx.
export const posts: Post[] = [
  {
    slug: "fence-posts-and-gaps",
    title: "Fence posts and gaps: the bug in my first Kubernetes PR",
    description:
      "Why a benchmark reported 1.25 requests per second when the real rate was 1.0, and what fixing it taught me about contributing to open source.",
    date: "2026-11-12",
    readingTime: "5 min read",
  },
]

// 2026-11-12 -> 12 Nov 2026, the same on every machine that builds the site.
export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
}

// The same posts as rows for the Writing section on the home page.
export const writing: Entry[] = posts.map(({ slug, title, description, date }) => ({
  title,
  href: `/blog/${slug}/`,
  date: formatPostDate(date),
  subtitle: description,
  points: [],
}))
