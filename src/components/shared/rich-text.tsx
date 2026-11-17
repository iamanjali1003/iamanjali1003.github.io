import { Fragment, type ReactNode } from "react"

import { externalProps } from "@/lib/links"

// Renders the two pieces of markup the content files use:
//   **bold**  and  [label](https://link)
const TOKEN = /(\[(?:\*\*[^*]+\*\*|[^\]])+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g
const LINK = /^\[(.+)\]\(([^)\s]+)\)$/

function render(text: string): ReactNode[] {
  return text
    .split(TOKEN)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-medium text-foreground">
            {part.slice(2, -2)}
          </strong>
        )
      }
      const link = LINK.exec(part)
      if (link) {
        return (
          <a
            key={i}
            href={link[2]}
            {...externalProps(link[2])}
            className="text-foreground underline decoration-border underline-offset-[3px] transition-colors hover:decoration-foreground"
          >
            {render(link[1])}
          </a>
        )
      }
      return <Fragment key={i}>{part}</Fragment>
    })
}

export function RichText({ text }: { text: string }) {
  return <>{render(text)}</>
}
