import { FileText, Github, Linkedin, Mail, User } from "lucide-react"

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
    <Section id="contact" title="Contact" icon={User}>
      <p className="mb-[18px] max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">{profile.contact}</p>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <a href={`mailto:${profile.email}`}>
            <Mail />
            {profile.email}
          </a>
        </Button>
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
