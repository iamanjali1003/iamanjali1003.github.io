import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Contact } from "@/components/sections/contact"
import { Entries } from "@/components/sections/entries"
import { Hero } from "@/components/sections/hero"
import { OpenSource } from "@/components/sections/open-source"
import { Skills } from "@/components/sections/skills"
import { Writing } from "@/components/sections/writing"
import { achievements } from "@/content/achievements"
import { education } from "@/content/education"
import { experience } from "@/content/experience"
import { projects } from "@/content/projects"

// Strongest evidence first: merged open-source work and projects, then the rest.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <OpenSource />
        <Entries id="projects" title="Projects" entries={projects} />
        <Entries id="experience" title="Experience" entries={experience} />
        <Writing />
        <Skills />
        <Entries id="achievements" title="Achievements" entries={achievements} />
        <Entries id="education" title="Education" entries={education} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
