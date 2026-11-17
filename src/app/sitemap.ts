import type { MetadataRoute } from "next"

import { pages } from "@/config/pages"
import { absoluteUrl } from "@/config/site"
import { getPosts } from "@/lib/blog"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts()
  const latest = posts[0] ? new Date(posts[0].updated ?? posts[0].date) : new Date()

  return [
    // Only the blog and posts get a last-modified date: theirs is known. A build
    // date on every page would tell search engines everything changed each deploy.
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...Object.values(pages).map(({ path }) => ({
      url: absoluteUrl(path),
      ...(path === pages.blog.path && { lastModified: latest }),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ]
}
