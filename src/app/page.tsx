import type { Metadata } from "next"

import { PostCard } from "@/components/blog/post-card"
import { ContactCard } from "@/components/home/contact-card"
import { Hero } from "@/components/home/hero"
import { ContributionList } from "@/components/open-source/contribution-list"
import { ProjectCard } from "@/components/projects/project-card"
import { ResumeEntry } from "@/components/resume/resume-entry"
import { SkillGroups } from "@/components/resume/skill-groups"
import { TitledCard } from "@/components/resume/titled-card"
import { JsonLd } from "@/components/shared/json-ld"
import { SectionHeading } from "@/components/shared/section-heading"
import { Card } from "@/components/ui/card"
import { pages } from "@/config/pages"
import { siteConfig } from "@/config/site"
import { education } from "@/content/education"
import { experience } from "@/content/experience"
import { contributions } from "@/content/open-source"
import { projects } from "@/content/projects"
import { getPosts, toSummary } from "@/lib/blog"
import { personSchema, websiteSchema } from "@/lib/json-ld"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: siteConfig.title,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
})

// A short version of every section, each linking to its own page.
export default function HomePage() {
  const posts = getPosts().slice(0, 2).map(toSummary)

  return (
    <>
      <JsonLd graph={[websiteSchema(), personSchema()]} />
      <Hero />

      <section aria-labelledby="featured-projects" className="mt-6">
        <SectionHeading id="featured-projects" title="Featured projects" href={pages.projects.path} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
        </div>
      </section>

      <section aria-labelledby="experience-education" className="mt-20">
        <SectionHeading id="experience-education" title="Experience & education" href={pages.about.path} linkLabel="Full resume" />
        <div className="grid gap-4 md:grid-cols-2">
          <TitledCard title="Experience" as="h3">
            <div className="grid gap-8">
              {experience.map((entry) => (
                <ResumeEntry key={entry.title} entry={entry} brief as="h4" />
              ))}
            </div>
          </TitledCard>
          <TitledCard title="Education" as="h3">
            <div className="grid gap-8">
              {education.map((entry) => (
                <ResumeEntry key={entry.title} entry={entry} brief as="h4" />
              ))}
            </div>
          </TitledCard>
        </div>
      </section>

      <section aria-labelledby="skills" className="mt-20">
        <SectionHeading id="skills" title="Skills" />
        <Card className="p-6">
          <SkillGroups className="md:grid-cols-2 md:gap-x-10" />
        </Card>
      </section>

      <section aria-labelledby="open-source" className="mt-20">
        <SectionHeading id="open-source" title="Open source" href={pages.openSource.path} />
        <ContributionList items={contributions.slice(0, 3)} />
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="writing" className="mt-20">
          <SectionHeading id="writing" title="Writing" href={pages.blog.path} />
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="contact" className="mt-20">
        <ContactCard />
      </section>
    </>
  )
}
