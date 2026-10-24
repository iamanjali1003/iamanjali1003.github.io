import { Mark } from "@/components/shared/mark"
import { profile } from "@/content/profile"

const LINKS = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
  { label: "CodeChef", href: profile.links.codechef },
]

export function SiteFooter() {
  return (
    <footer className="border-t pt-7 pb-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 max-sm:px-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Mark className="size-4" />© {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}
