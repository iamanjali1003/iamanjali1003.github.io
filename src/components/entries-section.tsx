import type { LucideIcon } from "lucide-react"

import { EntryCard } from "@/components/entry-card"
import { Section } from "@/components/section"
import type { Entry } from "@/content/types"

// Experience, projects, achievements and education all render the same way:
// a titled section holding a stack of cards.
export function EntriesSection({
  id,
  title,
  icon,
  entries,
}: {
  id: string
  title: string
  icon: LucideIcon
  entries: Entry[]
}) {
  return (
    <Section id={id} title={title} icon={icon}>
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <EntryCard key={entry.title} entry={entry} />
        ))}
      </div>
    </Section>
  )
}
