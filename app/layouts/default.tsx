import {
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Separator } from "~/components/ui/separator";

export function DefaultLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-[2rem] shrink-0 items-center gap-2 border-b px-4 fixed top-0 w-full bg-white z-50">
					<SidebarTrigger />
					<Separator orientation="vertical" className="mr-2 h-4" />
				</header>
				<div className="mt-8 h-[calc(100vh-2rem)] w-full">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
