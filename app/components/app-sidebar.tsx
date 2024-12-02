import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger
} from "~/components/ui/sidebar"

import { Search } from "@mynaui/icons-react"
import LogoIcon from "~/assets/icon.png";
import { LogoType } from "~/components/logo-type";

export function AppSidebar({ noLogo }: { noLogo?: boolean }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem>{noLogo ? <SidebarTrigger/> :
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-none">
                  <img src={LogoIcon} className="w-[100%] max-w-9" />
                </div>
                <LogoType />
              </a>
            </SidebarMenuButton>
          }
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel> Search </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Find items" asChild>
                  <a href="/search">
                    <Search />
                    <span>Search</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

