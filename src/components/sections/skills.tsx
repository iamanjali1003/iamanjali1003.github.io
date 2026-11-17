import { Section } from "@/components/sections/section"
import { skills } from "@/content/skills"

// Plain lists, not tags: the words are the point.
export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-4">
        {skills.map(({ title, items }) => (
          <div key={title} className="grid gap-1 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <dt className="text-[13px] text-muted-foreground sm:pt-px">{title}</dt>
            <dd className="text-sm leading-relaxed">{items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
