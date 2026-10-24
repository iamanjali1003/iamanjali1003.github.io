import { FileText, Github, Linkedin, Mail, User } from "lucide-react"

import { Section } from "@/components/sections/section"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { profile } from "@/content/profile"

const LINKS = [
  { label: "Resume", href: profile.links.resume, icon: FileText },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "GitHub", href: profile.links.github, icon: Github },
]

export function Contact({ index }: { index: string }) {
  return (
    <Section id="contact" index={index} title="Contact" icon={User}>
      <Card className="gap-6 py-6">
        <CardHeader className="gap-2 px-6 max-sm:px-5">
          <CardTitle className="text-xl tracking-[-0.02em]">Get in touch</CardTitle>
          <CardDescription className="max-w-[60ch] text-[15px] leading-relaxed">{profile.contact}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-wrap gap-2 px-6 max-sm:px-5">
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
        </CardFooter>
      </Card>
    </Section>
  )
}
