import { highlight } from "sugar-high"

import { cn } from "@/lib/utils"

const PLAIN = new Set(["text", "txt", "plaintext", "output", "console"])

const escapeHtml = (code: string) => code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// A fenced code block from a post. Highlighting happens at build time
// (sugar-high escapes the code before wrapping tokens); ```text blocks stay
// plain. A title from ```lang title="Before" becomes a caption above the block.
export function CodeBlock({
  code,
  language,
  title,
  className,
}: {
  code: string
  language?: string
  title?: string
  className?: string
}) {
  const source = code.replace(/\n$/, "")
  const html = !language || PLAIN.has(language) ? escapeHtml(source) : highlight(source)

  return (
    <figure className="my-6">
      {title && <figcaption className="mb-1.5 text-xs text-muted-foreground">{title}</figcaption>}
      <pre className={cn("overflow-x-auto border bg-muted/40 p-4 text-[13px] leading-6", className)}>
        <code className="font-mono" data-language={language} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  )
}
