'use client';

import * as React from 'react';

import { AuthProvider } from './auth/AuthProvider';
import { SidebarProvider } from './ui/sidebar';
import { Toaster } from './ui/sonner';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <AuthProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <>{children}</>
          </SidebarProvider>
        </NextThemesProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
};
