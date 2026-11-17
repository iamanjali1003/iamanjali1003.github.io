import { siteConfig } from "@/config/site"
import { renderOgImage } from "@/lib/og"

// The site's share image, at /og.png, drawn once at build time.
export const dynamic = "force-static"

export function GET() {
  return renderOgImage({
    title: siteConfig.name,
    subtitle: "Software engineering student · Kubernetes contributor",
    footer: "Java · TypeScript · React · Node.js · Spring Boot · AWS",
  })
}
