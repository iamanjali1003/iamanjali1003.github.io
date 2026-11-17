import { StatusBadge } from "@/components/open-source/status-badge"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Contribution } from "@/content/types"

// One group of pull requests as a table, for the open-source page. On phones
// the repository moves under the change and the date column goes.
export function ContributionTable({ items, caption }: { items: Contribution[]; caption: string }) {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Table>
        <caption className="sr-only">{caption}</caption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4">Change</TableHead>
            <TableHead className="px-4 max-sm:hidden">Repository</TableHead>
            <TableHead className="px-4">Status</TableHead>
            <TableHead className="px-4 text-right max-sm:hidden">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(({ repo, number, title, href, status, date, note }) => (
            <TableRow key={href}>
              <TableCell className="px-4 py-3.5 whitespace-normal">
                <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline-offset-4 hover:underline">
                  {title}
                </a>
                <p className="mt-1 font-mono text-xs text-muted-foreground sm:hidden">
                  {repo} #{number}
                </p>
                {note && (
                  <a
                    href={note.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-xs text-muted-foreground underline decoration-border underline-offset-[3px] hover:text-foreground"
                  >
                    {note.label}
                  </a>
                )}
              </TableCell>
              <TableCell className="px-4 font-mono text-xs text-muted-foreground max-sm:hidden">
                {repo} #{number}
              </TableCell>
              <TableCell className="px-4">
                <StatusBadge status={status} />
              </TableCell>
              <TableCell className="px-4 text-right text-muted-foreground tabular-nums max-sm:hidden">{date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
