import { AppSidebar } from './app-sidebar/app-sidebar';
import { SidebarProvider } from './ui/sidebar';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />

        {children}
      </SidebarProvider>
    </>
  );
};
