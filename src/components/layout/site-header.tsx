import { FileText } from "lucide-react"
import Link from "next/link"

import { CommandMenu } from "@/components/layout/command-menu"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Mark } from "@/components/shared/mark"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { projects } from "@/content/projects"
import { getPosts, toSummary } from "@/lib/blog"

export function SiteHeader() {
  // Read at build time and handed to the search, which runs in the browser.
  const searchProjects = projects.map(({ name, href }) => ({ name, href }))
  const searchPosts = getPosts().map(toSummary)

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="page-container flex h-14 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight">
          <Mark className="size-5" />
          {siteConfig.name}
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center gap-1.5">
          <CommandMenu projects={searchProjects} posts={searchPosts} />
          <ThemeToggle />
          <Button asChild size="sm" className="ml-1 max-sm:hidden">
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              Resume
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
