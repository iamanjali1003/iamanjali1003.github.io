import { BulletList } from "@/components/shared/bullet-list"
import { RichText } from "@/components/shared/rich-text"
import type { ResumeEntry as Entry } from "@/content/types"

// A job, a degree or an achievement: the title with the dates on the right,
// a line under it, then either the one-line summary or the full points.
export function ResumeEntry({
  entry,
  brief = false,
  as: Heading = "h3",
}: {
  entry: Entry
  brief?: boolean
  /** One level below the card it sits in. */
  as?: "h3" | "h4"
}) {
  const { title, subtitle, date, summary, points } = entry

  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Heading className="font-medium tracking-tight">{title}</Heading>
        <span className="text-sm text-muted-foreground tabular-nums">{date}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        <RichText text={subtitle} />
      </p>
      {brief ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      ) : (
        <BulletList points={points} className="mt-3" />
      )}
    </article>
  )
}
