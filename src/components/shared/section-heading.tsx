import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

// A home page section's title, with a link to the page that has all of it.
export function SectionHeading({
  id,
  title,
  href,
  linkLabel = "View all",
}: {
  id: string
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 id={id} className="text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {href && (
        <Button variant="ghost" size="sm" asChild className="-mr-3 text-muted-foreground">
          <Link href={href}>
            {linkLabel}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  )
}
