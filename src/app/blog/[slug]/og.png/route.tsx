import { getPost, getPosts } from "@/lib/blog"
import { formatDate } from "@/lib/format"
import { renderOgImage } from "@/lib/og"

// Each post's share image, at /blog/<slug>/og.png: the post's own title, so a
// shared link shows what it's about.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) return new Response("Not found", { status: 404 })

  return renderOgImage({
    title: post.title,
    kicker: "Blog",
    footer: `${formatDate(post.date)} · ${post.readingTime}`,
  })
}
