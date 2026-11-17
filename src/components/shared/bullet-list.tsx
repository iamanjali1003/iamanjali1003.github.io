import { RichText } from "@/components/shared/rich-text"
import { cn } from "@/lib/utils"

// Square bullets, like everything else in the brand.
export function BulletList({ points, className }: { points: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2", className)}>
      {points.map((point) => (
        <li
          key={point}
          className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-[0.6em] before:left-0.5 before:size-1 before:bg-muted-foreground/60 before:content-['']"
        >
          <RichText text={point} />
        </li>
      ))}
    </ul>
  )
}
