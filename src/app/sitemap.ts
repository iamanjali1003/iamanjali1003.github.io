import type { MetadataRoute } from "next"

import { profile } from "@/content/profile"
import { posts } from "@/content/writing"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${profile.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...posts.map((post) => ({
      url: `${profile.url}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ]
}
