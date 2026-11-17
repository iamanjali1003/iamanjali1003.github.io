import type { Contribution } from "./types"

const HACKTOBERFEST = {
  label: "Hacktoberfest 2024",
  href: "https://drive.google.com/file/d/1llP7FIIgWXAP9vZ8Gf6RpLwLQ3OJ6Abw/view",
}

// Newest first. Update the status when an open PR merges or closes.
export const contributions: Contribution[] = [
  {
    repo: "kubernetes-sigs/headlamp",
    title: "Show suspended CronJobs and Jobs as suspended, not degraded",
    href: "https://github.com/kubernetes-sigs/headlamp/pull/8486",
    status: "open",
    date: "Nov 2026",
  },
  {
    repo: "kubernetes-sigs/inference-perf",
    title: "Update the docs to match the corrected achieved rate",
    href: "https://github.com/kubernetes-sigs/inference-perf/pull/1071",
    status: "merged",
    date: "Nov 2026",
  },
  {
    repo: "kubernetes-sigs/inference-perf",
    title: "Fix the achieved request rate in benchmark reports",
    href: "https://github.com/kubernetes-sigs/inference-perf/pull/1055",
    status: "merged",
    date: "Nov 2026",
  },
  {
    repo: "parquet-go/parquet-go",
    title: "Add badges and rework the README header",
    href: "https://github.com/parquet-go/parquet-go/pull/177",
    status: "merged",
    date: "Oct 2024",
    note: HACKTOBERFEST,
  },
  {
    repo: "shivamsouravjha/stock-backend",
    title: "Replace print statements with structured logging (zap)",
    href: "https://github.com/shivamsouravjha/stock-backend/pull/13",
    status: "merged",
    date: "Oct 2024",
    note: HACKTOBERFEST,
  },
]
