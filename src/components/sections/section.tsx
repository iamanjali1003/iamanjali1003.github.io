import { Container } from "@/components/layout/container"

// A small muted title with a hairline running to the right edge, and an
// optional link at the end of the line (e.g. "All writing").
export function Section({
  id,
  title,
  action,
  children,
}: {
  id: string
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Container as="section" id={id} aria-labelledby={`${id}-heading`} className="mt-20 scroll-mt-6 sm:mt-24">
      <div className="mb-8 flex items-center gap-4">
        <h2 id={`${id}-heading`} className="shrink-0 text-[13px] font-medium text-muted-foreground">
          {title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        {action}
      </div>
      {children}
    </Container>
  )
}
