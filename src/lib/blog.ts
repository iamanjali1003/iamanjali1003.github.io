import "server-only"

import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { slugify } from "@/lib/format"

// Posts are MDX files in src/content/blog/. The file name is the slug, and a
// small front matter block at the top holds the title, description and date:
//
//   ---
//   title: "…"
//   description: "…"
//   date: "2026-11-12"
//   updated: "2026-11-20"     (optional)
//   draft: true               (optional: left out of the build)
//   ---

const POSTS_DIR = join(process.cwd(), "src", "content", "blog")
const WORDS_PER_MINUTE = 200

export type Heading = { id: string; text: string }

export type Post = {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. 2026-11-12. */
  date: string
  updated?: string
  readingTime: string
  wordCount: number
  headings: Heading[]
  /** The MDX body, without the front matter. */
  body: string
}

function parseFrontMatter(file: string, source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source)
  if (!match) throw new Error(`${file}: missing front matter`)

  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^(\w+):\s*(.*)$/.exec(line.trim())
    if (field) data[field[1]] = field[2].replace(/^(["'])(.*)\1$/, "$2")
  }
  for (const key of ["title", "description", "date"]) {
    if (!data[key]) throw new Error(`${file}: front matter needs "${key}"`)
  }
  if (Number.isNaN(Date.parse(data.date))) throw new Error(`${file}: "date" must be YYYY-MM-DD`)
  return { data, body: match[2] }
}

function readPost(file: string): Post & { draft: boolean } {
  const { data, body } = parseFrontMatter(file, readFileSync(join(POSTS_DIR, file), "utf8"))

  // Words of prose only: code blocks and markup don't count towards reading time.
  const prose = body.replace(/```[\s\S]*?```/g, "").replace(/<[^>]+>/g, "")
  const wordCount = prose.split(/\s+/).filter((word) => /\w/.test(word)).length

  // Second-level headings make the table of contents.
  const headings = [...body.replace(/```[\s\S]*?```/g, "").matchAll(/^##\s+(.+)$/gm)].map(([, text]) => ({
    id: slugify(text),
    text: text.trim(),
  }))

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    draft: data.draft === "true",
    readingTime: `${Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))} min read`,
    wordCount,
    headings,
    body,
  }
}

let cache: Post[] | undefined

// Every published post, newest first.
export function getPosts(): Post[] {
  cache ??= readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPost)
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
  return cache
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug)
}

// The posts either side of this one, for the links at the end of a post.
export function getAdjacentPosts(slug: string) {
  const posts = getPosts()
  const index = posts.findIndex((post) => post.slug === slug)
  return { newer: index > 0 ? posts[index - 1] : undefined, older: posts[index + 1] }
}

// What client components need: no body.
export type PostSummary = Pick<Post, "slug" | "title" | "description" | "date" | "readingTime">
export const toSummary = ({ slug, title, description, date, readingTime }: Post): PostSummary => ({
  slug,
  title,
  description,
  date,
  readingTime,
})
