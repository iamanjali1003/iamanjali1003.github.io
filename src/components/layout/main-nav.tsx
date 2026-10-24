import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { navigation } from "@/content/navigation"
import { cn } from "@/lib/utils"

export function MainNav({ active }: { active: string | null }) {
  return (
    <NavigationMenu viewport={false} className="max-md:hidden">
      <NavigationMenuList className="gap-0">
        {navigation.map(({ id, label }) => (
          <NavigationMenuItem key={id}>
            <NavigationMenuLink
              asChild
              active={active === id}
              className={cn(
                navigationMenuTriggerStyle(),
                "h-7 bg-transparent px-2 text-[13px] font-normal text-muted-foreground data-[active]:font-medium data-[active]:text-foreground"
              )}
            >
              <a href={`#${id}`}>{label}</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
