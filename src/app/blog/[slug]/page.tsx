import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { MdxContent } from "@/components/blog/mdx-content"
import { PostPager } from "@/components/blog/post-pager"
import { ShareButtons } from "@/components/blog/share-buttons"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { JsonLd } from "@/components/shared/json-ld"
import { Mark } from "@/components/shared/mark"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { pages } from "@/config/pages"
import { absoluteUrl, siteConfig } from "@/config/site"
import { getAdjacentPosts, getPost, getPosts, toSummary } from "@/lib/blog"
import { formatDate } from "@/lib/format"
import { blogPostingSchema, breadcrumbSchema } from "@/lib/json-ld"
import { createMetadata } from "@/lib/seo"

type Props = { params: Promise<{ slug: string }> }

// One page per post, built at export time. Unknown slugs are a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  })
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  const { newer, older } = getAdjacentPosts(post.slug)
  const url = absoluteUrl(`/blog/${post.slug}/`)

  return (
    <>
      <JsonLd
        graph={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: pages.blog.title, path: pages.blog.path },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        ]}
      />
      <div className="grid gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <article className="max-w-2xl min-w-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={pages.blog.path}>{pages.blog.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="truncate">{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="mt-6 border-b pb-6">
            <h1 className="text-4xl font-semibold tracking-tight text-balance max-sm:text-3xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <Mark className="size-8" />
              <div>
                <Link href={pages.about.path} rel="author" className="font-medium hover:underline underline-offset-4">
                  {siteConfig.author.name}
                </Link>
                <p className="text-muted-foreground tabular-nums">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
                  {post.updated && (
                    <>
                      {" "}
                      · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                    </>
                  )}
                </p>
              </div>
              <div className="ml-auto">
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
          </header>

          <div className="mt-2">
            <MdxContent source={post.body} />
          </div>

          <PostPager newer={newer && toSummary(newer)} older={older && toSummary(older)} />
        </article>

        <aside className="max-lg:hidden">
          <div className="sticky top-24">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>
    </>
  )
}
