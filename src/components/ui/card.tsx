import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col border bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Card }
