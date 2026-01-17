'use client';

import * as React from 'react';

import { AuthProvider } from './auth/AuthProvider';
import { SidebarProvider } from './ui/sidebar';
import { Toaster } from './ui/sonner';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
  sidebarIsOpen?: boolean;
}

export const Providers = ({ children, sidebarIsOpen }: ProvidersProps) => {
  return (
    <>
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
      </AuthProvider>
      <Toaster />
    </>
  );
};
