import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const OG_SIZE = { width: 1200, height: 630 } as const

type PageMetadata = {
  /** Shown as "<title> · Anjali" in the tab; the share card uses it as is. */
  title: string
  description: string
  /** The page's path, with a trailing slash, e.g. /projects/. */
  path: string
  /** Defaults to the page's own share image, <path>og.png. */
  image?: string
  /** Use the title as the full tab title, without " · Anjali". */
  absoluteTitle?: boolean
} & ({ type?: "website" } | { type: "article"; publishedTime: string; modifiedTime?: string })

// One place that builds every page's metadata: the canonical URL, the Open
// Graph and Twitter cards and the share image all come from the same inputs.
export function createMetadata(page: PageMetadata): Metadata {
  const { title, description, path, absoluteTitle = false } = page
  const fullTitle = absoluteTitle ? title : `${title} · ${siteConfig.name}`
  const image = { url: page.image ?? `${path}og.png`, ...OG_SIZE, alt: title }

  const openGraph: Metadata["openGraph"] =
    page.type === "article"
      ? {
          type: "article",
          publishedTime: page.publishedTime,
          modifiedTime: page.modifiedTime ?? page.publishedTime,
          authors: [`${siteConfig.url}/about/`],
        }
      : { type: "website" }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraph,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  }
}
