import { BulletList } from "@/components/shared/bullet-list"
import { RichText } from "@/components/shared/rich-text"
import { Badge } from "@/components/ui/badge"
import type { Entry } from "@/content/types"

// Experience, education and achievements: a heading row with the date on the
// right, an optional line under it, then the points.
export function EntryRow({ entry }: { entry: Entry }) {
  const { title, href, badge, date, subtitle, points } = entry

  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="flex flex-wrap items-center gap-2 text-base font-semibold tracking-[-0.01em]">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
          {badge && <Badge variant={badge.solid ? "default" : "outline"}>{badge.label}</Badge>}
        </h3>
        {date && <p className="text-[13px] text-muted-foreground tabular-nums">{date}</p>}
      </div>
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">
          <RichText text={subtitle} />
        </p>
      )}
      <div className="mt-3">
        <BulletList points={points} />
      </div>
    </article>
  )
}
