import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { NavigationDashboard } from '@/components/molecules/navigation-dashboard';
import { SidebarInset } from '@/components/ui/sidebar';
import { BreadcrumbProvider } from '@/context/breadcrumb-context';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BreadcrumbProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col h-screen overflow-y-auto bg-background">
        <NavigationDashboard />
        <SidebarInset>
          <main>{children}</main>
        </SidebarInset>
      </div>
    </BreadcrumbProvider>
  );
}
