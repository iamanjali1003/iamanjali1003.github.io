import { absoluteUrl, siteConfig } from "@/config/site"
import type { Post } from "@/lib/blog"

// schema.org data for search engines. Each builder returns one node; a page
// passes the ones that describe it to <JsonLd>. The person and the website
// have fixed @ids so every other node can point at them.

const PERSON_ID = absoluteUrl("/#person")
const WEBSITE_ID = absoluteUrl("/#website")

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.author.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og.png"),
    jobTitle: siteConfig.author.jobTitle,
    email: `mailto:${siteConfig.author.email}`,
    description: siteConfig.description,
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "JSS Academy of Technical Education, Bengaluru" },
    knowsAbout: [
      "Software Engineering", "Kubernetes", "React", "Next.js", "Node.js", "TypeScript", "Java", "Spring Boot",
      "Apache Kafka", "MongoDB", "MySQL", "AWS", "Data Structures and Algorithms",
    ],
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.leetcode, siteConfig.links.codechef],
  }
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  }
}

export function profilePageSchema(path: string) {
  return {
    "@type": "ProfilePage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  }
}

export function collectionPageSchema(path: string, name: string, description: string, items?: object[]) {
  return {
    "@type": "CollectionPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    ...(items && { mainEntity: { "@type": "ItemList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })) } }),
  }
}

export function blogPostingSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}/`)
  return {
    "@type": "BlogPosting",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount: post.wordCount,
    inLanguage: siteConfig.language,
    image: absoluteUrl(`/blog/${post.slug}/og.png`),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@type": "Blog", "@id": absoluteUrl("/blog/") },
  }
}

export function blogSchema(posts: Post[]) {
  return {
    "@type": "Blog",
    "@id": absoluteUrl("/blog/"),
    url: absoluteUrl("/blog/"),
    name: `${siteConfig.name} · Blog`,
    author: { "@id": PERSON_ID },
    blogPost: posts.map((post) => ({ "@id": absoluteUrl(`/blog/${post.slug}/`) })),
  }
}

// Home › Section › Page, so search results show where a page sits.
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(({ name, path }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(path),
    })),
  }
}
