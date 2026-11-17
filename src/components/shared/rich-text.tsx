import { Fragment, type ReactNode } from "react"

import { TextLink } from "@/components/shared/text-link"

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
      const link = part.match(LINK)
      if (link) {
        return (
          <TextLink key={i} href={link[2]}>
            {render(link[1])}
          </TextLink>
        )
      }
      return <Fragment key={i}>{part}</Fragment>
    })
}

export function RichText({ text }: { text: string }) {
  return <>{render(text)}</>
}
