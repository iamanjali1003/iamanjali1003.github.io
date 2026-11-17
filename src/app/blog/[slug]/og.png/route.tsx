import { formatPostDate, posts } from "@/content/writing"
import { renderOgImage } from "@/lib/og"

// Each post's share image, at /blog/<slug>/og.png: the post's own title, so a
// shared link shows what it's about rather than the site's card.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return new Response("Not found", { status: 404 })

  return renderOgImage({
    title: post.title,
    kicker: "Writing",
    footer: `${formatPostDate(post.date)} · ${post.readingTime}`,
  })
}
