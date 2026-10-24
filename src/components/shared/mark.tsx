import { cn } from "@/lib/utils"

// The brand monogram: a square with the A cut out of it. It takes the theme's
// foreground colour, so it is black on light and white on dark.
const A = "M42 22 L58 22 L81 78 L67 78 L62.07 66 L37.93 66 L33 78 L19 78 Z M42.04 56 L57.96 56 L50 36.6 Z"

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("size-[22px] shrink-0", className)}>
      <rect width="100" height="100" className="fill-foreground" />
      <path d={A} fillRule="evenodd" className="fill-background" />
    </svg>
  )
}
