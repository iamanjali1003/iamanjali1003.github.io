import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { profile } from "@/content/profile"

// Share images (Open Graph), drawn at build time: the site's own and one per
// post, in the brand's look. Ink background, a hairline frame, the square mark,
// Inter only.

export const OG_SIZE = { width: 1200, height: 630 }

// The site's own card, drawn by src/app/og.png/route.tsx. Pages without their
// own image use this one.
export const SITE_IMAGE = { url: "/og.png", ...OG_SIZE, alt: "Anjali, software engineering student" }

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

async function loadFonts() {
  const weights = [400, 600, 700] as const
  return Promise.all(
    weights.map(async (weight) => ({
      name: "Inter",
      data: await readFile(join(FONT_DIR, `inter-latin-${weight}-normal.woff`)),
      weight,
      style: "normal" as const,
    }))
  )
}

// Longer titles get a smaller size so they always fit in three lines.
function titleSize(title: string) {
  if (title.length <= 12) return 128
  if (title.length <= 40) return 80
  if (title.length <= 70) return 68
  return 56
}

const host = profile.url.replace(/^https?:\/\//, "")

export async function renderOgImage({
  title,
  kicker,
  subtitle,
  footer,
}: {
  title: string
  /** Shown after the name in the top row, e.g. "Writing". Leave out on the home card. */
  kicker?: string
  subtitle?: string
  footer: string
}) {
  const size = titleSize(title)

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: 40, background: INK, fontFamily: "Inter" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          border: `1px solid ${LINE}`,
          padding: "56px 56px 44px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} width={56} height={56} alt="" />
          {kicker && (
            <div style={{ display: "flex", marginLeft: 20, fontSize: 28, letterSpacing: -0.5 }}>
              <span style={{ color: PAPER, fontWeight: 600 }}>{profile.name}</span>
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
          {subtitle && <div style={{ display: "flex", marginTop: 18, color: MUTED, fontSize: 34 }}>{subtitle}</div>}
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
          <span>{host}</span>
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await loadFonts() }
  )
}
