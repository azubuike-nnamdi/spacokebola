"use client"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { NavUser } from "@/components/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sideItem } from "@/data"
import Image from "next/image"
import Link from "next/link"



export function AppSidebar() {
  const pathname = usePathname()

  // Find the sidebar item with the longest matching prefix
  const activeItem = sideItem.reduce<{ title: string; url: string; icon: LucideIcon } | null>((prev, curr) => {
    if (
      pathname.startsWith(curr.url) &&
      (pathname === curr.url || pathname[curr.url.length] === '/' || pathname[curr.url.length] === undefined)
    ) {
      if (!prev || curr.url.length > prev.url.length) {
        return curr;
      }
    }
    return prev;
  }, null);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 py-2">
            <Image src="/assets/img/spac-logo.png" alt="SPAC OKE BOLA" width={30} height={30} />
            <SidebarGroupLabel className="text-lg font-bold">SPAC OKE BOLA</SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={!!activeItem && activeItem.url === item.url}
                    className="data-[active=true]:bg-black data-[active=true]:text-white"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
