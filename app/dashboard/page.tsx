'use client';
import { useAuth } from '@/components/auth/AuthProvider';
import { EmptyProjects } from '@/components/organisms/empty-projects';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const isLogged = Boolean(user);

  // projects.length > 0;
  const ARE_ANY_PROJECTS = false;

  return (
    <>
      {isLogged ? (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Panel principal</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Project 1</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      ) : null}
      <SidebarInset>
        {ARE_ANY_PROJECTS ? (
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            {/* Dashboard content goes here */}
            My projects...
          </div>
        ) : (
          <EmptyProjects />
        )}
      </SidebarInset>
    </>
  );
}
