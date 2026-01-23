'use client';

import type { ProjectWithMembers, RpcPendingProjects } from '@/types/types';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FolderInput, ArrowUpRightIcon, PlusIcon } from 'lucide-react';

import { HeaderProjects } from './header-projects';
import { CardProject } from './card-project';

import { useProjects } from '@/hooks/use-projects';

import { EmptyState } from '@/components/organisms/empty-state';

import { Button } from '@/components/ui/button';

import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { DialogJoinProject } from '@/components/organisms/dialog-join-project';
import { CardPendingProject } from '@/components/molecules/card-pending-project';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ProjectsParams {
  _projects: ProjectWithMembers[];
  _pendingProjects: RpcPendingProjects;
}

export const ProjectsClient = ({ _projects, _pendingProjects }: ProjectsParams) => {
  const {
    projects,
    form: formProjects,
    onSubmit: onSubmitProjects,
    loadMoreProjects,
    hasMore,
    isLoadingMore,
  } = useProjects({
    _projects,
    itemsPerPage: 7,
  });

  const pendingCards =
    _pendingProjects?.length >= 1
      ? _pendingProjects.map((entry, index) => (
          <CardPendingProject
            key={`pending-${index}`}
            name={entry?.project_name || ''}
            ownerName={entry?.owner_full_name || ''}
          />
        ))
      : null;

  // Empty state
  if (projects?.length === 0 && _pendingProjects?.length === 0) {
    return (
      <section className="w-full min-h-[calc(100svh-6rem)] grid place-items-center">
        <EmptyState
          icon={FolderInput}
          title="Sin proyectos aún"
          description="No has creado ningún proyecto todavía. Comienza creando tu primer proyecto."
          action={
            <div className="flex gap-2">
              <DialogCreateProject
                formProjects={formProjects}
                onSubmitProjects={onSubmitProjects}
              />
              <DialogJoinProject />
            </div>
          }
          footer={
            <Button variant="link" asChild className="text-muted-foreground" size="sm">
              <Link href="#">
                Learn More <ArrowUpRightIcon />
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
      <HeaderProjects formProjects={formProjects} onSubmitProjects={onSubmitProjects} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <DialogCreateProject
          formProjects={formProjects}
          onSubmitProjects={onSubmitProjects}
          triggerComponent={
            <Card className="h-full min-h-[250px] cursor-pointer opacity-50 border-dashed border-spacing-8 border-2 hover:opacity-100 transition-opacity duration-300 ease-in-out text-center justify-center flex-col-reverse bg-transparent">
              <CardHeader>
                <h3>Crear nuevo proyecto</h3>
              </CardHeader>
              <CardContent>
                <Button className='rounded-full' variant='secondary' size='icon-lg'>
                <PlusIcon className='size-6' />
                </Button>
              </CardContent>
            </Card>
          }
        />
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={loadMoreProjects} disabled={isLoadingMore}>
            {isLoadingMore ? 'Cargando...' : 'Cargar más'}
          </Button>
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingCards}
      </div>
    </section>
  );
};
