import type { LucideIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"

export function Section({
  id,
  index,
  title,
  icon: Icon,
  children,
}: {
  id: string
  /** Shown before the title, e.g. "01". */
  index: string
  title: string
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mx-auto max-w-3xl px-6 max-sm:px-4">
      <Separator />
      <div className="py-14 max-sm:py-10">
        <div className="mb-6 flex items-center gap-3 text-muted-foreground">
          <span className="font-mono text-xs">{index}</span>
          <Icon className="size-4" aria-hidden="true" />
          <h2 id={`${id}-heading`} className="text-[13px] font-medium tracking-[0.06em] uppercase">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}
