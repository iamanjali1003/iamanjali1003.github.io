import { FileText, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"

const LINKS = [
  { label: "GitHub", href: profile.links.github, icon: Github },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mx-auto max-w-4xl px-6 pt-24 pb-20 max-sm:px-4 max-sm:pt-16 max-sm:pb-14">
      <h1
        id="hero-heading"
        className="-ml-[0.04em] text-[clamp(64px,13vw,128px)] leading-[0.88] font-semibold tracking-[-0.06em]"
      >
        {profile.name}
      </h1>
      <p className="mt-8 max-w-[30ch] text-[clamp(20px,2.6vw,27px)] leading-snug tracking-[-0.02em] text-balance">
        {profile.headline}
      </p>
      <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">{profile.about}</p>

      <div className="mt-9 flex flex-wrap items-center gap-x-1 gap-y-2">
        <Button asChild className="mr-3">
          <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
            <FileText />
            View resume
          </a>
        </Button>
        {LINKS.map(({ label, href, icon: Icon }) => (
          <Button key={label} variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <a href={href} {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
              <Icon />
              {label}
            </a>
          </Button>
        ))}
      </div>
    </section>
  )
}
