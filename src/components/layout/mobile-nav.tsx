"use client"

import { FileText, Menu } from "lucide-react"
import { useRef, useState } from "react"

import { Mark } from "@/components/shared/mark"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sections } from "@/content/navigation"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"

export function MobileNav({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false)
  const pendingSection = useRef<string | null>(null)

  // As in the command menu: let the sheet close and skip returning focus to the
  // menu button, which would cancel the smooth scroll, then scroll.
  function onCloseAutoFocus(event: Event) {
    const id = pendingSection.current
    if (!id) return
    event.preventDefault()
    pendingSection.current = null
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", `#${id}`)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Open menu" className="md:hidden">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 gap-0 p-0 sm:max-w-xs" onCloseAutoFocus={onCloseAutoFocus}>
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2.5 text-[15px]">
            <Mark />
            {profile.name}
          </SheetTitle>
          <SheetDescription className="sr-only">Jump to a section</SheetDescription>
        </SheetHeader>

        <nav aria-label="Sections" className="flex flex-col p-2">
          {sections.map(({ id, label }) => (
            <Button
              key={id}
              asChild
              variant="ghost"
              className={cn(
                "h-10 justify-start px-3 text-sm font-normal",
                active === id && "bg-accent font-medium text-foreground"
              )}
            >
              <a
                href={`#${id}`}
                onClick={(event) => {
                  event.preventDefault()
                  pendingSection.current = id
                  setOpen(false)
                }}
              >
                {label}
              </a>
            </Button>
          ))}
        </nav>

        <SheetFooter className="border-t p-4">
          <Button asChild>
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              Resume
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
