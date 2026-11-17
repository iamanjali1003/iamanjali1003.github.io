import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import type { PostSummary } from "@/lib/blog"

function PagerCard({ href, label, title, align }: { href: string; label: React.ReactNode; title: string; align: "left" | "right" }) {
  return (
    <Card className={`relative gap-1 p-4 transition-colors hover:bg-accent/40 ${align === "right" ? "text-right sm:col-start-2" : ""}`}>
      <span className={`flex items-center gap-1 text-xs text-muted-foreground ${align === "right" ? "justify-end" : ""}`}>{label}</span>
      <Link href={href} className="text-sm font-medium after:absolute after:inset-0">
        {title}
      </Link>
    </Card>
  )
}

// The posts either side of this one, or the blog when there are none.
export function PostPager({ newer, older }: { newer?: PostSummary; older?: PostSummary }) {
  return (
    <nav aria-label="More posts" className="mt-14 grid gap-3 sm:grid-cols-2">
      {older ? (
        <PagerCard href={`/blog/${older.slug}/`} label={<><ArrowLeft className="size-3" aria-hidden="true" />Older</>} title={older.title} align="left" />
      ) : (
        <PagerCard href="/blog/" label={<><ArrowLeft className="size-3" aria-hidden="true" />All posts</>} title="Blog" align="left" />
      )}
      {newer && (
        <PagerCard href={`/blog/${newer.slug}/`} label={<>Newer<ArrowRight className="size-3" aria-hidden="true" /></>} title={newer.title} align="right" />
      )}
    </nav>
  )
}
