import { renderOgImage } from "@/lib/og"

// The site's share image, at /og.png. Built once, at build time.
export const dynamic = "force-static"

export async function GET() {
  return renderOgImage({
    title: "Anjali",
    subtitle: "Software engineering student · Kubernetes contributor",
    footer: "Java · TypeScript · React · Node.js · Spring Boot · AWS",
  })
}
