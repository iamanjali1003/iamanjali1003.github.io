import type { Metadata } from "next"

import { ContributionTable } from "@/components/open-source/contribution-table"
import { JsonLd } from "@/components/shared/json-ld"
import { PageHeader } from "@/components/shared/page-header"
import { pages } from "@/config/pages"
import { siteConfig } from "@/config/site"
import { contributionsByGroup } from "@/content/open-source"
import { slugify } from "@/lib/format"
import { breadcrumbSchema, collectionPageSchema } from "@/lib/json-ld"
import { createMetadata } from "@/lib/seo"

const page = pages.openSource

export const metadata: Metadata = createMetadata(page)

export default function OpenSourcePage() {
  const groups = contributionsByGroup()

  return (
    <>
      <JsonLd
        graph={[
          collectionPageSchema(page.path, page.title, page.description),
          breadcrumbSchema([{ name: page.title, path: page.path }]),
        ]}
      />
      <PageHeader page={page} />
      <div className="grid gap-12">
        {groups.map(([group, items]) => (
          <section key={group} aria-labelledby={slugify(group)}>
            <h2 id={slugify(group)} className="mb-4 text-lg font-semibold tracking-tight">
              {group}
            </h2>
            <ContributionTable items={items} caption={`Pull requests to ${group}`} />
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Pull requests to my own repositories aren’t listed here; they’re on{" "}
        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
          GitHub
        </a>
        .
      </p>
    </>
  )
}
