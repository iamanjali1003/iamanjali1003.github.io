import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Section } from "@/components/sections/section"
import { PostList } from "@/components/shared/post-list"
import { posts } from "@/content/writing"

// The three newest posts, with a link to the full list.
export function Writing() {
  return (
    <Section
      id="writing"
      title="Writing"
      action={
        <Link
          href="/blog/"
          className="inline-flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          All writing
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      }
    >
      <PostList posts={posts.slice(0, 3)} />
    </Section>
  )
}
