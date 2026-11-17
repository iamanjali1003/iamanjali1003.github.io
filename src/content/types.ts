// Text fields marked "rich" accept two pieces of markup:
//   **bold**  and  [label](https://link)   (a label may itself be **bold**)

export type Link = {
  label: string
  href: string
}

export const PROJECT_AREAS = ["Full-stack", "Backend", "Frontend", "Database"] as const
export type ProjectArea = (typeof PROJECT_AREAS)[number]

export type Project = {
  name: string
  area: ProjectArea
  /** One plain sentence: what it is. */
  summary: string
  /** Shown on the home page. */
  featured?: boolean
  /** The main link, usually the repository. */
  href: string
  /** Extra links shown in the card footer, e.g. a certificate. */
  links?: Link[]
  tech: string[]
  /** rich */
  points: string[]
}

export type Contribution = {
  /** owner/name, as GitHub shows it. */
  repo: string
  number: number
  /** What the change did, in plain words rather than the PR's commit-style title. */
  title: string
  href: string
  status: "merged" | "open"
  /** Month it merged, or opened if it is still open, e.g. Nov 2026. */
  date: string
  /** Groups the open-source page, e.g. "Kubernetes SIGs". */
  group: string
  note?: Link
}

export type ResumeEntry = {
  title: string
  /** rich, e.g. the organisation with a link. */
  subtitle: string
  date: string
  /** One plain sentence for the home page card. */
  summary: string
  /** rich */
  points: string[]
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type Achievement = {
  title: string
  date: string
  /** rich */
  points: string[]
}
