"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu"

import { productItems } from "@/lib/navigation"
import Link from "next/link"

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2 sm:gap-3.5">
        {/* Product */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-90 p-2 sm:w-105 sm:p-3">
              {productItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="flex w-full flex-col rounded-xl p-2 text-left transition-colors hover:bg-muted sm:p-3"
                >
                  <span className="font-medium">{item.title}</span>

                  <span className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Playground */}
        <NavigationMenuItem className="hidden sm:block">
          <NavigationMenuLink
            render={<Link href="#playground">Playground</Link>}
          />
        </NavigationMenuItem>

        {/* Pricing */}
        <NavigationMenuItem>
          <NavigationMenuLink render={<Link href="#pricing">Pricing</Link>} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navigation
