import { ArrowUpRight } from "lucide-react"

import { BulletList } from "@/components/shared/bullet-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Entry } from "@/content/types"

export function ProjectCard({ project }: { project: Entry }) {
  const { title, href, context, badge, action, tech, points } = project

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-base tracking-[-0.01em]">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
          {badge && <Badge variant={badge.solid ? "default" : "outline"}>{badge.label}</Badge>}
        </CardTitle>
        {context && <CardDescription className="text-[13px]">{context}</CardDescription>}
        {action && (
          <CardAction>
            <Button variant="ghost" size="sm" asChild className="-mt-1.5 -mr-2 h-7 px-2 text-xs text-muted-foreground">
              <a href={action.href} target="_blank" rel="noopener noreferrer">
                {action.label}
                <ArrowUpRight />
              </a>
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        <BulletList points={points} />
      </CardContent>

      {tech && (
        <CardFooter className="flex-wrap gap-1.5">
          {tech.map((item) => (
            <Badge key={item} variant="secondary" className="font-normal">
              {item}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
