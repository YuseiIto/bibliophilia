import { SidebarProvider} from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarInset } from "~/components/ui/sidebar";

export function SidebarOnlyLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar noLogo />
      <SidebarInset>
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider >
  )
}
