import { Card, CardContent, CardHeader } from "@/components/ui/card"

// A card with a small title bar, used for the resume blocks. The heading level
// follows where the card sits: h2 on the about page, h3 under a home section.
export function TitledCard({
  title,
  as: Heading = "h2",
  children,
}: {
  title: string
  as?: "h2" | "h3"
  children: React.ReactNode
}) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-4 [.border-b]:pb-4">
        <Heading className="text-sm leading-none font-medium">{title}</Heading>
      </CardHeader>
      <CardContent className="py-6">{children}</CardContent>
    </Card>
  )
}
