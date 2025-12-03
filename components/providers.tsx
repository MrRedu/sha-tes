'use client';

import { AppSidebar } from './app-sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from './ui/sidebar';
import { AuthProvider } from './auth/AuthProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          {/* <ProvidersInner>{children}</ProvidersInner> */}
          <div className="flex flex-1">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};
