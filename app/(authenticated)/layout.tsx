import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { HeaderDashboard } from '@/components/molecules/header-dashboard';
import { SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HeaderDashboard />
        <SidebarInset>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </div>
    </>
  );
}
