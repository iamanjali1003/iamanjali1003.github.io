"use client"

import { FileText } from "lucide-react"
import { useEffect, useRef } from "react"

import { Mark } from "@/components/shared/mark"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { navigation } from "@/content/navigation"
import { profile } from "@/content/profile"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"


const SECTION_IDS = navigation.map((item) => item.id)

export function SiteHeader() {
  const active = useActiveSection(SECTION_IDS)
  const strip = useRef<HTMLDivElement>(null)

  // On phones the links scroll sideways; keep the active one in view.
  useEffect(() => {
    const row = strip.current
    const link = row?.querySelector<HTMLElement>(`a[href="#${active}"]`)
    if (!row || !link || row.scrollWidth <= row.clientWidth) return
    row.scrollLeft += link.getBoundingClientRect().left - row.getBoundingClientRect().left - 6
  }, [active])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md backdrop-saturate-[1.8]">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[60px] max-w-3xl items-center justify-between gap-4 px-6 max-sm:h-auto max-sm:flex-wrap max-sm:gap-y-1.5 max-sm:px-4 max-sm:pt-3"
      >
        <a href="#main" className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em]">
          <Mark />
          {profile.name}
        </a>

        <div
          ref={strip}
          className="flex gap-1 [scrollbar-width:none] max-sm:order-3 max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] max-sm:overflow-x-auto max-sm:px-1.5 max-sm:pb-2 [&::-webkit-scrollbar]:hidden"
        >
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "whitespace-nowrap px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                active === id && "font-medium text-foreground"
              )}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild>
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              Resume
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
