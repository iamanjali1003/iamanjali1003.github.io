import { Briefcase, Folder, GraduationCap, Trophy } from "lucide-react"

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
        <Entries id="experience" index="01" title="Experience" icon={Briefcase} entries={experience} />
        <Entries id="projects" index="02" title="Projects" icon={Folder} entries={projects} />
        <Skills index="03" />
        <Entries id="achievements" index="04" title="Achievements" icon={Trophy} entries={achievements} columns={2} />
        <Entries id="education" index="05" title="Education" icon={GraduationCap} entries={education} />
        <Contact index="06" />
      </main>
      <SiteFooter />
    </>
  )
}
