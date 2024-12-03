import { NavLink } from "@remix-run/react";
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

import { Search, Plus } from "@mynaui/icons-react"
import LogoIcon from "~/assets/icon.png";
import { LogoType } from "~/components/logo-type";


const SidebarLogoButton = () => {
  return (<SidebarMenuButton size="lg" asChild>
    <NavLink to="/">
      <div className="flex aspect-square size-8 items-center justify-center rounded-none">
        <img src={LogoIcon} className="w-[100%] max-w-9" />
      </div>
      <LogoType />
    </NavLink>
  </SidebarMenuButton>);
};


const SidebarHeaderContent = ({ noLogo }: { noLogo?: boolean }) => {

  return (<SidebarMenu>
    <SidebarMenuItem>{noLogo ? <SidebarTrigger /> : <SidebarLogoButton />}
    </SidebarMenuItem>
  </SidebarMenu>);
};

const SidebarSearchGroup = () => {
  return (<SidebarGroup>
    <SidebarGroupLabel> Search </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="書誌レコードを検索" asChild>
            <NavLink to="/search">
              <Search />
              <span>Search</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>);
}

const SidebarCreateGroup = () => {
  return (<SidebarGroup>
    <SidebarGroupLabel> Create </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="書誌レコードを追加" asChild>
            <NavLink to="/new">
              <Plus />
              <span>Create New</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>);
}

export function AppSidebar({ noLogo }: { noLogo?: boolean }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader >
        <SidebarHeaderContent noLogo={noLogo} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarSearchGroup />
        <SidebarCreateGroup />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

