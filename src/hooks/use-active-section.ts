"use client"

import { useEffect, useState } from "react"

// Returns the id of the section currently under the header, or null above the
// first one. Pass a stable array; a new one on every render restarts the observer.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-64px 0px -70% 0px" }
    )
    for (const id of ids) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
