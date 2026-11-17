import { cn } from "@/lib/utils"

// One column, the same width on every page, so the header, the sections, a
// post and the footer all share a left edge.
export function Container({
  as: Tag = "div",
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "header" | "footer" | "article" | "nav" }) {
  return <Tag className={cn("mx-auto w-full max-w-[46rem] px-6 max-sm:px-5", className)} {...props} />
}
