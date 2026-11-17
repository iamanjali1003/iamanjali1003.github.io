import { externalProps } from "@/lib/links"
import { cn } from "@/lib/utils"

// An underlined link: a faint underline that darkens on hover.
export function TextLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...externalProps(href)}
      className={cn(
        "text-foreground underline decoration-border underline-offset-[3px] transition-colors hover:decoration-foreground",
        className
      )}
    >
      {children}
    </a>
  )
}
