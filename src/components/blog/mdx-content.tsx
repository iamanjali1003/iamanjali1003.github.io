import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import { mdxComponents } from "@/components/blog/mdx-components"

type HastNode = {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  data?: { meta?: string }
  children?: HastNode[]
}

// Copies title="…" from a code fence (```python title="Before") onto its <pre>,
// where the CodeBlock component reads it as a caption.
function rehypeCodeTitle() {
  return function walk(node: HastNode) {
    if (node.type === "element" && node.tagName === "pre") {
      const title = node.children?.[0]?.data?.meta?.match(/title="([^"]+)"/)?.[1]
      if (title) node.properties = { ...node.properties, "data-title": title }
    }
    node.children?.forEach(walk)
  }
}

// Compiles a post's MDX at build time. JavaScript expressions in posts are
// blocked (next-mdx-remote's default); only the components in mdxComponents
// can be used.
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        blockJS: true,
        blockDangerousJS: true,
        mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeCodeTitle] },
      }}
    />
  )
}
