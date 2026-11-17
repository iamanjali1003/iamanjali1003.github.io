"use client"

import { useEffect, useState } from "react"

import type { Heading } from "@/lib/blog"
import { cn } from "@/lib/utils"

// "On this page": the post's sections, with the one being read marked.
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | undefined>(headings[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )
    for (const { id } of headings) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-labelledby="toc-heading">
      <p id="toc-heading" className="mb-3 text-sm font-medium">
        On this page
      </p>
      <ul className="space-y-2 text-sm">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "block text-muted-foreground transition-colors hover:text-foreground",
                active === id && "font-medium text-foreground"
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
