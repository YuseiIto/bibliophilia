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
  SidebarRail
} from "~/components/ui/sidebar"

import { Search } from "@mynaui/icons-react"
import LogoIcon from "~/assets/icon.png";


export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader >
        <div className="flex flex-row gap-2 items-center">
          <img src={LogoIcon} className="max-w-10"/>
          <span className="text-xl"> Bibliophilia </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel> Search </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Find items">
                  <Search />
                  <span>Search</span>
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

