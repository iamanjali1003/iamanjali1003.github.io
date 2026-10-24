import { Code } from "lucide-react"

import { Section } from "@/components/sections/section"
import { skills } from "@/content/skills"

export function Skills() {
  return (
    <Section id="skills" title="Technical Skills" icon={Code}>
      <div className="flex flex-col gap-5">
        {skills.map(({ title, icon: Icon, items }) => (
          <div key={title}>
            <h3 className="mb-2.5 flex items-center gap-[7px] text-xs font-medium tracking-[0.05em] text-muted-foreground uppercase">
              <Icon className="size-3.5" aria-hidden="true" />
              {title}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <li key={item} className="border bg-muted/50 px-[9px] py-[3px] text-xs">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
