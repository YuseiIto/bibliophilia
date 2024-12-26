import type { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";

export function SidebarOnlyLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar noLogo />
			<SidebarInset>
				<main>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
