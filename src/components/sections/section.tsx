import type { LucideIcon } from "lucide-react"

export function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string
  title: string
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mx-auto max-w-3xl border-b px-6 py-14 last:border-b-0 max-sm:px-4 max-sm:py-10"
    >
      <div className="mb-6 flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
        <h2 id={`${id}-heading`} className="text-[13px] font-medium uppercase tracking-[0.06em]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
