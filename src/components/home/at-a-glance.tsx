import { Code, GitPullRequest, GraduationCap, MapPin, type LucideIcon } from "lucide-react"

import { Card, CardHeader } from "@/components/ui/card"
import { profile } from "@/content/profile"

const ICONS: Record<(typeof profile.glance)[number]["icon"], LucideIcon> = {
  location: MapPin,
  education: GraduationCap,
  focus: Code,
  "open-source": GitPullRequest,
}

// Plain facts next to the intro.
export function AtAGlance() {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-3.5 [.border-b]:pb-3.5">
        <h2 className="text-sm leading-none font-medium">At a glance</h2>
      </CardHeader>
      <dl className="divide-y text-sm">
        {profile.glance.map(({ icon, label, value }) => {
          const Icon = ICONS[icon]
          return (
            <div key={label} className="flex gap-3 px-6 py-3.5">
              <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-0.5">{value}</dd>
              </div>
            </div>
          )
        })}
      </dl>
    </Card>
  )
}
