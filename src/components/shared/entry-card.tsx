import { ArrowUpRight } from "lucide-react"

import { BulletList } from "@/components/shared/bullet-list"
import { RichText } from "@/components/shared/rich-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Entry } from "@/content/types"

export function EntryCard({ entry }: { entry: Entry }) {
  const { title, href, suffix, badge, date, action, subtitle, tech, points } = entry

  return (
    <Card className="transition-colors hover:border-foreground/25">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] leading-snug tracking-[-0.01em]">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
          {suffix && <span className="font-normal text-muted-foreground">{suffix}</span>}
          {badge && <Badge variant={badge.solid ? "default" : "outline"}>{badge.label}</Badge>}
        </CardTitle>

        {subtitle && (
          <CardDescription className="text-[13px]">
            <RichText text={subtitle} />
          </CardDescription>
        )}

        {date && (
          <CardAction className="font-mono text-xs whitespace-nowrap text-muted-foreground">{date}</CardAction>
        )}
        {action && (
          <CardAction>
            <Button variant="ghost" size="sm" asChild className="-mt-1.5 -mr-2 h-7 px-2 text-xs">
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
            <Badge key={item} variant="outline" className="font-mono font-normal">
              {item}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
