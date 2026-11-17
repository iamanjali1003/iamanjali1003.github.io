import { FileText, Github, Linkedin, Mail } from "lucide-react"

import { AtAGlance } from "@/components/home/at-a-glance"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { profile } from "@/content/profile"

export function Hero() {
  return (
    <section aria-labelledby="intro" className="grid gap-10 py-16 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center max-sm:py-10">
      <div>
        <Badge variant="outline" className="font-normal text-muted-foreground">
          <span aria-hidden="true" className="size-1.5 bg-foreground" />
          {profile.availability}
        </Badge>
        <h1 id="intro" className="mt-5 text-5xl font-semibold tracking-tight max-sm:text-4xl">
          Hi, I’m {siteConfig.name}.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{profile.headline}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          <Button asChild>
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              View resume
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              <Github />
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href={siteConfig.links.email} aria-label="Email">
              <Mail />
            </a>
          </Button>
        </div>
      </div>
      <AtAGlance />
    </section>
  )
}
