import { Container } from "@/components/layout/container"
import { Mark } from "@/components/shared/mark"
import { profile } from "@/content/profile"
import { externalProps } from "@/lib/links"

const LINKS = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "CodeChef", href: profile.links.codechef },
  { label: "RSS", href: "/feed.xml" },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 sm:mt-32">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t py-8">
          <p className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
            <Mark className="size-4" />© {new Date().getFullYear()} {profile.name}
          </p>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                {...externalProps(href)}
                className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
