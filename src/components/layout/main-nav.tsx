"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { mainNav } from "@/config/site"
import { cn } from "@/lib/utils"

// The section a page belongs to: /blog/a-post/ is under Blog.
export const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href)

export function MainNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu viewport={false} className="max-md:hidden">
      <NavigationMenuList className="gap-0.5">
        {mainNav.map(({ title, href }) => {
          const active = isActive(pathname, href)
          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                asChild
                active={active}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "h-8 bg-transparent px-3 font-normal text-muted-foreground aria-[current=page]:bg-accent aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                )}
              >
                <Link href={href} aria-current={active ? "page" : undefined}>
                  {title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
