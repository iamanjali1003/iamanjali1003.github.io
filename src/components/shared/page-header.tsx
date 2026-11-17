import type { PageInfo } from "@/config/pages"

// The title block at the top of every inner page, from src/config/pages.ts.
export function PageHeader({ page, children }: { page: PageInfo; children?: React.ReactNode }) {
  return (
    <div className="py-14 max-sm:py-10">
      <h1 className="text-4xl font-semibold tracking-tight text-balance max-sm:text-3xl">{page.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-pretty text-muted-foreground">{page.description}</p>
      {children && <div className="mt-6 flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}
