import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Contact } from "@/components/sections/contact"
import { Entries } from "@/components/sections/entries"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { achievements } from "@/content/achievements"
import { education } from "@/content/education"
import { experience } from "@/content/experience"
import { projects } from "@/content/projects"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Entries id="experience" title="Experience" entries={experience} />
        <Entries id="projects" title="Projects" entries={projects} as="cards" />
        <Skills />
        <Entries id="achievements" title="Achievements" entries={achievements} />
        <Entries id="education" title="Education" entries={education} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
