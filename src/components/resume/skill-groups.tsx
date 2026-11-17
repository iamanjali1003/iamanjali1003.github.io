import { Badge } from "@/components/ui/badge"
import { skills } from "@/content/skills"
import { cn } from "@/lib/utils"

// Skills by area, each as a row of badges.
export function SkillGroups({ className }: { className?: string }) {
  return (
    <dl className={cn("grid gap-5", className)}>
      {skills.map(({ title, items }) => (
        <div key={title}>
          <dt className="mb-2 text-sm font-medium">{title}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <li key={item}>
                  <Badge variant="secondary" className="font-normal">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
