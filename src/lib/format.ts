// 2026-11-12 -> 12 Nov 2026, in UTC so every machine that builds the site agrees.
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
}

// Lower-case words joined by hyphens: "How wrong was it?" -> "how-wrong-was-it".
// Headings use it for their ids, and the table of contents for its links.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
}
