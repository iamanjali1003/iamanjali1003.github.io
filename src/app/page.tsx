import { Briefcase, Folder, GraduationCap, Trophy } from "lucide-react"

import { EntriesSection } from "@/components/sections/entries"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
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
        <EntriesSection id="experience" title="Experience" icon={Briefcase} entries={experience} />
        <EntriesSection id="projects" title="Projects" icon={Folder} entries={projects} />
        <Skills />
        <EntriesSection id="achievements" title="Achievements" icon={Trophy} entries={achievements} />
        <EntriesSection id="education" title="Education" icon={GraduationCap} entries={education} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
