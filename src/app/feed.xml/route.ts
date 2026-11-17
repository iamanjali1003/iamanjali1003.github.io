import { profile } from "@/content/profile"
import { posts } from "@/content/writing"

// An RSS feed of the posts, at /feed.xml.
export const dynamic = "force-static"

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function GET() {
  const items = posts
    .map((post) => {
      const url = `${profile.url}/blog/${post.slug}/`
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(profile.name)} · Writing</title>
    <link>${profile.url}/blog/</link>
    <description>Notes on open source and building software, by ${escape(profile.name)}.</description>
    <language>en-in</language>
    <atom:link href="${profile.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
