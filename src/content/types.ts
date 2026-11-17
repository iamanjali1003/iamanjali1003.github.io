// Text fields marked "rich" accept two pieces of markup:
//   **bold**  and  [label](https://link)   (a label may itself be **bold**)

export type Link = {
  label: string
  href: string
}

export type Entry = {
  title: string
  href?: string
  /** One plain sentence under the title: what the thing is. */
  summary?: string
  date?: string
  /** A link on the right of the title, e.g. Source or Certificate. */
  action?: Link
  /** rich */
  subtitle?: string
  tech?: string[]
  /** rich */
  points: string[]
}

export type Contribution = {
  /** owner/name, as GitHub shows it. */
  repo: string
  /** What the change did, in plain words rather than the PR's commit-style title. */
  title: string
  href: string
  status: "merged" | "open"
  /** Month it merged, or opened if it is still open, e.g. Nov 2026. */
  date: string
  /** A short label after the repo, e.g. the event it was part of. */
  note?: Link
}

export type Post = {
  /** The page lives at /blog/<slug>/ and its body in src/content/posts/<slug>.tsx. */
  slug: string
  title: string
  description: string
  /** ISO date, e.g. 2026-11-12. */
  date: string
  readingTime: string
}

export type SkillGroup = {
  title: string
  items: string[]
}
