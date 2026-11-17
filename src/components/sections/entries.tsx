import { Section } from "@/components/sections/section"
import { EntryRow } from "@/components/shared/entry-row"
import type { Entry } from "@/content/types"

// Projects, experience, achievements and education all share one row layout.
export function Entries({ id, title, entries }: { id: string; title: string; entries: Entry[] }) {
  return (
    <Section id={id} title={title}>
      <div className="grid gap-12">
        {entries.map((entry) => (
          <EntryRow key={entry.title} entry={entry} />
        ))}
      </div>
    </Section>
  )
}
