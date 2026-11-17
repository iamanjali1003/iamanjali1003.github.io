import { Fragment } from "react"

import { TextLink } from "@/components/shared/text-link"

export { TextLink }

// The few pieces a post is written with, styled like the rest of the site:
// monochrome, square corners, Inter for text and the system mono for code.

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-14 text-[21px] font-semibold tracking-[-0.02em] text-foreground">{children}</h2>
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-base leading-[1.75] text-foreground/85">{children}</p>
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-muted px-1 py-0.5 font-mono text-[0.88em] text-foreground">{children}</code>
}

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <figure className="mt-5">
      {label && <figcaption className="mb-1.5 text-[12px] text-muted-foreground">{label}</figcaption>}
      <pre className="overflow-x-auto border bg-muted/40 p-4 font-mono text-[13px] leading-6 text-foreground">
        <code>{code}</code>
      </pre>
    </figure>
  )
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-[18px] text-base leading-[1.75] text-foreground/85 before:absolute before:top-[0.78em] before:left-[3px] before:size-1 before:bg-muted-foreground/60 before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-6 overflow-x-auto border">
      <table className="w-full text-left text-sm tabular-nums">
        <thead className="bg-muted/40 text-[13px] text-muted-foreground">
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-2.5 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join()} className="border-t">
              {row.map((cell, i) => (
                <Fragment key={i}>
                  {i === 0 ? (
                    <th scope="row" className="px-4 py-2.5 font-medium">
                      {cell}
                    </th>
                  ) : (
                    <td className="px-4 py-2.5 text-foreground/85">{cell}</td>
                  )}
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
