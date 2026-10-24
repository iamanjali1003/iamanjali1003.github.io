"use client"

import {
  ArrowUpRight, FileText, Folder, Github, Hash, Linkedin, Mail, Monitor, Moon, Search, Sun, Terminal,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { sections } from "@/content/navigation"
import { profile } from "@/content/profile"
import { projects } from "@/content/projects"

const LINKS = [
  { label: "Resume", href: profile.links.resume, icon: FileText },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", href: profile.links.github, icon: Github },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "LeetCode", href: profile.links.leetcode, icon: Terminal },
  { label: "CodeChef", href: profile.links.codechef, icon: Terminal },
]

const THEMES = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
]

function openLink(href: string) {
  if (href.startsWith("mailto:")) window.location.href = href
  else window.open(href, "_blank", "noopener,noreferrer")
}

// ⌘K (or Ctrl+K) opens a palette to jump to a section, open a project or a
// link, or change the theme.
export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const pendingSection = useRef<string | null>(null)
  const { setTheme } = useTheme()

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

  // Closing returns focus to the trigger, and that focus() cancels a smooth
  // scroll already in progress, so the jump waits until the dialog has closed.
  function goToSection(id: string) {
    pendingSection.current = id
    setOpen(false)
  }

  function onCloseAutoFocus(event: Event) {
    const id = pendingSection.current
    if (!id) return
    event.preventDefault()
    pendingSection.current = null
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            aria-label="Search"
            onClick={() => setOpen(true)}
            className="h-8 gap-1.5 px-2 text-muted-foreground max-md:w-8 max-md:border-transparent max-md:px-0"
          >
            <Search className="size-3.5" />
            <Kbd className="max-md:hidden">⌘K</Kbd>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Search</TooltipContent>
      </Tooltip>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        onCloseAutoFocus={onCloseAutoFocus}
        title="Search"
        description="Jump to a section, open a project or a link, or change the theme."
      >
        <CommandInput placeholder="Search sections, projects, links…" />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>

          <CommandGroup heading="Sections">
            {sections.map(({ id, label }) => (
              <CommandItem
                key={id}
                value={`section ${label}`}
                onSelect={() => goToSection(id)}
              >
                <Hash />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />

          <CommandGroup heading="Projects">
            {projects.map(({ title, href, tech }) => (
              <CommandItem
                key={title}
                value={`project ${title} ${tech?.join(" ") ?? ""}`}
                onSelect={() => href && run(() => openLink(href))}
              >
                <Folder />
                {title}
                <ArrowUpRight className="ml-auto" />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />

          <CommandGroup heading="Links">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <CommandItem key={label} value={`link ${label}`} onSelect={() => run(() => openLink(href))}>
                <Icon />
                {label}
                <ArrowUpRight className="ml-auto" />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />

          <CommandGroup heading="Theme">
            {THEMES.map(({ label, value, icon: Icon }) => (
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
