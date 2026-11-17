import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import { Children, isValidElement, type ReactNode } from "react"

import { CodeBlock } from "@/components/blog/code-block"
import { FencePostDiagram } from "@/components/blog/fence-post-diagram"
import { slugify } from "@/lib/format"
import { externalProps } from "@/lib/links"

// How each piece of Markdown in a post renders, in the site's style. Posts can
// also use the components listed at the end, e.g. <FencePostDiagram />.

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ""
}

function Heading({ level, children }: { level: 2 | 3; children?: ReactNode }) {
  const id = slugify(textOf(children))
  const Tag = level === 2 ? "h2" : "h3"
  return (
    <Tag
      id={id}
      className={
        level === 2
          ? "group mt-12 scroll-mt-20 text-2xl font-semibold tracking-tight"
          : "group mt-8 scroll-mt-20 text-lg font-semibold tracking-tight"
      }
    >
      {children}
      <a
        href={`#${id}`}
        aria-label="Link to this section"
        className="ml-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
      >
        #
      </a>
    </Tag>
  )
}

type MDXComponents = NonNullable<MDXRemoteProps["components"]>

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  p: ({ children }) => <p className="mt-5 leading-7 text-foreground/90">{children}</p>,
  a: ({ href = "", children }) => (
    <a
      href={href}
      {...externalProps(href)}
      className="font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  ul: ({ children }) => <ul className="mt-5 space-y-3">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-3 pl-6">{children}</ol>,
  li: ({ children }) => (
    <li className="relative pl-5 leading-7 text-foreground/90 before:absolute before:top-[0.7em] before:left-1 before:size-1 before:bg-muted-foreground/60 before:content-['']">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 pl-5 text-muted-foreground italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-10" />,
  code: ({ children }) => (
    <code className="bg-muted px-1.5 py-0.5 font-mono text-[0.88em] text-foreground">{children}</code>
  ),
  // A fenced block arrives as <pre data-title><code>…</code></pre>.
  pre: ({ children, ...props }) => {
    const code = Children.toArray(children).find(isValidElement) as
      | React.ReactElement<{ children?: ReactNode; className?: string }>
      | undefined
    const language = code?.props.className?.match(/language-([\w-]+)/)?.[1]
    const title = (props as Record<string, unknown>)["data-title"]
    return (
      <CodeBlock
        code={textOf(code?.props.children)}
        language={language}
        title={typeof title === "string" ? title : undefined}
      />
    )
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto border">
      <table className="w-full text-left text-sm tabular-nums">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/50 text-muted-foreground">{children}</thead>,
  tr: ({ children }) => <tr className="border-b last:border-0">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-2.5 font-medium">{children}</th>,
  td: ({ children }) => <td className="px-4 py-2.5">{children}</td>,

  FencePostDiagram,
}
