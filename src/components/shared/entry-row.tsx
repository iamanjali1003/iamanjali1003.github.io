import { ArrowUpRight } from "lucide-react"

import { BulletList } from "@/components/shared/bullet-list"
import { RichText } from "@/components/shared/rich-text"
import type { Entry } from "@/content/types"
import { externalProps } from "@/lib/links"

// One item in a section: the title with a date or link on the right, a line
// under it, the points, and the stack.
export function EntryRow({ entry }: { entry: Entry }) {
  const { title, href, summary, date, action, subtitle, tech, points } = entry

  return (
    <article>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[15px] font-medium tracking-[-0.01em]">
          {href ? (
            <a href={href} {...externalProps(href)} className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {date && <p className="shrink-0 text-[13px] text-muted-foreground tabular-nums">{date}</p>}
        {action && (
          <a
            href={action.href}
            {...externalProps(action.href)}
            className="inline-flex shrink-0 items-center gap-0.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {action.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
      {summary && <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{summary}</p>}
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">
          <RichText text={subtitle} />
        </p>
      )}
      {points.length > 0 && <BulletList points={points} className="mt-3" />}
      {tech && <p className="mt-3 text-[13px] text-muted-foreground">{tech.join(" · ")}</p>}
    </article>
  )
}
