import { Mark } from "@/components/shared/mark"
import { footerLinks, siteConfig } from "@/config/site"
import { externalProps } from "@/lib/links"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="page-container flex flex-col gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2">
          <Mark className="size-4" />© {new Date().getFullYear()} {siteConfig.name} · Bengaluru
        </p>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map(({ title, href }) => (
            <a key={title} href={href} {...externalProps(href)} className="transition-colors hover:text-foreground">
              {title}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
