import "server-only"

import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import type { PageInfo } from "@/config/pages"
import { siteConfig } from "@/config/site"
import { OG_SIZE } from "@/lib/seo"

// Share images (Open Graph), drawn at build time by the og.png route next to
// each page. One look everywhere: ink background, a hairline frame, the square
// mark and Inter, as in brand/BRAND.md.

const INK = "#0a0a0a"
const PAPER = "#fafafa"
const LINE = "#262626"
const FAINT = "#737373"
const MUTED = "#a3a3a3"

// The monogram from brand/mark.svg, inverted for the dark card.
const A = "M42 22 L58 22 L81 78 L67 78 L62.07 66 L37.93 66 L33 78 L19 78 Z M42.04 56 L57.96 56 L50 36.6 Z"
const MARK = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${PAPER}"/><path d="${A}" fill="${INK}" fill-rule="evenodd"/></svg>`
)}`

const FONT_DIR = join(process.cwd(), "node_modules", "@fontsource", "inter", "files")
const HOST = siteConfig.url.replace(/^https?:\/\//, "")

let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[]> | undefined

function loadFonts() {
  fonts ??= Promise.all(
    ([400, 600, 700] as const).map(async (weight) => ({
      name: "Inter",
      data: await readFile(join(FONT_DIR, `inter-latin-${weight}-normal.woff`)),
      weight,
      style: "normal" as const,
    }))
  )
  return fonts
}

// Longer titles get a smaller size so they always fit in three lines.
function titleSize(title: string) {
  if (title.length <= 12) return 128
  if (title.length <= 40) return 80
  if (title.length <= 70) return 68
  return 56
}

type OgImage = {
  title: string
  /** Shown after the name in the top row, e.g. "Blog". Without it the row is just the mark. */
  kicker?: string
  subtitle?: string
  /** Bottom-left line; the site's address is always bottom-right. */
  footer: string
}

export async function renderOgImage({ title, kicker, subtitle, footer }: OgImage) {
  const size = titleSize(title)

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: 40, background: INK, fontFamily: "Inter" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, border: `1px solid ${LINE}`, padding: "56px 56px 44px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} width={56} height={56} alt="" />
          {kicker && (
            <div style={{ display: "flex", marginLeft: 20, fontSize: 28, letterSpacing: -0.5 }}>
              <span style={{ color: PAPER, fontWeight: 600 }}>{siteConfig.name}</span>
              <span style={{ color: FAINT, marginLeft: 14 }}>/</span>
              <span style={{ color: MUTED, marginLeft: 14 }}>{kicker}</span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              color: PAPER,
              fontSize: size,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -size * 0.04,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", maxWidth: 1000, marginTop: 20, color: MUTED, fontSize: 32, lineHeight: 1.35 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            color: FAINT,
            fontSize: 24,
          }}
        >
          <span>{footer}</span>
          <span>{HOST}</span>
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await loadFonts() }
  )
}

// The share image for a top-level page: its title large, its description
// under it, and the name at the bottom.
export function pageOgImage(page: PageInfo) {
  return renderOgImage({
    title: page.title,
    subtitle: page.description,
    footer: `${siteConfig.name} · Software engineering student`,
  })
}
