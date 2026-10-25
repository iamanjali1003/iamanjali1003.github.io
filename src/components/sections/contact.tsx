import { FileText, Github, Linkedin } from "lucide-react"

import { Section } from "@/components/sections/section"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"

const LINKS = [
  { label: "Resume", href: profile.links.resume, icon: FileText },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "GitHub", href: profile.links.github, icon: Github },
]

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-[30ch] text-[clamp(20px,2.6vw,27px)] leading-snug tracking-[-0.02em] text-balance">
        {profile.contact}
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-5 inline-block text-lg font-medium underline decoration-border underline-offset-[6px] transition-colors hover:decoration-foreground"
      >
        {profile.email}
      </a>
      <div className="mt-8 flex flex-wrap gap-2">
        {LINKS.map(({ label, href, icon: Icon }) => (
          <Button key={label} variant="outline" asChild>
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Icon />
              {label}
            </a>
          </Button>
        ))}
      </div>
    </Section>
  )
}
