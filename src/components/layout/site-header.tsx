import Link from "next/link"

import { Container } from "@/components/layout/container"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Mark } from "@/components/shared/mark"
import { profile } from "@/content/profile"

const navLink = "text-[13px] text-muted-foreground transition-colors hover:text-foreground"

// The name on the left; writing, the resume and the theme on the right.
// The home page is one short column, so it needs no section menu.
export function SiteHeader() {
  return (
    <header>
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 text-sm font-medium tracking-[-0.01em]">
          <Mark className="size-5" />
          {profile.name}
        </Link>
        <nav aria-label="Site" className="flex items-center gap-5">
          <Link href="/blog/" className={navLink}>
            Writing
          </Link>
          <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className={navLink}>
            Resume
          </a>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
