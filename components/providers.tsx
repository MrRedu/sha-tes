'use client';

import * as React from 'react';

import { AuthProvider } from './auth/AuthProvider';
import { SidebarProvider } from './ui/sidebar';
import { Toaster } from './ui/sonner';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import QueryProvider from './providers/query-provider';

interface ProvidersProps {
  children: React.ReactNode;
  sidebarIsOpen?: boolean;
}

export const Providers = ({ children, sidebarIsOpen }: ProvidersProps) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={sidebarIsOpen}>
            <>{children}</>
          </SidebarProvider>
        </NextThemesProvider>
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  );
};
