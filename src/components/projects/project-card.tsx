import { ArrowUpRight } from "lucide-react"

import { BulletList } from "@/components/shared/bullet-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import type { Project } from "@/content/types"

// A project as a card: name and area, one line, the stack, and its links.
// The detailed version adds the resume points.
export function ProjectCard({
  project,
  detailed = false,
  as: Heading = "h3",
}: {
  project: Project
  detailed?: boolean
  /** h2 on the projects page, h3 under a home page section. */
  as?: "h2" | "h3"
}) {
  const { name, area, summary, href, links = [], tech, points } = project

  return (
    <Card className="h-full gap-0 py-0">
      <CardHeader className="gap-2 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <Heading className="leading-none font-semibold tracking-tight">
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {name}
            </a>
          </Heading>
          <Badge variant="outline" className="font-normal text-muted-foreground">
            {area}
          </Badge>
        </div>
        <CardDescription className="leading-relaxed">{summary}</CardDescription>
      </CardHeader>
      {detailed && (
        <CardContent className="pb-4">
          <BulletList points={points} />
        </CardContent>
      )}
      <CardContent className="pb-5">
        <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
          {tech.map((item) => (
            <li key={item}>
              <Badge variant="secondary" className="font-normal">
                {item}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto gap-1 border-t py-2.5">
        {[{ label: "Source", href }, ...links].map((link) => (
          <Button key={link.label} variant="ghost" size="sm" asChild className="-ml-2.5 text-muted-foreground">
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label}: ${name}`}>
              {link.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}
