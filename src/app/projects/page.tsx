import type { Metadata } from "next"

import { ProjectCard } from "@/components/projects/project-card"
import { ProjectGrid } from "@/components/projects/project-grid"
import { JsonLd } from "@/components/shared/json-ld"
import { PageHeader } from "@/components/shared/page-header"
import { pages } from "@/config/pages"
import { projects } from "@/content/projects"
import { breadcrumbSchema, collectionPageSchema } from "@/lib/json-ld"
import { createMetadata } from "@/lib/seo"

const page = pages.projects

export const metadata: Metadata = createMetadata(page)

export default function ProjectsPage() {
  const items = projects.map((project) => ({
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    codeRepository: project.href,
    keywords: project.tech.join(", "),
  }))

  return (
    <>
      <JsonLd
        graph={[
          collectionPageSchema(page.path, page.title, page.description, items),
          breadcrumbSchema([{ name: page.title, path: page.path }]),
        ]}
      />
      <PageHeader page={page} />
      <ProjectGrid
        items={projects.map((project) => ({
          key: project.name,
          area: project.area,
          card: <ProjectCard project={project} detailed as="h2" />,
        }))}
      />
    </>
  )
}
