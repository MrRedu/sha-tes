'use client';

import { AuthProvider } from './auth/AuthProvider';
import { SidebarProvider } from './ui/sidebar';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
    </AuthProvider>
  );
};
