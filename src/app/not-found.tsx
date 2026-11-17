import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

// GitHub Pages serves this as 404.html for any path the site doesn't have.
export default function NotFound() {
  return (
    <div className="py-24 max-sm:py-16">
      <p className="text-sm text-muted-foreground tabular-nums">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-lg text-muted-foreground">The page you’re looking for isn’t here.</p>
      <Button variant="outline" asChild className="mt-8">
        <Link href="/">
          <ArrowLeft />
          Home
        </Link>
      </Button>
    </div>
  )
}
