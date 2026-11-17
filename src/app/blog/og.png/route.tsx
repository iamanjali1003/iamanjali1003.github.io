import { pages } from "@/config/pages"
import { pageOgImage } from "@/lib/og"

// This page's share image, drawn once at build time.
export const dynamic = "force-static"

export function GET() {
  return pageOgImage(pages.blog)
}
