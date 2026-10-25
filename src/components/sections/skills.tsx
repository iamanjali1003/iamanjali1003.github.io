import { Section } from "@/components/sections/section"
import { Badge } from "@/components/ui/badge"
import { skills } from "@/content/skills"

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="grid gap-5">
        {skills.map(({ title, items }) => (
          <div key={title} className="grid gap-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-sm font-medium sm:pt-0.5">{title}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <Badge key={item} variant="outline" className="px-2 py-0.5 text-xs font-normal text-foreground">
                  {item}
                </Badge>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
