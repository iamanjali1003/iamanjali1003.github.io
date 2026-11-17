import { FileText, Mail } from "lucide-react"
import type { Metadata } from "next"

import { ResumeEntry } from "@/components/resume/resume-entry"
import { SkillGroups } from "@/components/resume/skill-groups"
import { TitledCard } from "@/components/resume/titled-card"
import { BulletList } from "@/components/shared/bullet-list"
import { JsonLd } from "@/components/shared/json-ld"
import { Button } from "@/components/ui/button"
import { pages } from "@/config/pages"
import { siteConfig } from "@/config/site"
import { achievements } from "@/content/achievements"
import { education } from "@/content/education"
import { experience } from "@/content/experience"
import { profile } from "@/content/profile"
import { breadcrumbSchema, personSchema, profilePageSchema } from "@/lib/json-ld"
import { createMetadata } from "@/lib/seo"

const page = pages.about

export const metadata: Metadata = createMetadata(page)

export default function AboutPage() {
  return (
    <>
      <JsonLd graph={[profilePageSchema(page.path), personSchema(), breadcrumbSchema([{ name: page.title, path: page.path }])]} />
      <div className="py-14 max-sm:py-10">
        <h1 className="text-4xl font-semibold tracking-tight max-sm:text-3xl">{page.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-pretty text-muted-foreground">{profile.about}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              View resume
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={siteConfig.links.email}>
              <Mail />
              {siteConfig.author.email}
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-4">
          <TitledCard title="Experience">
            <div className="grid gap-8">
              {experience.map((entry) => (
                <ResumeEntry key={entry.title} entry={entry} />
              ))}
            </div>
          </TitledCard>
          <TitledCard title="Education">
            <div className="grid gap-8">
              {education.map((entry) => (
                <ResumeEntry key={entry.title} entry={entry} />
              ))}
            </div>
          </TitledCard>
        </div>
        <div className="grid content-start gap-4">
          <TitledCard title="Achievements">
            <div className="grid gap-6">
              {achievements.map(({ title, date, points }) => (
                <article key={title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-medium tracking-tight">{title}</h3>
                    <span className="text-sm text-muted-foreground tabular-nums">{date}</span>
                  </div>
                  <BulletList points={points} className="mt-3" />
                </article>
              ))}
            </div>
          </TitledCard>
          <TitledCard title="Skills">
            <SkillGroups />
          </TitledCard>
        </div>
      </div>
    </>
  )
}
