import { StatusBadge } from "@/components/open-source/status-badge"
import { Card } from "@/components/ui/card"
import type { Contribution } from "@/content/types"

// The latest pull requests as rows in one card, for the home page.
export function ContributionList({ items }: { items: Contribution[] }) {
  return (
    <Card className="gap-0 py-0">
      <ul className="divide-y px-6">
        {items.map(({ repo, number, title, href, status, date }) => (
          <li key={href} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                {title}
              </a>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {repo} #{number}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={status} />
              <span className="w-16 text-right text-xs text-muted-foreground tabular-nums">{date}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
