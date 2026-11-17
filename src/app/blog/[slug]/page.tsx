import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/layout/container"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import FencePostsAndGaps from "@/content/posts/fence-posts-and-gaps"
import { profile } from "@/content/profile"
import { formatPostDate, posts } from "@/content/writing"
import { OG_SIZE } from "@/lib/og"

// Every post's body, by slug. The static export builds one page per entry in posts.
const bodies: Record<string, () => React.JSX.Element> = {
  "fence-posts-and-gaps": FencePostsAndGaps,
}

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}

  const url = `/blog/${post.slug}/`
  // Drawn by ./og.png/route.tsx from the post's title.
  const image = { url: `/blog/${post.slug}/og.png`, ...OG_SIZE, alt: post.title }
  return {
    title: `${post.title} · ${profile.name}`,
    description: post.description,
    authors: [{ name: profile.name, url: `${profile.url}/` }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: profile.name,
      locale: "en_IN",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [profile.name],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  const Body = bodies[slug]
  if (!post || !Body) notFound()

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${profile.url}/blog/${post.slug}/`,
    image: `${profile.url}/blog/${post.slug}/og.png`,
    author: { "@type": "Person", name: profile.name, url: `${profile.url}/` },
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Container as="article" className="pt-10 sm:pt-16">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Writing
          </Link>
          <h1 className="mt-8 text-[clamp(30px,5vw,42px)] leading-[1.1] font-semibold tracking-[-0.035em] text-balance">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">{post.description}</p>
          <p className="mt-6 border-b pb-10 text-[13px] text-muted-foreground tabular-nums">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingTime}
          </p>
          <Body />
          <div className="mt-16 flex items-center justify-between gap-4 border-t pt-8 text-[13px]">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              All writing
            </Link>
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
              About {profile.name}
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </>
  )
}
