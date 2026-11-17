import { ArrowUpRight, FileText } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { externalProps } from "@/lib/links"

const LINKS = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
]

export function Hero() {
  return (
    <Container as="section" aria-labelledby="hero-heading" className="pt-14 sm:pt-24">
      <h1 id="hero-heading" className="text-[44px] leading-none font-semibold tracking-[-0.05em] sm:text-[56px]">
        {profile.name}
      </h1>
      <p className="mt-3 text-[15px] text-muted-foreground">
        Software engineering student · {profile.location}
      </p>

      <p className="mt-10 max-w-[32ch] text-[20px] leading-[1.45] tracking-[-0.015em] text-balance sm:text-[22px]">
        {profile.headline}
      </p>
      <p className="mt-5 max-w-[62ch] text-[15px] leading-7 text-pretty text-muted-foreground">{profile.about}</p>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button asChild>
          <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
            <FileText />
            View resume
          </a>
        </Button>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            {...externalProps(href)}
            className="inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
            {href.startsWith("http") && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
          </a>
        ))}
      </div>
    </Container>
  )
}
