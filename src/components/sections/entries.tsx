import { Section } from "@/components/sections/section"
import { EntryRow } from "@/components/shared/entry-row"
import { ProjectCard } from "@/components/shared/project-card"
import type { Entry } from "@/content/types"

// Projects are separate things you can open, so they get cards. Experience,
// education and achievements read as a list, so they stay plain rows.
export function Entries({
  id,
  title,
  entries,
  as = "rows",
}: {
  id: string
  title: string
  entries: Entry[]
  as?: "rows" | "cards"
}) {
  return (
    <Section id={id} title={title}>
      {as === "cards" ? (
        <div className="grid gap-3">
          {entries.map((entry) => (
            <ProjectCard key={entry.title} project={entry} />
          ))}
        </div>
      ) : (
        <div className="grid gap-10">
          {entries.map((entry) => (
            <EntryRow key={entry.title} entry={entry} />
          ))}
        </div>
      )}
    </Section>
  )
}
