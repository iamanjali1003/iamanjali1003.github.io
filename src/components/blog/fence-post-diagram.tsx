// Five sends one second apart, drawn as fence posts with the four gaps between
// them labelled above and the send times below.
const POSTS = [0, 1, 2, 3, 4]
const X0 = 40
const STEP = 100
const x = (i: number) => X0 + i * STEP

export function FencePostDiagram() {
  return (
    <figure className="mt-6 border px-4 pt-5 pb-4">
      <svg
        viewBox="0 0 480 136"
        role="img"
        aria-label="Five sends at 0, 1, 2, 3 and 4 seconds, with four one-second gaps between them."
        className="w-full"
      >
        {POSTS.slice(1).map((i) => (
          <g key={`gap-${i}`} className="fill-muted-foreground stroke-muted-foreground">
            <text x={(x(i - 1) + x(i)) / 2} y={30} textAnchor="middle" fontSize={16} stroke="none">
              gap {i}
            </text>
            <path d={`M${x(i - 1) + 10} 46 V40 H${x(i) - 10} V46`} fill="none" strokeWidth={1.25} />
          </g>
        ))}
        <line x1={20} x2={460} y1={80} y2={80} className="stroke-border" strokeWidth={2} />
        {POSTS.map((i) => (
          <g key={`post-${i}`}>
            <rect x={x(i) - 5} y={58} width={10} height={44} className="fill-foreground" />
            <text x={x(i)} y={126} textAnchor="middle" fontSize={16} className="fill-muted-foreground">
              {i} s
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
        Five sends, four gaps, four seconds. The rate is 4 gaps ÷ 4 s = 1.0 per second, not 5 ÷ 4 = 1.25.
      </figcaption>
    </figure>
  )
}
