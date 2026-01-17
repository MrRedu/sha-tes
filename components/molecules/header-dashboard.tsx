'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBreadcrumb } from '@/context/breadcrumb-context';

export const HeaderDashboard = () => {
  const pathname = usePathname();
  const { labels } = useBreadcrumb();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {/* Dashboard Home */}
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Panel principal</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            if (segment === 'dashboard') return null;
            if (segment === 'notebooks') return null; // Tu preferencia de ocultar este segmento

            const path = `/${segments.slice(0, index + 1).join('/')}`;
            const isLast = index === segments.length - 1;

            // Heurística simple para saber si es un UUID (segmentos de datos)
            const isID = segment.length > 20;

            let label = segment;
            if (segment === 'projects') label = 'Proyectos';

            // Si es un ID, buscamos si ya se registró su nombre en el contexto
            if (isID) {
              label = labels[segment] || segment.substring(0, 8) + '...';
            }

            return (
              <div key={path} className="flex items-center gap-2">
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={path}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
