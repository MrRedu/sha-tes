'use client';

import type { ProjectWithMembers, RpcPendingProjects } from '@/types/types';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FolderInput, ArrowUpRightIcon, PlusIcon, SearchIcon } from 'lucide-react';

import { HeaderProjects } from './header-projects';
import { CardProject } from './card-project';

import { useProjects } from '@/hooks/use-projects';

import { EmptyState } from '@/components/organisms/empty-state';

import { Button } from '@/components/ui/button';

import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { DialogJoinProject } from '@/components/organisms/dialog-join-project';
import { CardPendingProject } from '@/components/molecules/card-pending-project';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { actions } from '@/actions';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';

export const ProjectsClient = () => {
  const { projects, isLoading, isSearching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProjects({
      itemsPerPage: 7,
    });

  const { data: pendingProjects } = useQuery({
    queryKey: ['pending-projects'],
    queryFn: async () => {
      const { pendingProjects, error } = await actions.projects.fetchPendingProjects();
      if (error) throw new Error(error);
      return pendingProjects;
    },
  });

  const pendingCards =
    pendingProjects && pendingProjects.length >= 1
      ? pendingProjects.map((entry: any, index: number) => (
          <CardPendingProject
            key={`pending-${index}`}
            name={entry?.project_name || ''}
            ownerName={entry?.owner_full_name || ''}
          />
        ))
      : null;

  // Initial Empty state (Only if not loading)
  if (!isLoading && projects?.length === 0 && pendingProjects?.length === 0) {
    return (
      <section className="w-full min-h-[calc(100svh-6rem)] grid place-items-center">
        <EmptyState
          icon={FolderInput}
          // title="No projects yet"
          title="Sin proyectos aún"
          // description="Get started by creating a new project or joining an existing one."
          description="Comienza creando un nuevo proyecto o uniéndote a uno existente."
          action={
            <div className="flex gap-2">
              <DialogCreateProject />
              <DialogJoinProject />
            </div>
          }
          footer={
            <Button variant="link" asChild className="text-muted-foreground" size="sm">
              <Link href="#">
                Learn More <ArrowUpRightIcon className="size-4" />
              </Link>
            </Button>
          }
        />
      </section>
    );
  }

  return (
    <section className="space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <HeaderProjects />

      {/* Grid wrapper */}
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300',
          isSearching ? 'opacity-50 grayscale-50 pointer-events-none' : 'opacity-100'
        )}
      >
        {/* Skeletons while hydrating/loading to avoid layout shift */}
        {isLoading && projects.length === 0 && (
          <>
            <Skeleton className="h-[250px] w-full col-span-1 md:col-span-2" />
            <Skeleton className="h-[250px] w-full col-span-1" />
            <Skeleton className="h-[250px] w-full col-span-1" />
            <Skeleton className="h-[250px] w-full col-span-1" />
            <Skeleton className="h-[250px] w-full col-span-1" />
            <Skeleton className="h-[250px] w-full col-span-1" />
          </>
        )}

        {projects?.map((project, index) => {
          return (
            <CardProject
              key={`project-${index}-${project.id}`}
              id={project.id}
              priority={project.priority}
              updated_at={project.updated_at}
              title={project.title}
              description={project.description}
              className={cn('w-full', index === 0 ? 'col-span-1 md:col-span-2' : 'col-span-1')}
              members={project.members}
            />
          );
        })}

        {/* Empty Search/Filter results */}
        {!isLoading && !isSearching && projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
            <div className="bg-muted size-16 rounded-full flex items-center justify-center mb-4">
              <SearchIcon className="size-8 text-muted-foreground/60" />
            </div>
            <h3 className="text-xl font-semibold">No encontramos nada</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              No hay proyectos que coincidan con tu búsqueda o filtros actuales.
            </p>
          </div>
        )}

        {/* Always visible at the end, but disabled during initial load to prevent jump */}
        <DialogCreateProject
          triggerComponent={
            <Card
              className={
                'h-full cursor-pointer border-dashed border-2 transition-all duration-300 text-center bg-transparent opacity-50 hover:opacity-100 gap-0 justify-center'
              }
            >
              <CardHeader className="flex items-center justify-center">
                <Button className="rounded-full" variant="secondary" size="icon-lg">
                  <PlusIcon className="size-6" />
                </Button>
              </CardHeader>
              <CardContent>
                <h3>Crear nuevo proyecto</h3>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <Typography variant="xsmall" className="mt-0!">
                  Crea un nuevo proyecto para comenzar a trabajar.
                </Typography>
              </CardFooter>
            </Card>
          }
        />
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? <Spinner className="mr-2 h-4 w-4" /> : null}
            {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
          </Button>
        </div>
      )}

      {/* Pending Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{pendingCards}</div>
    </section>
  );
};
