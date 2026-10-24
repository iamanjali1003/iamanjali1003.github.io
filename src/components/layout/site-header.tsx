"use client"

import { FileText } from "lucide-react"

import { CommandMenu } from "@/components/layout/command-menu"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Mark } from "@/components/shared/mark"
import { Button } from "@/components/ui/button"
import { sectionIds } from "@/content/navigation"
import { profile } from "@/content/profile"
import { useActiveSection } from "@/hooks/use-active-section"

export function SiteHeader() {
  const active = useActiveSection(sectionIds)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md backdrop-saturate-[1.8]">
      <div className="mx-auto flex h-[60px] max-w-3xl items-center gap-4 px-6 max-sm:px-4">
        <a href="#main" className="inline-flex shrink-0 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em]">
          <Mark />
          {profile.name}
        </a>

        <MainNav active={active} />

        <div className="ml-auto flex items-center gap-1.5">
          <CommandMenu />
          <ThemeToggle />
          <Button asChild className="max-sm:hidden">
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              Resume
            </a>
          </Button>
          <MobileNav active={active} />
        </div>
      </div>
    </header>
  )
}
