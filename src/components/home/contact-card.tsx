import { Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { profile } from "@/content/profile"

export function ContactCard() {
  return (
    <Card className="flex-col gap-6 bg-muted/40 p-8 md:flex-row md:items-center md:justify-between max-sm:p-6">
      <div>
        <h2 id="contact" className="text-2xl font-semibold tracking-tight">
          Get in touch
        </h2>
        <p className="mt-2 text-muted-foreground">{profile.contact}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <a href={siteConfig.links.email}>
            <Mail />
            {siteConfig.author.email}
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin />
            LinkedIn
          </a>
        </Button>
      </div>
    </Card>
  )
}
