import { FileText, Github, GraduationCap, Linkedin, Mail, MapPin, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"

const META = [
  { icon: MapPin, text: profile.location },
  { icon: GraduationCap, text: profile.degree },
  { icon: Terminal, text: profile.rating },
]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-3xl border-b px-6 pt-[76px] pb-[60px] max-sm:px-4 max-sm:pt-11 max-sm:pb-10"
    >
      <div className="mb-[22px] inline-flex items-center gap-[7px] border px-[11px] py-1 text-xs font-medium text-muted-foreground">
        <span className="size-1.5 animate-pulse bg-foreground" aria-hidden="true" />
        {profile.status}
      </div>

      <h1
        id="hero-heading"
        className="mb-4 text-[clamp(38px,8vw,56px)] leading-[1.05] font-bold tracking-[-0.04em]"
      >
        {profile.name}
      </h1>
      <p className="mb-2.5 text-[17px] font-medium">{profile.role}</p>
      <p className="mb-5 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">{profile.bio}</p>

      <div className="mb-[26px] flex flex-wrap gap-x-[18px] gap-y-1.5 text-[13px] text-muted-foreground">
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
        <Button variant="outline" asChild>
          <a href={`mailto:${profile.email}`}>
            <Mail />
            Email
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <Github />
            GitHub
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin />
            LinkedIn
          </a>
        </Button>
      </div>
    </section>
  )
}
