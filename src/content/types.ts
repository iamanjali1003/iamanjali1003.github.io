import type { LucideIcon } from "lucide-react"

// Text fields marked "rich" accept two pieces of markup:
//   **bold**  and  [label](https://link)   (a label may itself be **bold**)

export type Link = {
  label: string
  href: string
}

export type Entry = {
  title: string
  href?: string
  /** Shown after the title, e.g. the programme a project was built for. */
  suffix?: string
  badge?: { label: string; solid?: boolean }
  date?: string
  /** A link in the top-right corner, e.g. Visit, Source, Certificate. */
  action?: Link
  /** rich */
  subtitle?: string
  tech?: string[]
  /** rich */
  points: string[]
}

export type SkillGroup = {
  title: string
  icon: LucideIcon
  items: string[]
}
