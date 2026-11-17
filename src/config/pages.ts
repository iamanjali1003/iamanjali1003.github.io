// Title and description for every top-level page. The page's metadata, its
// header and its share image (og.png) all read from here, so they never drift.

export type PageInfo = {
  /** The URL path, with a trailing slash like the exported site. */
  path: string
  title: string
  description: string
}

export const pages = {
  projects: {
    path: "/projects/",
    title: "Projects",
    description: "Things I've built: full-stack apps, backend services, developer tools and databases.",
  },
  openSource: {
    path: "/open-source/",
    title: "Open source",
    description: "Pull requests to other people's projects, each reviewed and merged by their maintainers.",
  },
  blog: {
    path: "/blog/",
    title: "Blog",
    description: "Notes on open source and building software.",
  },
  about: {
    path: "/about/",
    title: "About",
    description: "Experience, education, skills and achievements: my resume as a page.",
  },
} satisfies Record<string, PageInfo>
