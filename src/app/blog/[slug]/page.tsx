import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Separator } from "@/components/ui/separator"
import FencePostsAndGaps from "@/content/posts/fence-posts-and-gaps"
import { profile } from "@/content/profile"
import { formatPostDate, posts } from "@/content/writing"

// Every post's body, by slug. The static export builds one page per entry in posts.
const bodies: Record<string, () => React.JSX.Element> = {
  "fence-posts-and-gaps": FencePostsAndGaps,
}

const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: "Anjali, software engineering student" }

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
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [ogImage] },
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
    image: `${profile.url}/og-image.png`,
    author: { "@type": "Person", name: profile.name, url: `${profile.url}/` },
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-4xl px-6 max-sm:px-4">
        <article className="mx-auto max-w-[42rem] pt-14 pb-24 max-sm:pt-10 max-sm:pb-16">
          <Link
            href="/#writing"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Writing
          </Link>
          <h1 className="mt-8 text-[clamp(28px,4.6vw,40px)] leading-[1.1] font-semibold tracking-[-0.035em] text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-pretty text-muted-foreground">{post.description}</p>
          <p className="mt-5 text-[13px] text-muted-foreground tabular-nums">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingTime}
          </p>
          <Separator className="mt-10 mb-2" />
          <Body />
        </article>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
    </>
  )
}
