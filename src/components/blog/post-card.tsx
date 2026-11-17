import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import type { PostSummary } from "@/lib/blog"
import { formatDate } from "@/lib/format"

// A post as a card that links to it: date, title, description.
export function PostCard({ post, as: Heading = "h3" }: { post: PostSummary; as?: "h2" | "h3" }) {
  return (
    <Card className="group relative h-full gap-0 p-6 transition-colors hover:bg-accent/40">
      <p className="text-xs text-muted-foreground tabular-nums">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
      </p>
      <Heading className="mt-2 font-semibold tracking-tight text-balance underline-offset-4 group-hover:underline">
        {/* The link covers the whole card, so any click on it opens the post. */}
        <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">{post.description}</p>
      <span aria-hidden="true" className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
        Read
        <ArrowRight className="size-4" />
      </span>
    </Card>
  )
}
