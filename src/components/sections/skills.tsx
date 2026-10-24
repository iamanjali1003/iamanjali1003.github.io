import { Code } from "lucide-react"

import { Section } from "@/components/sections/section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { skills } from "@/content/skills"

export function Skills({ index }: { index: string }) {
  return (
    <Section id="skills" index={index} title="Skills" icon={Code}>
      <div className="grid gap-3 sm:grid-cols-2">
        {skills.map(({ title, icon: Icon, items }) => (
          <Card key={title} className="gap-3.5 py-4">
            <CardHeader className="px-4">
              <CardTitle className="flex items-center gap-2 text-xs font-medium tracking-[0.05em] text-muted-foreground uppercase">
                <Icon className="size-3.5" aria-hidden="true" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5 px-4">
              {items.map((item) => (
                <Badge key={item} variant="secondary" className="px-2 py-0.5 text-xs font-normal">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
