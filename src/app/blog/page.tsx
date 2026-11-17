import { Rss } from "lucide-react"
import type { Metadata } from "next"

import { PostCard } from "@/components/blog/post-card"
import { JsonLd } from "@/components/shared/json-ld"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { pages } from "@/config/pages"
import { getPosts, toSummary } from "@/lib/blog"
import { blogSchema, breadcrumbSchema } from "@/lib/json-ld"
import { createMetadata } from "@/lib/seo"

const page = pages.blog

export const metadata: Metadata = createMetadata(page)

export default function BlogPage() {
  const posts = getPosts()

  return (
    <>
      <JsonLd graph={[blogSchema(posts), breadcrumbSchema([{ name: page.title, path: page.path }])]} />
      <PageHeader page={page}>
        <Button variant="outline" size="sm" asChild>
          <a href="/feed.xml">
            <Rss />
            RSS feed
          </a>
        </Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={toSummary(post)} as="h2" />
        ))}
      </div>
    </>
  )
}
