import Link from "next/link"

import { formatPostDate } from "@/content/writing"
import type { Post } from "@/content/types"

// Posts as rows: the title, and the date on the right. The blog index also
// shows each post's description.
export function PostList({ posts, withDescription = false }: { posts: Post[]; withDescription?: boolean }) {
  return (
    <ul className="grid gap-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}/`} className="group block">
            <span className="flex items-baseline justify-between gap-6">
              <span className="text-[15px] font-medium tracking-[-0.01em] text-balance underline-offset-4 group-hover:underline">
                {post.title}
              </span>
              <time dateTime={post.date} className="shrink-0 text-[13px] text-muted-foreground tabular-nums">
                {formatPostDate(post.date)}
              </time>
            </span>
            {withDescription && (
              <span className="mt-1.5 block max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
