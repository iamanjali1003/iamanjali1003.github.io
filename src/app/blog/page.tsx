import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { PostList } from "@/components/shared/post-list"
import { profile } from "@/content/profile"
import { posts } from "@/content/writing"
import { SITE_IMAGE } from "@/lib/og"

const description = "Notes on open source and building software."

export const metadata: Metadata = {
  title: `Writing · ${profile.name}`,
  description,
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    url: "/blog/",
    siteName: profile.name,
    locale: "en_IN",
    title: `Writing · ${profile.name}`,
    description,
    images: [SITE_IMAGE],
  },
  twitter: { card: "summary_large_image", title: `Writing · ${profile.name}`, description, images: [SITE_IMAGE] },
}

export default function BlogIndex() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Container className="pt-14 sm:pt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-[36px] leading-none font-semibold tracking-[-0.045em] sm:text-[44px]">Writing</h1>
            <a href="/feed.xml" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
              RSS
            </a>
          </div>
          <p className="mt-4 text-[15px] text-muted-foreground">{description}</p>
          <div className="mt-14">
            <PostList posts={posts} withDescription />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
