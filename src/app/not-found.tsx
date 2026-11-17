import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

// GitHub Pages serves this as 404.html for any path the site doesn't have.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Container className="pt-14 sm:pt-24">
          <p className="text-[13px] text-muted-foreground tabular-nums">404</p>
          <h1 className="mt-3 text-[36px] leading-none font-semibold tracking-[-0.045em] sm:text-[44px]">
            Page not found
          </h1>
          <p className="mt-5 text-[15px] text-muted-foreground">The page you’re looking for isn’t here.</p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Home
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
