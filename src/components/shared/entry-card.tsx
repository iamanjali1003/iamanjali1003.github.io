import { ArrowUpRight } from "lucide-react"

import { RichText } from "@/components/shared/rich-text"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Entry } from "@/content/types"
import { cn } from "@/lib/utils"

export function EntryCard({ entry }: { entry: Entry }) {
  const { title, href, suffix, badge, date, action, subtitle, tech, points } = entry

  return (
    <Card className="p-5 transition-colors hover:border-muted-foreground/45 max-sm:p-4">
      <div className="mb-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="inline-flex flex-wrap items-center gap-2 text-[15px] font-semibold tracking-[-0.01em]">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
          {suffix && <span>{suffix}</span>}
          {badge && <Badge variant={badge.solid ? "default" : "outline"}>{badge.label}</Badge>}
        </h3>
        {date && (
          <span className="whitespace-nowrap font-mono text-xs text-muted-foreground max-sm:text-[11px]">
            {date}
          </span>
        )}
        {action && (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {action.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>

      {subtitle && (
        <p className="mb-3.5 text-[13px] text-muted-foreground">
          <RichText text={subtitle} />
        </p>
      )}
      {tech && <p className="mb-3.5 font-mono text-xs text-muted-foreground">{tech.join(" · ")}</p>}

      <ul className={cn("space-y-[7px]", !subtitle && !tech && "mt-2.5")}>
        {points.map((point) => (
          <li
            key={point}
            className="relative pl-[18px] text-sm leading-[1.65] text-muted-foreground before:absolute before:top-[9px] before:left-[3px] before:size-1 before:bg-muted-foreground/60 before:content-['']"
          >
            <RichText text={point} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
