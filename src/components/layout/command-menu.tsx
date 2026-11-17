"use client"

import { ArrowUpRight, FileText, Folder, Hash, Mail, PenLine, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { THEMES } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { mainNav, siteConfig } from "@/config/site"
import { useKeyboardOnlyReturnFocus } from "@/hooks/use-keyboard-only-return-focus"
import type { PostSummary } from "@/lib/blog"

const LINKS = [
  { label: "Resume", href: siteConfig.links.resume, icon: FileText },
  { label: "Email", href: siteConfig.links.email, icon: Mail },
  { label: "GitHub", href: siteConfig.links.github, icon: ArrowUpRight },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: ArrowUpRight },
]

type Item = { name: string; href: string }

// ⌘K (Ctrl+K on Windows and Linux) opens a search over the pages, projects,
// posts and links, and can switch the theme.
export function CommandMenu({ projects, posts }: { projects: Item[]; posts: PostSummary[] }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()
  const returnFocus = useKeyboardOnlyReturnFocus()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function run(action: () => void) {
    setOpen(false)
    action()
  }

  const go = (href: string) => run(() => router.push(href))
  const visit = (href: string) =>
    run(() => (href.startsWith("mailto:") ? (window.location.href = href) : window.open(href, "_blank", "noopener,noreferrer")))

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="w-52 justify-start bg-muted/40 font-normal text-muted-foreground shadow-none max-lg:hidden"
      >
        <Search aria-hidden="true" />
        Search…
        <Kbd className="ml-auto">⌘K</Kbd>
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={() => setOpen(true)} aria-label="Search" className="lg:hidden">
        <Search aria-hidden="true" />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        onCloseAutoFocus={returnFocus}
        title="Search"
        description="Go to a page, project or post, open a link, or change the theme."
      >
        <CommandInput placeholder="Search pages, projects, posts…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {[{ title: "Home", href: "/" }, ...mainNav].map(({ title, href }) => (
              <CommandItem key={href} value={`page ${title}`} onSelect={() => go(href)}>
                <Hash />
                {title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            {projects.map(({ name, href }) => (
              <CommandItem key={name} value={`project ${name}`} onSelect={() => visit(href)}>
                <Folder />
                {name}
              </CommandItem>
            ))}
          </CommandGroup>
          {posts.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Posts">
                {posts.map(({ slug, title }) => (
                  <CommandItem key={slug} value={`post ${title}`} onSelect={() => go(`/blog/${slug}/`)}>
                    <PenLine />
                    {title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />
          <CommandGroup heading="Links">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <CommandItem key={label} value={`link ${label}`} onSelect={() => visit(href)}>
                <Icon />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            {THEMES.map(({ value, label, icon: Icon }) => (
              <CommandItem key={value} value={`theme ${label}`} onSelect={() => run(() => setTheme(value))}>
                <Icon />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
