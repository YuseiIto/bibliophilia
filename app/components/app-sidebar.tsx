import { NavLink } from "@remix-run/react";
import { useRef, useState, useEffect } from "react";
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
	SidebarTrigger,
} from "~/components/ui/sidebar";

import { Search, Plus } from "@mynaui/icons-react";
import LogoIcon from "~/assets/icon.png";
import { LogoType } from "~/components/logo-type";

const SidebarLogoButton = () => {
	return (
		<SidebarMenuButton size="lg" asChild>
			<NavLink to="/">
				<div className="flex aspect-square size-8 items-center justify-center rounded-none">
					<img src={LogoIcon} alt="Bibliophilia" className="w-[100%] max-w-9" />
				</div>
				<LogoType />
			</NavLink>
		</SidebarMenuButton>
	);
};

const SidebarHeaderContent = ({ noLogo }: { noLogo?: boolean }) => {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{noLogo ? <SidebarTrigger /> : <SidebarLogoButton />}
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

const SidebarSearchGroup = () => {
	return (
		<SidebarGroup>
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
		</SidebarGroup>
	);
};

const SidebarCreateGroup = () => {
	const ref = useRef(null);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const isActive = ref.current.classList.contains("active");
		setIsActive(isActive);
	}, [ref.current]);

	return (
		<SidebarGroup>
			<SidebarGroupLabel> Create </SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<NavLink to="/new" ref={ref}>
							<SidebarMenuButton
								tooltip="書誌レコードを追加"
								isActive={isActive}
							>
								<Plus />
								<span>Create New</span>
							</SidebarMenuButton>
						</NavLink>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};

export function AppSidebar({ noLogo }: { noLogo?: boolean }) {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarHeaderContent noLogo={noLogo} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarSearchGroup />
				<SidebarCreateGroup />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
