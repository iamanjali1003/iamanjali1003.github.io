import type { LucideIcon } from "lucide-react"

import { Section } from "@/components/sections/section"
import { EntryCard } from "@/components/shared/entry-card"
import type { Entry } from "@/content/types"
import { cn } from "@/lib/utils"

// Experience, projects, achievements and education all render the same way:
// a numbered section holding cards, in one column or, for short cards, two.
export function Entries({
  id,
  index,
  title,
  icon,
  entries,
  columns = 1,
}: {
  id: string
  index: string
  title: string
  icon: LucideIcon
  entries: Entry[]
  columns?: 1 | 2
}) {
  return (
    <Section id={id} index={index} title={title} icon={icon}>
      <div className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2")}>
        {entries.map((entry) => (
          <EntryCard key={entry.title} entry={entry} />
        ))}
      </div>
    </Section>
  )
}
