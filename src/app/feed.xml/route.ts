import { absoluteUrl, siteConfig } from "@/config/site"
import { getPosts } from "@/lib/blog"

// An RSS 2.0 feed of the posts, at /feed.xml.
export const dynamic = "force-static"

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")

export function GET() {
  const posts = getPosts()
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}/`)
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${siteConfig.author.email} (${escape(siteConfig.author.name)})</author>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name)} · Blog</title>
    <link>${absoluteUrl("/blog/")}</link>
    <description>Notes on open source and building software, by ${escape(siteConfig.name)}.</description>
    <language>en-in</language>
    ${posts[0] ? `<lastBuildDate>${new Date(posts[0].updated ?? posts[0].date).toUTCString()}</lastBuildDate>` : ""}
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
