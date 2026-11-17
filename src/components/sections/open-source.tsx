import { Section } from "@/components/sections/section"
import { contributions } from "@/content/open-source"
import { cn } from "@/lib/utils"

const STATUS = { merged: "Merged", open: "In review" }

// Pull requests to other people's projects. A filled square is merged, an
// empty one is still in review.
export function OpenSource() {
  return (
    <Section id="open-source" title="Open source">
      <ul className="grid gap-6">
        {contributions.map(({ repo, title, href, status, date, note }) => (
          <li key={href}>
            <div className="flex items-baseline justify-between gap-4">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium tracking-[-0.01em] text-balance underline-offset-4 hover:underline"
              >
                {title}
              </a>
              <span className="shrink-0 text-[13px] text-muted-foreground tabular-nums">{date}</span>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[13px] text-muted-foreground">
              <span>{repo}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className={cn("size-1.5 border border-foreground", status === "merged" && "bg-foreground")}
                />
                {STATUS[status]}
              </span>
              {note && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={note.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground"
                  >
                    {note.label}
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
