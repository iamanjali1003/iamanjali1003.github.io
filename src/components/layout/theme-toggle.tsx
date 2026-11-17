"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // Which icon shows is decided by CSS, so the server and client render the
  // same markup and there is nothing to mismatch on hydration.
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="-mr-2 inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  )
}
