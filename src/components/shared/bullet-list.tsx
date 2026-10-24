import { RichText } from "@/components/shared/rich-text"

export function BulletList({ points }: { points: string[] }) {
  return (
    <ul className="space-y-2">
      {points.map((point) => (
        <li
          key={point}
          className="relative pl-[18px] text-sm leading-[1.65] text-muted-foreground before:absolute before:top-[9px] before:left-[3px] before:size-1 before:bg-muted-foreground/60 before:content-['']"
        >
          <RichText text={point} />
        </li>
      ))}
    </ul>
  )
}
