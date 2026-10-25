import { Separator } from "@/components/ui/separator"

// On wide screens the section name sits in a narrow left column and stays in
// view while its content scrolls; on phones it stacks above the content.
export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mx-auto max-w-4xl px-6 max-sm:px-4">
      <Separator />
      <div className="grid gap-6 py-16 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-12 max-sm:py-12">
        <h2
          id={`${id}-heading`}
          className="text-sm font-medium text-muted-foreground md:sticky md:top-20 md:self-start md:pt-px"
        >
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  )
}
