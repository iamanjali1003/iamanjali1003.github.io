"use client"

import { FileText, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { isActive } from "@/components/layout/main-nav"
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
import { mainNav, siteConfig } from "@/config/site"
import { useKeyboardOnlyReturnFocus } from "@/hooks/use-keyboard-only-return-focus"
import { cn } from "@/lib/utils"

// The menu on phones: a sheet from the right with every page and the resume.
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const returnFocus = useKeyboardOnlyReturnFocus()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Open menu" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 gap-0 p-0" onCloseAutoFocus={returnFocus}>
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2.5">
            <Mark />
            {siteConfig.name}
          </SheetTitle>
          <SheetDescription className="sr-only">Go to a page</SheetDescription>
        </SheetHeader>
        <nav aria-label="Pages" className="flex flex-col p-2">
          {[{ title: "Home", href: "/" }, ...mainNav].map(({ title, href }) => {
            const active = href === "/" ? pathname === "/" : isActive(pathname, href)
            return (
              <Button
                key={href}
                asChild
                variant="ghost"
                className={cn("h-10 justify-start px-3 font-normal", active && "bg-accent font-medium")}
              >
                <Link href={href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
                  {title}
                </Link>
              </Button>
            )
          })}
        </nav>
        <SheetFooter className="border-t p-4">
          <Button asChild>
            <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              Resume
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
