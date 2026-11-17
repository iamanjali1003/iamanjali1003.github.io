import { GitMerge, GitPullRequest } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Contribution } from "@/content/types"

export function StatusBadge({ status }: { status: Contribution["status"] }) {
  return status === "merged" ? (
    <Badge>
      <GitMerge aria-hidden="true" />
      Merged
    </Badge>
  ) : (
    <Badge variant="outline">
      <GitPullRequest aria-hidden="true" />
      In review
    </Badge>
  )
}
