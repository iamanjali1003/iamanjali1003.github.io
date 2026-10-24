import { FileText, Github, GraduationCap, Linkedin, Mail, MapPin, Terminal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"

const META = [
  { icon: MapPin, text: profile.location },
  { icon: GraduationCap, text: profile.degree },
  { icon: Terminal, text: profile.rating },
]

const LINKS = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", href: profile.links.github, icon: Github },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* A faint square grid that fades out from the top. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_35%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-16 max-sm:px-4 max-sm:pt-12 max-sm:pb-12">
        <Badge variant="outline" className="mb-6 gap-2 bg-background px-2.5 py-1 text-xs">
          <span className="size-1.5 animate-pulse bg-foreground" aria-hidden="true" />
          {profile.status}
        </Badge>

        <h1 id="hero-heading" className="mb-4 text-[clamp(40px,8vw,60px)] leading-[1.02] font-bold tracking-[-0.045em]">
          {profile.name}
        </h1>
        <p className="mb-2.5 text-[17px] font-medium">{profile.role}</p>
        <p className="mb-6 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">{profile.bio}</p>

        <div className="mb-8 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
          {META.map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-1.5">
              <Icon className="size-3.5" aria-hidden="true" />
              {text}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Button asChild>
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              View resume
            </a>
          </Button>
          {LINKS.map(({ label, href, icon: Icon }) => (
            <Button key={label} variant="outline" asChild>
              <a href={href} {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
                <Icon />
                {label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
